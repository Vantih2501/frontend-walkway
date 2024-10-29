import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get('access_token');
export const getCheckoutToken = () => Cookies.get('checkout_token');
export function setAccessToken(accessToken: string) {
  Cookies.set('access_token', accessToken, { expires: 1 });
}
export function setCheckoutToken(payload: any) {
  Cookies.set('checkout_token', payload, { expires: 1 });
}
export function removeTokens() {
  Cookies.remove('access_token');
  Cookies.remove('checkout_token');
}