import useSWR, { mutate } from "swr";
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

  const postBid = async ({ productDetailId, start_date, end_date, start_price }: any) => {
    await fetcher.post("/product/add-to-bid", {
      productDetailId,
      start_date,
      end_date,
      start_price
    });
    mutate(`/product/bids`);
  };

  return { fetchBids, postBid }
};