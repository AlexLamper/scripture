import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import createMiddleware from 'next-intl/middleware';
import {routing} from '@/routing';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export default createMiddleware(routing);

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

    /* i18n routes */
    '/(nl|en)/:path*',

    /* Exclude static assets */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
