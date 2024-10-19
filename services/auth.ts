import useSWR from "swr";
import { fetcher } from "#/utils/fetcher";

const url = {
  login() {
    return '/auth/login'
  },

  register() {

  },

  refreshToken(token: string) {
    return `/auth/refresh-token`;
  },
};

const hooks = {
  useLogin(email: string, password: string): Promise<{ access_token: string }> {
    return fetcher.post(url.login(), { email, password });
  },


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
