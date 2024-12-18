import useSWR, { mutate } from "swr";
import { fetcher } from "#/utils/fetcher";
import { UploadFile } from "antd";
import { decompressJWT } from "#/utils/compressor";

export interface ProductDto {
  name: string;
  price: number;
  weight: number;
  brandId: string;
  categoryId: string[];
  productDetails: {
    stock: number;
    size: number;
  }[];
  productPhotos: {
    front: string;
    side: string[];
    bottom: string;
  };
  status: string;
}

export const useProduct = () => {
  const fetchProduct = () => {
    const { data, error, isLoading } = useSWR<Product[]>(
      `/product`,
      fetcher.get
    );
    return {
      product: data,
      isError: error,
      isLoading,
    };
  };

  const fetchNewestProduct = () => {
    const { data, error, isLoading } = useSWR<Product[]>(
      `/product/newest`,
      fetcher.get
    );
    return {
      product: data,
      isError: error,
      isLoading,
    };
  };

  const fetchProductName = (name: string) => {
    const { data, error, isLoading } = useSWR<Product>(
      `/product/${name}`,
      fetcher.get
    );
    return {
      product: data,
      isError: error,
      isLoading,
    };
  };

  const uploadImage = async (img: any): Promise<{ imageUrl: string }> => {
    const formData = new FormData();
    formData.append("image", img);

    return await fetcher.upload("/product/upload", formData);
  };

  const postProduct = async ({
    brandId,
    name,
    categoryId,
    price,
    productDetails,
    productPhotos,
    weight = 400,
  }: ProductDto) => {
    await fetcher.post("/product", {
      brandId,
      name,
      categoryId,
      price,
      productDetails,
      productPhotos,
      weight,
    });
    await mutate(`/product`);
  };

  const patchProduct = async (
    productId: string,
    { brandId, name, categoryId, price, productDetails, status }: ProductDto
  ) => {
    await fetcher.patch(`/product/${productId}`, {
      brandId,
      name,
      categoryId,
      price,
      status,
      productDetails,
      weight: 400,
    });
    await mutate(`/product`);
  };

  const genCheckoutToken = async (
    data: CartItem[] | any
  ): Promise<{ checkout_token: string }> => {
    return await fetcher.post("/product/checkout-token", {
      data: data.map((data: any) => ({
        id: data.id,
        productDetailId: data.productDetailId,
        quantity: data.quantity,
      })),
    });
  };

  const getCheckoutData = (token?: string) => {
    const { data, error, isLoading } = useSWR<CartItem[]>(
      token ? `/product/checkout/${decompressJWT(token)}` : null,
      fetcher.get
    );
    return {
      product: data,
      isError: error,
      isLoading,
    };
  };

  const getCourierRate = async (
    address: Address | any,
    product: ProductDetail[] | any
  ): Promise<{ pricing: any[] }> => {
    if (!address || !product) {
      return { pricing: [] };
    }

    const response = await fetcher.post("/order/rates", {
      address,
      product,
    });

    return { pricing: response.pricing };
  };

  return {
    fetchProduct,
    fetchNewestProduct,
    fetchProductName,
    uploadImage,
    postProduct,
    patchProduct,
    genCheckoutToken,
    getCheckoutData,
    getCourierRate,
  };
};
