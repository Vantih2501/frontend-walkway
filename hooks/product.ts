import useSWR, { mutate } from "swr";
import { fetcher } from "#/utils/fetcher";
import { UploadFile } from "antd";

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
}

export const useProduct = () => {
  const fetchProduct = () => {
    const { data, error, isLoading } = useSWR<Product[]>(`/product`, fetcher.get)
    return {
      product: data,
      isError: error,
      isLoading
    }
  };

  const fetchNewestProduct = () => {
    const { data, error, isLoading } = useSWR<Product[]>(`/product/newest`, fetcher.get)
    return {
      product: data,
      isError: error,
      isLoading
    }
  };

  const fetchProductName = (name: string) => {
    const { data, error, isLoading } = useSWR<Product>(`/product/${name}`, fetcher.get)
    return {
      product: data,
      isError: error,
      isLoading
    }
  };

  const uploadImage = async (img: any): Promise<{ imageUrl: string }> => {
    const formData = new FormData();
    formData.append('image', img);

    return await fetcher.upload("/product/upload", formData);
  };

  const postProduct = async ({ brandId, name, categoryId, price, productDetails, productPhotos, weight = 400 }: ProductDto) => {
    await fetcher.post("/product", {
      brandId,
      name,
      categoryId,
      price,
      productDetails,
      productPhotos,
      weight
    });
    mutate(`/product`);
  };

  const patchProduct = async (productId: string, { brandId, name, categoryId, price, productDetails }: ProductDto) => {
    await fetcher.patch(`/product/${productId}`, {
      brandId,
      name,
      categoryId,
      price,
      productDetails,
      weight: 400
    });
    mutate(`/product`);
  };

  const genCheckoutToken = async (data: ProductDetail[]): Promise<{ checkout_token: string }> => {
    return await fetcher.post("/product/checkout-token", { data });
  };

  const getCheckoutData = (token?: string | null) => {
    if (!token) { }

    const { data, error, isLoading } = useSWR<ProductDetail | ProductDetail[] | any>(`/product/checkout/${token}`, fetcher.get);
    return {
      product: data?.[0] || [],
      isError: error,
      isLoading,
    };
  };

  const getCourierRate = async (address: Address | any, product: ProductDetail[] | any): Promise<{ pricing: any[] }> => {
    if (!address || !product) {
      return { pricing: [] }; // Return empty pricing array if no address or product
    }

    const response = await fetcher.post("/order/rates", {
      address,
      product
    });

    return { pricing: response.pricing }; // Access pricing directly
  };


  return { fetchProduct, fetchNewestProduct, fetchProductName, uploadImage, postProduct, patchProduct, genCheckoutToken, getCheckoutData, getCourierRate }
};