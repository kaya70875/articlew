/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      lastname: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    lastname: string;
  }

  interface DefaultUser {
    isPremium?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    lastname: string;
  }
}
