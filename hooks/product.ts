import useSWR from "swr";
import { fetcher } from "#/utils/fetcher";

export const useProduct = () => {
  const fetchProduct = () => {
    const { data, error, isLoading } = useSWR(`/product`, fetcher.get)
    return {
      product: data,
      isError: error,
      isLoading
    }
  };

  const fetchProductName = (name: string) => {
    const { data, error, isLoading } =  useSWR(`/product/${name}`, fetcher.get)
    return {
      product: data,
      isError: error,
      isLoading
    }
  };

  return { fetchProduct, fetchProductName }
};