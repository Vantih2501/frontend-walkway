import useSWR from "swr";
import { fetcher } from "#/utils/fetcher";

export const useBid = () => {
  const fetchBids = () => {
    const { data, error, isLoading } = useSWR<Bid[]>(`/product/bids`, fetcher.get)
    return {
      bids: data,
      isError: error,
      isLoading
    }
  };

  return { fetchBids }
};