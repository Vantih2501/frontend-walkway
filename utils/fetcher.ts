import superagent, { SuperAgentRequest } from "superagent";
import { config } from '#/config/app';
import { Logger } from "./logger";
import { getAccessToken } from "./token";
import { Interceptor } from "./interceptor";

const setAuthorizationHeader = (request: SuperAgentRequest) => {
	const accessToken = getAccessToken();
	return accessToken
		? request.set('Authorization', 'Bearer ' + accessToken)
		: request;
};

const createRequest = (method: 'get' | 'post' | 'patch' | 'del', url: string) => {
	const request = superagent[method](config.baseUrl + url)
		// .use(Interceptor)
		// .use(Logger);

	return setAuthorizationHeader(request);
};

export const fetcher = {
	get: async (url: string, opts = {}) => {
		const response = await createRequest('get', url);
		return response.body.data;
	},

	post: async (url: string, opts: {}) => {
		const response = await createRequest('post', url).send(opts);
		return response.body.data;
	},

	patch: async (url: string, opts: {}) => {
		const response = await createRequest('patch', url).send(opts);
		return response.body.data;
	},

	del: async (url: string, opts = {}) => {
		const response = await createRequest('del', url);
		return response.body.data;
	},
};