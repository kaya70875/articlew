"use client";

import useSWR from "swr";
import { useSession } from "next-auth/react";
import axiosInstance, {
  createAuthenticatedInstance,
} from "@/lib/axoisInstance";

// Generic Fetch Hook
const useAPIFetch = <T>(endpoint: string | null) => {
  // Get the session inside the hook
  const { data: session } = useSession();

  // Create a fetcher function that uses the session
  const fetcher = async (url: string): Promise<T> => {
    try {
      // Use authenticated instance if we have a token
      const instance = session?.accessToken
        ? createAuthenticatedInstance(session.accessToken, session.provider)
        : axiosInstance;

      const response = await instance.get<T>(url);
      return response.data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  const { data, error, isValidating } = useSWR<T>(
    endpoint,
    endpoint ? fetcher : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
      dedupingInterval: 60000,
    }
  );

  return {
    data: data || null,
    loading: isValidating,
    error: error?.message || "",
  };
};

export default useAPIFetch;
