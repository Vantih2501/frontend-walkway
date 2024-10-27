import useSWR from "swr";
import { fetcher } from "#/utils/fetcher";

export const useCategory = () => {
  const fetchCategory = () => {
    const { data, error, isLoading } = useSWR<Category[]>(`/category`, fetcher.get)
    return {
      category: data,
      isError: error,
      isLoading
    }
  };
  return { fetchCategory }
};