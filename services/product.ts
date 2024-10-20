import useSWR from "swr";
import { fetcher } from "#/utils/fetcher";

const url = {
	getProductByName: (name: string) => `/product/${name}`,
};

const hooks = {
	useProductName: (param: string) => {
		const { data, error, isLoading } = useSWR<Product>(url.getProductByName(param), fetcher.get);
		return {
			product: data,
			isError: error,
			isLoading
		};
	},
};

const api = {};

export const ProductService = {
	url,
	hooks,
	api,
};
