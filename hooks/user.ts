import { fetcher } from "#/utils/fetcher";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useSWR, { mutate } from "swr";

export const useUser = () => {
  const fetchUser = () => {
    const { data, error, isLoading } = useSWR<User[]>(
      `/user/admins`,
      fetcher.get
    );
    return {
      user: data,
      isError: error,
      isLoading,
    };
  };

  const fetchAddress = (email?: string) => {
    const { data, error, isLoading } = useSWR<Address[]>(
      `/user/address/${email}`,
      fetcher.get
    );
    return {
      address: data,
      isError: error,
      isLoading,
    };
  };

  interface AddressDto {
    email: string;
    contact_name: string;
    contact_number: string;
    province: string;
    city: string;
    district: string;
    zipcode: string;
    address: string;
    note?: string;
  }

  const postAddress = async ({
    email,
    contact_name,
    contact_number,
    province,
    city,
    district,
    zipcode,
    address,
    note,
  }: AddressDto) => {
    await fetcher.post(`/user/add-address`, {
      email,
      contact_name,
      contact_number,
      province,
      city,
      district,
      zipcode,
      address,
      note,
    });
    mutate(`/user/address/${email}`);
  };

  const setDefaultAddress = async (
    email?: string,
    addressId?: string,
    token?: string
  ) => {
    await fetcher.patch(`/user/set-address`, {
      email,
      addressId
    });

    mutate(`/auth/user/${token}`);
  };

  const getAddress = (id?: string) => {
    const { data, error, isLoading } = useSWR<Address>(
      `/user/get-address/${id}`,
      fetcher.get
    );
    return {
      address: data,
      isError: error,
      isLoading,
    };
  };

  const postUser = async (
    name: string,
    email: string,
    phone_number: string,
    password: string,
    roleId: string
  ) => {
    await fetcher.post("/user", {
      name,
      email,
      phone_number,
      password,
      roleId,
    });
    mutate(`/user/admins`);
  };

  const patchUser = async (
    userId: string,
    name: string,
    phone_number: string,
    status: string
  ) => {
    await fetcher.patch(`/user/${userId}`, {
      name,
      phone_number,
      status,
    });

    mutate(`/user/admins`);
  };

  const deleteUser = async (userId: string) => {
    await fetcher.del(`/user/${userId}`);

    mutate(`/user/admins`);
  };

  return {
    fetchUser,
    postUser,
    patchUser,
    deleteUser,
    fetchAddress,
    postAddress,
    setDefaultAddress,
    getAddress
  };
};
