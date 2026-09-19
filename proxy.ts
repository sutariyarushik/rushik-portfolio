import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { get } from '@vercel/global-config';
import {
  MAINTENANCE_BYPASS_COOKIE,
  MAINTENANCE_BYPASS_MAX_AGE,
  MAINTENANCE_FLAG_KEY,
  MAINTENANCE_RETRY_AFTER_SECONDS,
  getMaintenanceHtml,
} from '@/lib/maintenance';

export async function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const previewParam = nextUrl.searchParams.get('preview');
  const bypassSecret = process.env.MAINTENANCE_BYPASS_SECRET;

  if (previewParam !== null) {
    const cleanUrl = nextUrl.clone();
    cleanUrl.searchParams.delete('preview');
    const response = NextResponse.redirect(cleanUrl);

    if (previewParam === 'clear') {
      response.cookies.delete(MAINTENANCE_BYPASS_COOKIE);
    } else if (bypassSecret && previewParam === bypassSecret) {
      response.cookies.set(MAINTENANCE_BYPASS_COOKIE, bypassSecret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: MAINTENANCE_BYPASS_MAX_AGE,
      });
    }

    return response;
  }

  const bypassCookie = request.cookies.get(MAINTENANCE_BYPASS_COOKIE)?.value;
  if (bypassSecret && bypassCookie === bypassSecret) {
    return NextResponse.next();
  }

  let maintenanceMode = false;
  try {
    maintenanceMode = (await get<boolean>(MAINTENANCE_FLAG_KEY)) === true;
  } catch (error) {
    console.error('Failed to read maintenance flag from Global Config:', error);
  }

  if (!maintenanceMode) {
    return NextResponse.next();
  }

  return new NextResponse(getMaintenanceHtml(), {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Retry-After': String(MAINTENANCE_RETRY_AFTER_SECONDS),
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
