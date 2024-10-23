import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get('access_token');
export function setTokens(accessToken: string, refreshToken?: string) {
  Cookies.set('access_token', accessToken, { expires: 1 });
}
export function removeTokens() {
  Cookies.remove('access_token');
}