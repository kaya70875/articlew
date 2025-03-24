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
import { UserType } from "@/types/userTypes";

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
          userType: currentUser.userType,
          accessToken,
          refreshToken,
          accessTokenExpires: Date.now() + 60 * 1000,
        };
      },
    }),

    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
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
      const { email, name, userType = "Basic" } = user;

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
          });
        }

        // Assing userType to user object on oauth provider signIn.
        user.userType = userType;

        return true;
      } catch (error) {
        console.error("Error saving user to database:", error);
        return false; // Deny sign-in if there's an error
      }
    },

    async jwt({ user, token, trigger, session, account }) {
      if (account && user) {
        console.log("user", user);
        console.log("token", token);
        console.log("account", account);
        return {
          ...token,
          id: user.id,
          lastname: user.lastname,
          userType: user.userType,
          provider: account.provider,
          accessToken: user.accessToken ?? account.access_token,
          refreshToken: user.refreshToken ?? account.refresh_token,
          accessTokenExpires:
            user.accessTokenExpires ?? account.expires_at! * 1000,
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
      session.user.id = token.id;
      session.user.lastname = token.lastname;
      session.user.userType = token.userType as UserType;
      session.provider = token.provider;

      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }

      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/search`;
    },
  },
};
