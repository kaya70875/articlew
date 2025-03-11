import user from "@/models/user";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/utils/database";
import Google from "next-auth/providers/google";

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

        return {
          id: currentUser._id.toString(),
          name: currentUser.name,
          lastname: currentUser.lastname,
          email: currentUser.email,
          userType: currentUser.userType,
        };
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
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
            userType,
          });
        }

        //Generate a special JWT for backend API calls.
        const accessToken = await new Promise<string>((resolve, reject) => {
          jwt.sign(
            {
              sub: existingUser?._id?.toString() || "",
              email: existingUser?.email || "",
            },
            process.env.AUTH_SECRET || "",
            { expiresIn: "1h" },
            (err, token) => {
              if (err) reject(err);
              resolve(token || "");
            }
          );
        });

        user.accessToken = accessToken;
        return true;
      } catch (error) {
        console.error("Error saving user to database:", error);
        return false; // Deny sign-in if there's an error
      }
    },
    async jwt({ user, token, trigger, session, account }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken || "";
        token.lastname = user.lastname;
      }

      if (account) {
        token.accessToken = account?.access_token ?? token.accessToken;
        token.provider = account.provider;
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
      session.accessToken = token.accessToken;
      session.provider = token.provider as string;
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/search`;
    },
  },
};
