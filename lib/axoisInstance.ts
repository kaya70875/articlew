"use client";

import axios from "axios";
import { signOut, getSession } from "next-auth/react";

export function AuthAxios() {
  const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    timeout: 50000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers["Authorization"] = `Bearer ${session.accessToken}`;
      config.headers["X-Provider"] = session.provider;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry // Prevent infinite loops
      ) {
        originalRequest._retry = true;

        const session = await getSession(); // If `jwt()` refreshed it, this will be the new session

        if (session?.accessToken) {
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${session.accessToken}`;
          return axiosInstance(originalRequest); // Retry original request
        } else {
          // Refresh failed — logout
          await signOut({ redirect: false });
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
