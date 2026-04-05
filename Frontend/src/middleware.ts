import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect to /login if not authenticated
  },
  callbacks: {
    authorized: ({ req, token }) => {
      // Allow access to /login to prevent redirect loop
      if (req.nextUrl.pathname === "/login") {
        return true;
      }
      return !!token; // Allow access if token exists
    },
  },
});

export const config = {
  matcher: ["/rescue/create"], // Apply middleware only to /rescue/create
};