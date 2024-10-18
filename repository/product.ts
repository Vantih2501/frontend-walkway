import { http } from "#/utils/http";
import useSWR from "swr";

const url = {
  getProductByName(name: string) {
    return `/product/${name}`;
  },
};

const hooks = {
  useProductName(param: string) {
    return useSWR(url.getProductByName(param), http.fetcher);
  },
};

const api = {};

export const productRepository = {
  url,
  hooks,
  api,
};
