// @ts-ignore
import superagentIntercept from 'superagent-intercept';
import { removeTokens } from './token';

export const Interceptor = superagentIntercept((err: any, res: any) => {
  if (res?.status === 401) {
    console.log('AuthIntercept 401');
    removeTokens();
    window.location.href = "/login";
  }
});
