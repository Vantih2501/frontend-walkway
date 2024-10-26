import { fetcher } from "#/utils/fetcher";
import useSWR from "swr";

export const useRole = () => {
  const fetchRole = () => {
    const { data, error, isLoading } = useSWR<Role[]>(`/role`, fetcher.get)
    return {
      role: data,
      isError: error,
      isLoading
    }
  };

  return { fetchRole }
};
