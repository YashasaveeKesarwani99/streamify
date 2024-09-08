import { useQuery, QueryKey, UseQueryResult } from "react-query";
import axios, { AxiosRequestConfig } from "axios";

interface FetchOptions {
  key: QueryKey;
  url: string;
  enabled?: boolean;
  config?: AxiosRequestConfig;
  staleTime?: number; // stale time for caching
  cacheTime?: number; // cache time
}

// custom hook with generic type T
export const useFetchWithCache = <T>({
  key,
  url,
  enabled = true,
  config,
  staleTime = 5 * 60 * 1000, // default stale time 5 mins,
  cacheTime = 10 * 60 * 1000, // default cache time 10 mins
}: FetchOptions): UseQueryResult<T, Error> => {
  const fetchFn = async (): Promise<T> => {
    const response = await axios.get(url, config);
    return response.data;
  };

  return useQuery<T, Error>(key, fetchFn, {
    enabled,
    staleTime,
    cacheTime,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
