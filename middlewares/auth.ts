import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  role: string;
  name: string;
  email: string;
}

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
  const accessToken = req.cookies.get("access_token")?.value;
  const checkoutToken = req.cookies.get("checkout_token")?.value;

  const publicRoutes = [
    "/",
    "/product",
    "/thanks"
  ];

  const dynamicPublicRoutes = [
    /^\/product\/[\w-]+$/,
    /^\/product\/[\w-]+\/[\w-]+$/,
  ];

  const authRoutes = ["/login", "/register"];
  const userOnlyRoutes = ["/profile", "/checkout", "/thanks"];
  const superadminOnlyRoutes = ["/dashboard/account"];

  const currentPath = req.nextUrl.pathname;

  const isPathMatchingDynamicRoutes = (path: string, patterns: RegExp[]) => {
    return patterns.some(pattern => pattern.test(path));
  };

  const isPublicPath = (path: string) => {
    return publicRoutes.includes(path) || isPathMatchingDynamicRoutes(path, dynamicPublicRoutes);
  };

  const isDashboardPath = currentPath.startsWith("/dashboard");

  // Handle checkout token logic
  if (currentPath === "/checkout") {
    if (!checkoutToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    // If we have both tokens and we're on checkout, proceed
    if (accessToken) {
      return NextResponse.next();
    }
  } else if (checkoutToken) {
    const response = NextResponse.redirect(new URL(currentPath, req.url));
    response.cookies.delete("checkout_token");
    return response;
  }

  // Handle unauthenticated users
  if (!accessToken) {
    if (authRoutes.includes(currentPath) || isPublicPath(currentPath)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const decodedToken: DecodedToken = jwtDecode(accessToken);
  const isTokenExpired = checkTokenExpiration(accessToken);

  if (isTokenExpired) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  switch (decodedToken.role) {
    case "superadmin":
      if (!isDashboardPath) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      break;

    case "admin":
      if (!isDashboardPath) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      if (superadminOnlyRoutes.includes(currentPath)) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      break;

    case "user":
      if (authRoutes.includes(currentPath)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      if (isDashboardPath) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      if (!isPublicPath(currentPath) && !userOnlyRoutes.includes(currentPath)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      break;

    default:
      return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}