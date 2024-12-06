import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    const user = await supabase.auth.getUser();

    const protectedRoutes = [
      "/home",
      "/map",
      "/api",
      "/chapters",
      "/characters",
      "/dashboard",
      "/events",
      "/leaderboard",
      "/notes",
      "/places",
      "/progress",
      "/settings",
      "/teachings",
      "/themes",
    ];

    const publicRoutes = [
      "/",
      "/login",
      "/sign-in",
      "/sign-up",
      "/about",
      "/help",
      "/tos",
    ];

    const isProtectedRoute = protectedRoutes.some(route => 
      request.nextUrl.pathname.startsWith(route) || 
      request.nextUrl.pathname === route
    );

    const isPublicRoute = publicRoutes.some(route => 
      request.nextUrl.pathname.startsWith(route) || 
      request.nextUrl.pathname === route
    );

    if (isProtectedRoute && user.error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (request.nextUrl.pathname === "/" && !user.error) {
      return NextResponse.redirect(new URL("/protected", request.url));
    }

    // Optional: Redirect authenticated users away from public routes
    // if (isPublicRoute && !user.error) {
    //   return NextResponse.redirect(new URL("/home", request.url));
    // }

    return response;
  } catch (e) {
    console.error("Supabase client creation failed:", e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};

