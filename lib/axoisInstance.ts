"use client";

import axios from "axios";

// Create a base axios instance
const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Export a function that creates an authenticated instance
export function createAuthenticatedInstance(
  accessToken: string | undefined,
  provider: string | undefined
) {
  return axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    timeout: 50000,
    headers: {
      "Content-Type": "application/json",
      "X-Provider": provider,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });
}

export default axiosInstance;
