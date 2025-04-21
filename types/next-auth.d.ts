/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserType } from "./userTypes";

export type SubscriptionStatus = "active" | "cancelled" | "inactive";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      lastname: string;
      userType: UserType;
      subscription_id: string;
      subscription_status: SubscriptionStatus;
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
    subscription_id: string;
    subscription_status: SubscriptionStatus;
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
    userType: string;
  }
}
