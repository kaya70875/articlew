import user from "@/models/user";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/utils/database";
import Google from "next-auth/providers/google";
import {
  refreshAccessToken,
  refreshGoogleAccessToken,
} from "./refreshAccessToken";
import createTokens from "./createTokens";
import { JWT } from "next-auth/jwt";
import { getUserWithEmail } from "./helpers";
import { SubscriptionStatus } from "@/types/next-auth";

const JWT_SECRET = process.env.NEXTAUTH_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REFRESH_TOKEN_EXPIRATION = "30d";
const ACCESS_TOKEN_EXPIRATION = "1m";

if (!JWT_SECRET) {
  throw new Error(
    "SECRETS is not defined. Please set it in your environment variables."
  );
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await connectToDB();

        const currentUser = await user
          .findOne({
            email: credentials?.email,
          })
          .select("+password");

        if (!currentUser) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          currentUser.password
        );

        if (!passwordMatch) throw new Error("Wrong Password");

        const { accessToken, refreshToken } = await createTokens(
          currentUser,
          JWT_SECRET,
          ACCESS_TOKEN_EXPIRATION,
          REFRESH_TOKEN_EXPIRATION
        );

        return {
          id: currentUser._id.toString(),
          name: currentUser.name,
          lastname: currentUser.lastname,
          email: currentUser.email,
          userVerified: currentUser.userVerified || false,
          userType: currentUser.userType,
          subscription_id: currentUser.subscription_id || "",
          subscription_status:
            (currentUser.subscription_status as SubscriptionStatus) ||
            "inactive",
          accessToken,
          refreshToken,
          accessTokenExpires: Date.now() + 60 * 1000,
        };
      },
    }),

    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 30000,
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      const {
        email,
        name,
        userVerified = true,
        userType = "Free",
        subscription_id = "",
        subscription_status = "inactive",
      } = user;

      try {
        const db = await connectToDB();
        const usersCollection = db!.collection("users");

        // Check if user already exists in the database
        const existingUser = await usersCollection.findOne({ email });

        if (!existingUser) {
          // Add new user to the database
          await usersCollection.insertOne({
            name,
            email,
            userType: userType,
            userVerified: true,
            subscription_id: "",
            subscription_status: "inactive",
          });
        }

        // Assing userType to user object on oauth provider signIn.
        user.userType = existingUser?.userType || userType;
        user.userVerified = existingUser?.userVerified || userVerified;
        user.subscription_id = existingUser?.subscription_id || subscription_id;
        user.subscription_status =
          existingUser?.subscription_status || subscription_status;

        return true;
      } catch (error) {
        console.error("Error saving user to database:", error);
        return false; // Deny sign-in if there's an error
      }
    },

    async jwt({ user, token, trigger, session, account }) {
      if (account && user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          lastname: user.lastname,
          userVerified: user.userVerified ?? account.userVerified,
          userType: user.userType,
          provider: account.provider,
          accessToken: user.accessToken ?? account.access_token,
          refreshToken: user.refreshToken ?? account.refresh_token,
          accessTokenExpires: user.accessTokenExpires ?? Date.now() + 60 * 1000,
          user,
        };
      }
      console.log("expire", Date.now(), token.accessTokenExpires);

      if (Date.now() > token.accessTokenExpires) {
        if (token.provider === "credentials") {
          return await refreshAccessToken(token, JWT_SECRET);
        } else {
          return (await refreshGoogleAccessToken(
            GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET,
            token
          )) as JWT;
        }
      }

      if (trigger === "update" && session) {
        token.name = session.name;
        token.lastname = session.lastname;
      }

      return token;
    },
    async session({ session, token }) {
      const existingUser = await getUserWithEmail(token.email);

      session.user.id = token.id;
      session.user.lastname = token.lastname;
      session.user.userVerified = existingUser?.userVerified || false;
      session.user.userType = existingUser?.userType || token.userType;
      session.user.subscription_id = existingUser?.subscription_id || "";
      session.user.subscription_status =
        existingUser?.subscription_status || "inactive";
      session.provider = token.provider;

      if (token) {
        session.accessToken = token.accessToken;
        //session.refreshToken = token.refreshToken; Do not expose this to client for security reasons.
      }

      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/search`;
    },
  },
};
