"use client";

import axios from "axios";
import { useSession } from "next-auth/react";

export function AuthAxios() {
  const { data: session } = useSession();

  console.log("access bearer token", session?.accessToken);

  const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    timeout: 50000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
      "X-Provider": session?.provider,
    },
  });

  return axiosInstance;
}
