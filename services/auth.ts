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

export const useLogin = () => {
  const login = async (email: string, password: string): Promise<{ access_token: string }> => {
    return fetcher.post(url.login(), { email, password });
  };

  return login;
};

export const useRegister = () => {
  const register = async (name: string, email: string, phone_number: string, password: string): Promise<{ access_token: string }> => {
    return fetcher.post(url.register(), { name, email, phone_number, password });
  };

  return register;
};

const hooks = {
  useLogin(email: string, password: string): Promise<{ access_token: string }> {
    return fetcher.post(url.login(), { email, password });
  },

  useRegister(name: string, email: string, phone_number: string, password: string): Promise<{ access_token: string }> {
    return fetcher.post(url.register(), { name, email, phone_number, password });
  }
};

const api = {};

export const AuthService = {
  url,
  hooks,
  api,
};
