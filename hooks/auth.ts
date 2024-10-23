import { fetcher } from "#/utils/fetcher";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useSWR from "swr";

export const useAuth = () => {
  const getUser = (token: string) => {
    const { data, error, isLoading } = useSWR<User>(`/auth/user/${token}`, fetcher.get);
    return {
      user: data,
      isError: error,
      isLoading,
    };
  };

  const login = async ( email: string, password: string ): Promise<{ access_token: string }> => {
    return await fetcher.post("/auth/login", { email, password });
  };

  const register = async ( name: string, email: string, phone_number: string, password: string ): Promise<{ access_token: string }> => {
    return await fetcher.post("/auth/register", {
      name,
      email,
      phone_number,
      password,
    });
  };


  return { login, register, getUser };
};
