import type { NextRequest } from 'next/server';
// import middleware from 'lib/middleware';

// // eslint-disable-next-line
// export default async function (req: NextRequest, ev: NextFetchEvent) {
//   return middleware(req, ev);
// }

// export const config = {
//   // Exclude Sitecore editing API routes
//   matcher: ['/', '/((?!api/editing/).*)'],
// };


import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/about-2', request.url))
  }
  console.log("Request", request)
  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  // }
  return;
}