/**
 * Custom React hook for performing multiple concurrent GET requests using axios with built-in state management.
 * 
 * @param {string[]} urls - An array of URLs to fetch data from concurrently.
 * @param {any[]} deps - Optional dependencies array to trigger re-fetching when values change.
 * @param {object[]} paramsList - Optional array of parameters objects corresponding to each URL.
 * 
 * @returns {object} An object containing:
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
 *       isLoading ? <p key={index}>Loading data from URL index ${index}...</p> : <div key={index}>{JSON.stringify(data[index])}</div>
 *     ))}
 *   </div>
 * );
 */

import { useState, useEffect } from 'react';
import axios, { isCancel } from 'axios';

function useFetchMultiple(urls, deps = [], paramsList = []) {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");
  const [responses, setResponses] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(Array(urls.length).fill(true));
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    const controllers = urls.map(() => new AbortController());
    const fetchData = async () => {
      try {
        const requests = urls.map((url, index) =>
          axios.get(url, {
            params: paramsList[index] || {},
            signal: controllers[index].signal,
          }).then(response => {
            setData(prevData => {
              const newData = [...prevData];
              newData[index] = response.data;
              return newData;
            });
            setResponses(prevResponses => {
              const newResponses = [...prevResponses];
              newResponses[index] = response;
              return newResponses;
            });
          }).catch(error => {
            setErrors(prev => {
              const newErrors = [...prev];
              newErrors[index] = error.message || 'Something went wrong';
              return newErrors;
            });
          })
        );

        await Promise.allSettled(requests);

      } catch (err) {
        if (isCancel(err)) return;
        setError(err.message || 'Something went wrong');
      }
    };

    fetchData();

    return () => {
      controllers.forEach(controller => controller.abort());
    };
  }, [retries, ...deps]);

  useEffect(() => {
    data.map((d, i) => {
      if (d) {
        setLoadingIndex(prev => {
          const newLoadingIndex = [...prev];
          newLoadingIndex[i] = false;
          return newLoadingIndex;
        });
      }
    });
  }, [data]);

  function refetch() {
    setRetries(prev => prev + 1);
  }

  function refetchIndex(index) {
    axios.get(urls[index], {
      params: paramsList[index]
    })
    .then(res => {
      setData(prevData => {
        const newData = [...prevData];
        newData[index] = res.data;
        return newData;
      });
      setResponses(prevResponses => {
        const newResponses = [...prevResponses];
        newResponses[index] = res;
        return newResponses;
      });
    })
    .catch(err => {
      setErrors(prev => {
        const newErrors = [...prev];
        newErrors[index] = err.response.data.title || 'Something went wrong';
        return newErrors;
      });
    });
  }

  return { data, error, errors, responses, refetch, refetchIndex, retries, setData, loadingIndex };
}

export default useFetchMultiple;
