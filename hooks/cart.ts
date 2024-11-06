import useSWR, { mutate } from "swr";
import { fetcher } from "#/utils/fetcher";

export const useCart = () => {
  const addToCart = async ({ productDetailId, cartId }: { productDetailId: string, cartId: string }) => {
    await fetcher.post("/product/add-to-cart", { productDetailId, cartId });

    mutate(`/user/cart/${cartId}`)
  };

  const getCartItem = (cartId?: string) => {
    const { data, error, isLoading } = useSWR<CartItem[]>(`/user/cart/${cartId}`, fetcher.get)
    return {
      items: data,
      isError: error,
      isLoading
    }
  };


  return { addToCart, getCartItem }
};
