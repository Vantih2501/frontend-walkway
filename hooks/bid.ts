import useSWR, { mutate } from "swr";
import { fetcher } from "#/utils/fetcher";

export const useBid = () => {
  const fetchBids = () => {
    const { data, error, isLoading } = useSWR<Bid[]>(
      `/product/bids`,
      fetcher.get
    );
    return {
      bids: data,
      isError: error,
      isLoading,
    };
  };

  const fetchBid = (id: string) => {
    const { data, error, isLoading } = useSWR<Bid>(
      `/product/bid/${id}`,
      fetcher.get
    );
    return {
      bid: data,
      isError: error,
      isLoading,
    };
  };

  const postBid = async ({
    productDetailId,
    start_date,
    end_date,
    start_price,
  }: any) => {
    await fetcher.post("/product/add-to-bid", {
      productDetailId,
      start_date,
      end_date,
      start_price,
    });
    await mutate(`/product/bids`);
  };

  const postBidAmount = async (
    bidProductId?: string,
    userEmail?: string,
    bidAmount?: number
  ) => {
    await fetcher.post("/product/participate-bid", {
      bidProductId,
      userEmail,
      bidAmount,
    });

    await mutate(`/product/bids`);
    await mutate(`/product/bid/${bidProductId}`);
  };

  return { fetchBids, postBid, fetchBid, postBidAmount };
};
