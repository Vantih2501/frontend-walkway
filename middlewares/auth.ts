import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

function checkTokenExpiration(token: string): boolean {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
}

export async function AuthMiddleware(req: NextRequest) {
  // const accessToken = req.cookies.get("access_token")?.value;

  // const guestRoutes = ["/", "/product"];
  // const userRoutes = ["/profile"];
  // const superAdminRoutes = ["/dashboard"];
  // const authRoutes = ["/login", "/register"];

  // if (!accessToken) {
  //   if (
  //     authRoutes.includes(req.nextUrl.pathname) ||
  //     guestRoutes.includes(req.nextUrl.pathname)
  //   ) {
  //     return NextResponse.next();
  //   } else {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  // }

  // const decodedToken: {
  //   id: string;
  //   role: string;
  //   name: string;
  //   email: string;
  // } = jwtDecode(accessToken);
  // const isTokenExpired = checkTokenExpiration(accessToken);

  // if (isTokenExpired) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // if (authRoutes.includes(req.nextUrl.pathname)) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  // if (decodedToken.role === "superadmin") {
  //   if (!superAdminRoutes.includes(req.nextUrl.pathname)) {
  //     return NextResponse.redirect(new URL("/dashboard", req.url));
  //   }
  // } else if (decodedToken.role === "user") {
  //   if (![...guestRoutes, ...userRoutes].includes(req.nextUrl.pathname)) {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  // } else {
  //   if (!guestRoutes.includes(req.nextUrl.pathname)) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  // }

  return NextResponse.next();
}
