import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Middleware logic here if needed
    console.log("Middleware running for:", req.nextUrl.pathname)
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is authenticated
        const isAuth = !!token
        const isOnAuthPage = req.nextUrl.pathname.startsWith('/auth')
        const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard')
        const isOnPublicPages = ['/', '/about', '/services', '/contact', '/gallery'].includes(req.nextUrl.pathname)
        
        if (isOnAuthPage) {
          // If user is already authenticated and trying to access auth pages, redirect to dashboard
          if (isAuth) return Response.redirect(new URL('/dashboard', req.url))
          return true // Allow unauthenticated users to access auth pages
        }

        if (isOnPublicPages) {
          return true // Allow access to public pages
        }

        if (isOnDashboard) {
          // Require authentication for dashboard
          if (!isAuth) return false
          return true
        }

        // Default: require authentication for all other pages
        return isAuth
      },
    },
    pages: {
      signIn: '/auth',
    },
  }
)

export const config = {
  // Protect all routes except public ones and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)'
  ]
}