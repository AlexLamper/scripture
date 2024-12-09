import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /* Public Routes */
    "/", // Root
    "/about",
    "/help",
    "/faq",

    /* Protected Routes */
    "/home",
    "/map",
    "/chapters",
    "/characters",
    "/places",
    "/events",
    "/themes",
    "/teachings",
    "/notes",
    "/leaderboard",
    "/settings",
    "/learn",

    /* API and dynamic routes */
    "/api/:path*",
    "/dashboard",

    /* Exclude static assets */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
