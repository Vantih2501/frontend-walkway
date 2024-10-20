import { fetcher } from "#/utils/fetcher";

export const useLogin = () => {
  const login = async (email: string, password: string): Promise<{ access_token: string }> => {
    return fetcher.post('/auth/login', { email, password });
  };

  return login;
};

export const useRegister = () => {
  const register = async (name: string, email: string, phone_number: string, password: string): Promise<{ access_token: string }> => {
    return fetcher.post('/auth/login', { name, email, phone_number, password });
  };

  return register;
};