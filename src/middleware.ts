import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: [
    /*
     * Proteger TODAS las rutas /admin
     * NextAuth con pages.signIn configurado ignorará /admin/login
     */
    "/admin/:path*",
  ],
};
