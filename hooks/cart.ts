import useSWR, { mutate } from "swr";
import { fetcher } from "#/utils/fetcher";

export const useCart = () => {
  const addToCart = async ({ productDetailId, cartId }: { productDetailId: string, cartId: string }) => {
    await fetcher.post("/product/add-to-cart", { productDetailId, cartId });
  };

  return { addToCart }
};
