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
  }

  interface User {
    id: string;
    lastname: string;
    userType: UserType;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    lastname: string;
  }
}
