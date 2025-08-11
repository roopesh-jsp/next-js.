import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  apiAuthPrefix,
  authRoutes,
  defalut_redirect,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const route = req.nextUrl.pathname;

  const isApiAuthRoute = route.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(route);
  const isAuthRoute = authRoutes.includes(route);
  console.log(isApiAuthRoute, isPublicRoute, isLoggedIn);

  if (isApiAuthRoute) {
    return null;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(defalut_redirect, req.nextUrl));
    }
    return null;
  }
  if (!isPublicRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/auth/login", req.nextUrl));
    }
  }
  return null;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
