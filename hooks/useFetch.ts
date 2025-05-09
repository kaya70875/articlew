import useSWR from "swr";
import axios from "axios";

// Generic Fetcher Function
const fetcher = async <T,>(url: string): Promise<T> => {
    const response = await axios.get<T>(url);
    return response.data;
};

// Generic Fetch Hook
const useFetch = <T,>(endpoint: string | null) => {
    const { data, error, isValidating } = useSWR<T>(endpoint, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
        dedupingInterval : 60000,
    });

    return {
        data: data || null, // Return null if no data
        loading: isValidating,
        error: error?.message || '',
    };
};

export default useFetch;
