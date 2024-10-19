import { NextRequest } from 'next/server';
import { AuthMiddleware } from './middlewares/auth';

export async function middleware(req: NextRequest) {
  // return AuthMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)']
};

