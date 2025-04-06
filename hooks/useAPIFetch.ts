"use client";

import useSWR from "swr";
import { AuthAxios } from "@/lib/axoisInstance";

// Generic Fetch Hook
const useAPIFetch = <T>(endpoint: string | null) => {
  const axiosInstance = AuthAxios();
  const fetcher = async (url: string): Promise<T> => {
    const response = await axiosInstance.get<T>(url);
    return response.data;
  };

  const { data, error, isValidating } = useSWR<T>(endpoint, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
    dedupingInterval: 60000,
  });

  return {
    data: data || null,
    loading: isValidating,
    error: error || null,
  };
};

export default useAPIFetch;
