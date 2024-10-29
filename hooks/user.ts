import { fetcher } from "#/utils/fetcher";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useSWR, { mutate } from "swr";

export const useUser = () => {
  const fetchUser = () => {
    const { data, error, isLoading } = useSWR<User[]>(`/user/admins`, fetcher.get)
    return {
      user: data,
      isError: error,
      isLoading
    }
  };

  const fetchAddress = (email?: string) => {
    const { data, error, isLoading } = useSWR<Address[]>(`/user/address/${email}`, fetcher.get)
    return {
      address: data,
      isError: error,
      isLoading
    }
  };

  const postAddress = async (name: string, email: string, phone_number: string, password: string, roleId: string) => {
    await fetcher.post("/user", {
      name,
      email,
      phone_number,
      password,
      roleId,
    });
    mutate(`/user/admins`);
  };

  const postUser = async (name: string, email: string, phone_number: string, password: string, roleId: string) => {
    await fetcher.post("/user", {
      name,
      email,
      phone_number,
      password,
      roleId,
    });
    mutate(`/user/admins`);
  };

  const patchUser = async (userId: string, name: string, phone_number: string, status: string) => {
    await fetcher.patch(`/user/${userId}`, {
      name,
      phone_number,
      status
    });

    mutate(`/user/admins`);
  };

  const deleteUser = async (userId: string) => {
    await fetcher.del(`/user/${userId}`);

    mutate(`/user/admins`);
  };

  return { fetchUser, postUser, patchUser, deleteUser, fetchAddress }
};
