import useSWR, { mutate } from "swr";
import { fetcher } from "#/utils/fetcher";
import { getAccessToken } from "#/utils/token";

export const useCart = () => {
  const token = getAccessToken();

  const addToCart = async ({
    productDetailId,
    cartId,
  }: {
    productDetailId: string;
    cartId: string;
  }) => {
    await fetcher.post("/product/add-to-cart", { productDetailId, cartId });

    await mutate(`/user/cart/${cartId}`);
    await mutate(`/auth/user/${token}`);
  };

  const getCartItem = (cartId?: string) => {
    const { data, error, isLoading } = useSWR<CartItem[]>(
      cartId ? `/user/cart/${cartId}` : null,
      fetcher.get
    );
    return {
      items: data,
      isError: error,
      isLoading,
    };
  };

  const reduceQty = (cartId?: string) => {
    // await fetcher.post("/product/add-to-cart", { productDetailId, cartId });

    mutate(`/user/cart/${cartId}`);
    mutate(`/auth/user/${token}`);
  };

  return { addToCart, getCartItem };
};
