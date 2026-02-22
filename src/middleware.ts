import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check for maintenance mode
    if (process.env.MAINTENANCE_MODE === "true") {
        if (pathname !== "/maintenance") {
            return NextResponse.redirect(new URL("/maintenance", request.url));
        }
        return NextResponse.next();
    } else if (pathname === "/maintenance") {
        // If maintenance mode is false, redirect /maintenance to /
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Protect admin routes
    if (pathname.startsWith("/admin")) {
        const token = request.cookies.get("auth-token")?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        try {
            const payload = await verifyToken(token);
            if (!payload || payload.role !== "ADMIN") {
                return NextResponse.redirect(new URL("/", request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};