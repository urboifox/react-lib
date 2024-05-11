/**
 * Custom React hook for performing GET requests using axios with built-in state management.
 * 
 * @param {string} url - The URL to fetch data from.
 * @param {Array} deps - Optional dependencies array to trigger re-fetching when values change.
 * @param {object} params - Optional parameters to include in the GET request.
 * 
 * @returns {object} An object containing:
 * - data: The data returned from the fetch, or null if no data has been retrieved.
 * - isLoading: Boolean indicating if the request is currently loading.
 * - error: Error message string if an error occurred during the fetch.
 * - response: The full Axios response object.
 * - refetch: Function to manually trigger a re-fetch.
 * - retries: Number of times refetch has been called.
 * - setData: Function to manually set the data state.
 * 
 * @example
 * const { data, isLoading, error, refetch } = useFetch("https://api.example.com/data", [], {});
 * 
 * useEffect(() => {
 *   if (error) {
 *     console.error("Failed to fetch data:", error);
 *   }
 * }, [error]);
 * 
 * if (isLoading) return <p>Loading...</p>;
 * if (!data) return <p>No data found!</p>;
 * return <div>{JSON.stringify(data)}</div>;
 */

import axios, { AxiosError, AxiosResponse, isCancel } from "axios";
import { Dispatch, useEffect, useState, SetStateAction } from "react";

function useFetch<T> (
    url: string,
    deps: any[] = [],
    params: object = {},
): {
    data: T|null;
    isLoading: boolean;
    error: string;
    response: AxiosResponse<T>;
    refetch: () => void;
    retries: number;
    setData: Dispatch<SetStateAction<T|null>>;
} {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<T|null>(null);
    const [error, setError] = useState<string>('');
    const [response, setResponse] = useState<any>(null);
    const [retries, setRetries] = useState(0);

    useEffect(() => {
      // abort controller to cancel the request if another request is in progress
      const controller = new AbortController();

      const fetchData = async () => {
        setIsLoading(true);
        setError("");

        await axios
          .get(url, {
            params,
            signal: controller.signal,
          })
          .then((res: AxiosResponse<T>) => {
            setData(res.data);
            // store the response itself for more complex use cases
            setResponse(res);
            setIsLoading(false);
          })
          .catch((err: AxiosError) => {
            // if the request is cancelled, don't set the error
            if (!isCancel(err)) return;
            setError(err?.message || "Something went wrong");
            setIsLoading(false);
            setResponse(err);
          })
      };

      fetchData();

      return () => {
        // abort the request
        controller.abort();
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [retries, ...deps]);

    function refetch() {
      setRetries((prev) => prev + 1);
    }

    return {data, setData, isLoading, error, response, refetch, retries};
}

export default useFetch;