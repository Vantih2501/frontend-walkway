import useSWR, { mutate } from "swr";
import { fetcher } from "#/utils/fetcher";

export const useOrder = () => {
  const postToken = async ({ orderTotal, orderItems, orderShip, customer }: any): Promise<{ token: string, redirect_url: string }> => {
    const response = await fetcher.post("/order/generate-token", {
      orderTotal,
      orderShip,
      orderItems,
      customer
    });

    const { token, redirect_url } = response;

    return {
      token,
      redirect_url
    }
  };

  const postBidToken = async ({ orderTotal, orderItems, customer }: any): Promise<{ token: string, redirect_url: string }> => {
    const response = await fetcher.post("/order/generate-token-bid", {
      orderTotal,
      orderItems,
      customer
    });

    const { token, redirect_url } = response;

    return {
      token,
      redirect_url
    }
  };

  return { postToken, postBidToken }
};