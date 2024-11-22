import superagent, { SuperAgentRequest } from "superagent";
import { config } from "#/config/app";
import { Logger } from "./logger";
import { getAccessToken } from "./token";
import { Interceptor } from "./interceptor";

const setAuthorizationHeader = (request: SuperAgentRequest) => {
  const accessToken = getAccessToken();
  return accessToken
    ? request.set("Authorization", "Bearer " + accessToken)
    : request;
};

const createRequest = (
  method: "get" | "post" | "patch" | "del",
  url: string
) => {
  const request = superagent[method](config.apiUrl + url);
  // .use(Interceptor)
  // .use(Logger);

  return setAuthorizationHeader(request);
};

export const fetcher = {
  get: async (url: string, opts = {}) => {
    const response = await createRequest("get", url);
    return response.body.data;
  },

  fetch: async (url: string, opts = {}) => {
    const response = await createRequest("get", url);
    return response.body;
  },

  post: async (url: string, opts: {}) => {
    const response = await createRequest("post", url).send(opts);
    return response.body.data;
  },

  postWithToken: async (url: string, opts: {}) => {
    const hardcodedToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNkM2MzYTJhYjJjYTAwMTIxMDcxMzYiLCJpYXQiOjE3MzIxNjU1MzMsImV4cCI6MTczMjI1MTkzMywiaXNzIjoiYml0ZXNoaXAvY29yZSJ9.mEt5p35L3jY9a7FiMbvj0A0bfj1DmVXNl1FdIr0esEw";

    const response = await superagent
      .post(url)
      .set("Authorization", "Bearer " + hardcodedToken)
      .send(opts);

    return response;
  },

  upload: async (url: string, opts: {}) => {
    const response = await createRequest("post", url).send(opts);
    return response.body;
  },

  patch: async (url: string, opts: {}) => {
    const response = await createRequest("patch", url).send(opts);
    return response.body.data;
  },

  del: async (url: string, opts = {}) => {
    const response = await createRequest("del", url);
    return response.body.data;
  },
};
