import useSWR, { mutate } from "swr";
import { fetcher } from "#/utils/fetcher";
import { getAccessToken } from "#/utils/token";

export const useCart = () => {
  const token = getAccessToken();

  const addToCart = async ({
    productDetailId,
    cartId,
    quantity,
  }: {
    productDetailId: string;
    cartId?: string;
    quantity?: number;
  }) => {
    await fetcher.post("/product/add-to-cart", {
      productDetailId,
      cartId,
      quantity,
    });

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

  const addQty = async (cartId?: string, id?: string) => {
    await fetcher.post("/user/add-item", { cartId });

    await mutate(`/user/cart/${id}`);
    await mutate(`/auth/user/${token}`);
  };

  const reduceQty = async (cartId?: string, id?: string) => {
    await fetcher.post("/user/reduce-item", { cartId });

    await mutate(`/user/cart/${id}`);
    await mutate(`/auth/user/${token}`);
  };

  const removeItem = async (cartId?: string[], id?: string) => {
    await fetcher.post("/user/remove-item", { cartId });

    await mutate(`/user/cart/${id}`);
    await mutate(`/auth/user/${token}`);
  };

  return { addToCart, getCartItem, reduceQty, addQty, removeItem };
};
