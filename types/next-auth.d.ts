/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserType } from "./userTypes";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      lastname: string;
    } & DefaultSession["user"];
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    provider: string;
  }

  interface User {
    id: string;
    lastname: string;
    userType: UserType;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    lastname: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    provider: string;
  }
}
