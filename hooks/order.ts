import useSWR, { mutate } from "swr";
import { fetcher } from "#/utils/fetcher";

export const useOrder = () => {
  const fetchOrder = () => {
    const { data, error, isLoading } = useSWR<Order[]>(`/order/`, fetcher.get);
    return {
      order: data,
      isError: error,
      isLoading,
    };
  };

  const getOrder = (email?: string) => {
    const { data, error, isLoading } = useSWR<Order[]>(
      email ? `/user/orders/${email}` : null,
      fetcher.get
    );
    return {
      order: data,
      isError: error,
      isLoading,
    };
  };

  const postToken = async ({
    orderTotal,
    delivery,
    orderItems,
    customer,
  }: any): Promise<{ token: string; redirect_url: string }> => {
    const response = await fetcher.post("/order/generate-token", {
      orderTotal,
      delivery,
      orderItems,
      customer,
    });

    const { token, redirect_url } = response;

    return {
      token,
      redirect_url,
    };
  };

  const postBidToken = async ({
    orderTotal,
    orderItems,
    customer,
  }: any): Promise<{ token: string; redirect_url: string }> => {
    const response = await fetcher.post("/order/generate-token-bid", {
      orderTotal,
      orderItems,
      customer,
    });

    const { token, redirect_url } = response;

    return {
      token,
      redirect_url,
    };
  };

  return { postToken, postBidToken, getOrder, fetchOrder };
};
