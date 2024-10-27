import useSWR, { mutate } from "swr";
import { fetcher } from "#/utils/fetcher";
import { UploadFile } from "antd";

interface ProductDto {
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

  return { fetchProduct, fetchNewestProduct, fetchProductName, uploadImage, postProduct }
};