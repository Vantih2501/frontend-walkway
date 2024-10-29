import useSWR, { mutate } from "swr";
import { fetcher } from "#/utils/fetcher";

interface BrandDto {
  name: string;
  image: string;
  status?: string;
}

export const useBrand = () => {
  const fetchBrand = () => {
    const { data, error, isLoading } = useSWR<Brand[]>(`/brand`, fetcher.get)
    return {
      brand: data,
      isError: error,
      isLoading
    }
  };

  const fetchRecentBrand = () => {
    const { data, error, isLoading } = useSWR<Brand[]>(`/brand/recent`, fetcher.get)
    return {
      brand: data,
      isError: error,
      isLoading
    }
  };

  const fetchBrandName = (name: string) => {
    const { data, error, isLoading } = useSWR<Brand>(`/brand/${name}`, fetcher.get)
    return {
      brand: data,
      isError: error,
      isLoading
    }
  };

  const uploadImage = async (img: any): Promise<{ imageUrl: string }> => {
    const formData = new FormData();
    formData.append('image', img);

    return await fetcher.upload("/brand/upload", formData);
  };

  const postBrand = async ({ name, image }: BrandDto) => {
    await fetcher.post("/brand", {
      name,
      image
    });
    mutate(`/brand`);
  };

  const patchBrand = async (brandId: string, { name, status }: BrandDto) => {
    await fetcher.patch(`/brand/${brandId}`, {
      name,
      status
    });
    mutate(`/brand`);
  };

  return { fetchBrand, fetchRecentBrand, fetchBrandName, uploadImage, postBrand, patchBrand }
};