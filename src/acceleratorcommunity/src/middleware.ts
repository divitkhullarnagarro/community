import type { NextRequest } from 'next/server';

export const config = {
  // Exclude Sitecore editing API routes
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
  runtime: 'nodejs',
  unstable_allowDynamic: ['/src/assets/helpers/middlewareHelper.ts', '/lib/utilities.js', '/node_modules/function-bind/**', '/node_modules/ts-invariant/lib/invariant.esm.js', '/node_modules/apollo-boost/lib/bundle.esm.js', '/node_modules/graphql/error/GraphQLError.mjs',
  ],
};


import { NextResponse } from 'next/server';
import { getPathList } from 'assets/helpers/middlewareHelper';

export async function middleware(request: NextRequest, response: NextResponse) {
  let userToken = request.cookies.get("UserToken");
  let innerResp: any = false;
  const params = new URLSearchParams(request.nextUrl.search);
  let scMode = params.get('sc_mode');

  if (!scMode && request.nextUrl.search.includes('sc_mode=edit')) {
    scMode = 'edit';
  } else if (!scMode && request.nextUrl.search.includes('sc_mode=preview')) {
    scMode = 'preview';
  }

  if (!userToken) {
    innerResp = await getPathList(request);
  }
  if (innerResp && (scMode != "edit" && scMode != "preview")) return NextResponse.rewrite(new URL('/login', request.url));

  if (request.nextUrl.pathname.startsWith('/post')) {
    if (request.cookies.get("UserToken") != '' && request.cookies.get("UserToken") != null)
      return;
    else {
      response = NextResponse.next() && NextResponse.rewrite(new URL('/login', request.url));
      response.cookies?.set("routeToUrl", request.nextUrl.pathname, { path: "/", httpOnly: false });
      // return NextResponse.rewrite(new URL('/login', request.url))
      return response;
    }
  }
  return;
}
