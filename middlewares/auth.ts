import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { refreshToken as refreshTokenEndpoint } from '@/endpoints/auth';
import { jwtDecode } from 'jwt-decode';
import { removeTokens, setTokens } from '#/utils/token';
import { AuthService } from '#/services/auth';

export async function AuthMiddleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;
  const refreshToken = req.cookies.get('refresh_token')?.value;

  const unprotectedRoutes = [
    '/',
    '/product',
    '/login',
    '/register',
  ];

  // if (accessToken && unprotectedRoutes.includes(req.nextUrl.pathname)) {
  //   return NextResponse.redirect(new URL('/dashboard', req.url));
  // }

  // if (!unprotectedRoutes.includes(req.nextUrl.pathname)) {
  //   if (!accessToken) {
  //     return NextResponse.redirect(new URL('/login', req.url));
  //   } else {
  //     const isTokenExpired = checkTokenExpiration(accessToken);

  //     if (isTokenExpired && refreshToken) {
  //       try {
  //         // const { newTokens } = AuthService.hooks.useRefreshToken(refreshToken);

  //         // if (newTokens?.access_token && newTokens?.refresh_token) {
  //         //   setTokens(newTokens.access_token, newTokens.refresh_token)
  //         //   req.cookies.set('access_token', newTokens.access_token)
  //         //   req.cookies.set('refresh_token', newTokens.refresh_token)
  //         // } else {
  //         //   removeTokens();
  //         //   return NextResponse.redirect(new URL('/login', req.url));
  //         // }
  //       } catch (error) {
  //         console.error('Error refreshing token:', error);
  //         removeTokens();
  //         return NextResponse.redirect(new URL('/login', req.url));
  //       }
  //     } else if (!refreshToken) {
  //       removeTokens();
  //       return NextResponse.redirect(new URL('/login', req.url));
  //     }
  //   }
  // }

  return NextResponse.next();
}

function checkTokenExpiration(token: string): boolean {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
}
