import { auth } from "@/auth";

export default auth((req:any) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const apiAuthPrefix = "/api";
  const publicRoutes = ["/auth/login", "/auth/signup", "/", "/public/"];
  const authRoutes = ["/auth/login", "/auth/signup"];
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    console.log("api auth");
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log("logged in");
      return Response.redirect(new URL("/dashboard", req.url));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    console.log("not logged in");
    return Response.redirect(new URL("/auth/login", req.url));
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
