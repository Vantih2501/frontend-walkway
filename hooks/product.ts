import useSWR from "swr";
import { fetcher } from "#/utils/fetcher";

export const useProduct = () => {
  const fetchProduct = () => {
    const { data, error, isLoading } = useSWR<Product[]>(`/product`, fetcher.get)
    return {
      product: data,
      isError: error,
      isLoading
    }
  };

  const fetchNewestProduct = () => {
    const { data, error, isLoading } = useSWR<Product[]>(`/product/newest`, fetcher.get)
    return {
      product: data,
      isError: error,
      isLoading
    }
  };

  const fetchProductName = (name: string) => {
    const { data, error, isLoading } =  useSWR<Product>(`/product/${name}`, fetcher.get)
    return {
      product: data,
      isError: error,
      isLoading
    }
  };

  return { fetchProduct, fetchNewestProduct, fetchProductName }
};