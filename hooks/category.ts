import useSWR, { mutate } from "swr";
import { fetcher } from "#/utils/fetcher";

interface CategoryDto {
  name: string;
  status: string
}

export const useCategory = () => {
  const fetchCategory = () => {
    const { data, error, isLoading } = useSWR<Category[]>(`/category`, fetcher.get)
    return {
      category: data,
      isError: error,
      isLoading
    }
  };

  const postCategory = async ({ name }: CategoryDto) => {
    await fetcher.post("/category", {
      name,
    });
    mutate(`/category`);
  };

  const patchCategory = async (id: string, { name, status }: CategoryDto) => {
    await fetcher.patch(`/category/${id}`, {
      name,
      status
    });
    mutate(`/category`);
  };

  return { fetchCategory, postCategory, patchCategory }
};