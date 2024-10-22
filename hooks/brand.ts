import useSWR from "swr";
import { fetcher } from "#/utils/fetcher";

export const useBrand = () => {
  const fetchBrand = () => {
    const { data, error, isLoading } = useSWR<Brand[]>(`/brand`, fetcher.get)
    return {
      brand: data,
      isError: error,
      isLoading
    }
  };

  const fetchRecentBrand = () => {
    const { data, error, isLoading } = useSWR<Brand[]>(`/brand/recent`, fetcher.get)
    return {
      brand: data,
      isError: error,
      isLoading
    }
  };

  const fetchBrandName = (name: string) => {
    const { data, error, isLoading } = useSWR<Brand>(`/brand/${name}`, fetcher.get)
    return {
      brand: data,
      isError: error,
      isLoading
    }
  };

  return { fetchBrand, fetchRecentBrand, fetchBrandName }
};