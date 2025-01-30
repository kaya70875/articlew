import useSWR from "swr";
import axiosInstance from "@/lib/axoisInstance";

// Generic Fetcher Function
const fetcher = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.get<T>(url);
  return response.data;
};

// Custom retry function
const shouldRetryOnError = (error: any) => {
  // Don't retry if the error is due to 404
  if (error.response && error.response.status === 404) {
    return false;
  }

  // Retry on all other errors
  return true;
};

// Generic Fetch Hook
const useAPIFetch = <T>(endpoint: string | null) => {
  const { data, error, isValidating } = useSWR<T>(endpoint, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
    dedupingInterval: 60000,
    shouldRetryOnError: shouldRetryOnError,
  });

  return {
    data: data || null, // Return null if no data
    loading: isValidating,
    error: error?.message || "",
  };
};

export default useAPIFetch;
