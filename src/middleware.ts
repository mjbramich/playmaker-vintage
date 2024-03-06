import { authMiddleware } from '@clerk/nextjs';

// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
	// debug: true
	publicRoutes: (req) => !req.url.includes('/admin') // protect admin routes.
});

export const config = {
	// Runs middleware on all routes except /_next/ routes
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
