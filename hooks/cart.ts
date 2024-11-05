import useSWR, { mutate } from "swr";
import { fetcher } from "#/utils/fetcher";

export const useCart = () => {
  const addToCart = async ({  }: any) => {
    const response = await fetcher.post("/order/generate-token", {});

  };

  return {};
};
