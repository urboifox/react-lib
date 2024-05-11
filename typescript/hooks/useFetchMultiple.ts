/**
 * Custom React hook for performing multiple concurrent GET requests using axios with built-in state management.
 * 
 * @template T The expected shape of the response data array.
 * @param {string[]} urls - An array of URLs to fetch data from concurrently.
 * @param {any[]} deps - Optional dependencies array to trigger re-fetching when values change.
 * @param {object[]} paramsList - Optional array of parameters objects corresponding to each URL.
 * 
 * @returns {UseFetchMultipleResponse<T>} An object containing:
 * - data: An array of data returned from each fetch, corresponding to the order of URLs.
 * - error: A string with an error message if an error occurred during any fetch.
 * - errors: An array of error messages for each URL fetch.
 * - responses: An array of AxiosResponse objects for each fetch.
 * - refetch: Function to manually trigger a re-fetch of all URLs.
 * - refetchIndex: Function to manually trigger a re-fetch for a specific URL index.
 * - retries: Number of times refetch has been called.
 * - setData: Function to manually set the data state.
 * - loadingIndex: An array of boolean values indicating the loading state of each URL fetch.
 * 
 * @example
 * const { data, errors, loadingIndex, refetch, refetchIndex } = useFetchMultiple(["https://api.example.com/data1", "https://api.example.com/data2"]);
 * 
 * useEffect(() => {
 *   errors.forEach((error, index) => {
 *     if (error) {
 *       console.error(`Failed to fetch data from URL index ${index}:`, error);
 *     }
 *   });
 * }, [errors]);
 * 
 * return (
 *   <div>
 *     {loadingIndex.map((isLoading, index) => (
 *       isLoading ? <p key={index}>Loading data from URL index {index}...</p> : <div key={index}>{JSON.stringify(data[index])}</div>
 *     ))}
 *   </div>
 * );
 */

import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse, isCancel } from 'axios';

interface UseFetchMultipleResponse<T extends any[]> {
  data: T;
  error: string;
  errors: string[];
  refetch: () => void;
  refetchIndex: (index: number) => void;
  retries: number;
  setData: (data: T) => void;
  loadingIndex: boolean[];
  responses: AxiosResponse<any>[];
}

function useFetchMultiple<T extends any[]>(
  urls: string[],
  deps: any[] = [],
  paramsList: object[] = [],
): UseFetchMultipleResponse<T> {
  // State hooks to manage the data, errors, and loading states
  const [data, setData] = useState<T>([] as unknown as T);
  const [errors, setErrors] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [responses, setResponses] = useState<AxiosResponse<any>[]>([]);
  const [loadingIndex, setLoadingIndex] = useState<boolean[]>(Array(urls.length).fill(true));
  const [retries, setRetries] = useState(0);

  // Effect hook to fetch data on mount and when dependencies change
  useEffect(() => {
    const controllers = urls.map(() => new AbortController());
    const fetchData = async () => {
      try {
        // Map over URLs to fetch data concurrently
        const requests = urls.map((url, index) =>
          axios.get(url, {
            params: paramsList[index] || {},
            signal: controllers[index].signal,
          }).then(response => {
            // Update data and responses state on successful fetch
            setData((prevData) => {
              const newData = [...prevData];
              newData[index] = response.data;
              return newData as T;
            });
            setResponses((prevResponses) => {
              const newResponses = [...prevResponses];
              newResponses[index] = response;
              return newResponses;
            });
          }).catch(error => {
            // Handle errors for each request individually
            setErrors((prev) => {
              const newErrors = [...prev];
              newErrors[index] = error.message || 'Something went wrong';
              return newErrors;
            });
          })
        );

        // Send all requests in parallel and wait for all to settle
        await Promise.allSettled(requests);

      } catch (err) {
        // Handle cancellation and other errors
        if (isCancel(err)) return;
        setError((err as AxiosError).message || 'Something went wrong');
      }
    };

    fetchData();

    // Cleanup function to abort ongoing requests
    return () => {
      controllers.forEach((controller) => controller.abort());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retries, ...deps]);

  // Effect hook to update loading states based on data availability
  useEffect(() => {
    data.map((d, i) => {
      if (d) {
        setLoadingIndex((prev) => {
          const newLoadingIndex = [...prev];
          newLoadingIndex[i] = false;
          return newLoadingIndex;
        });
      }
    });
  }, [data]);

  // Function to trigger a refetch of all data
  function refetch() {
    setRetries((prev) => prev + 1);
  }

  // Function to refetch data at a specific index
  function refetchIndex(index: number) {
    axios.get(urls[index], {
      params: paramsList[index]
    })
    .then((res) => {
      // Update data and responses state on successful fetch
      setData((prevData) => {
        const newData = [...prevData];
        newData[index] = res.data;
        return newData as T;
      });
      setResponses((prevResponses) => {
        const newResponses = [...prevResponses];
        newResponses[index] = res;
        return newResponses;
      });
    })
    .catch((err) => {
      // Handle errors for the specific request
      setErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = err?.response?.data?.title || 'Something went wrong';
        return newErrors;
      });
    });
  }

  return { data, error, errors, responses, refetch, refetchIndex, retries, setData, loadingIndex };
}

export default useFetchMultiple;
