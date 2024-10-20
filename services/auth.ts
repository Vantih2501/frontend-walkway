import useSWR from "swr";
import { fetcher } from "#/utils/fetcher";

const url = {
  login() {
    return '/auth/login'
  },

  register() {
    return '/auth/register'
  },

  refreshToken(token: string) {
    return `/auth/refresh-token`;
  },
};

const hooks = {
  useLogin(email: string, password: string): Promise<{ access_token: string }> {
    return fetcher.post(url.login(), { email, password });
  },

  useRegister(name: string, email: string, phone_number: string, password: string): Promise<{ access_token: string }> {
    return fetcher.post(url.register(), { name, email, phone_number, password });
  }

  // useRefreshToken(token: string) {
  //   const { data, error, isLoading } = useSWR<{ access_token: string, refresh_token: string }>(url.refreshToken(token), fetcher.post);
  //   return {
  //     newTokens: data,
  //     isError: error,
  //     isLoading
  //   }
  // },
};

const api = {};

export const AuthService = {
  url,
  hooks,
  api,
};
