import useSWR from "swr";
import { fetcher } from "#/utils/fetcher";

export const useBrand = () => {
  const fetchBrand = async () => {
    const { data, error, isLoading } = useSWR(`/brand`, fetcher.get)
    return {
      brand: data,
      isError: error,
      isLoading
    }
  };

  const fetchBrandName = async (name: string) => {
    const { data, error, isLoading } = useSWR(`/brand/${name}`, fetcher.get)
    return {
      brand: data,
      isError: error,
      isLoading
    }
  };

  return { fetchBrand, fetchBrandName }
};