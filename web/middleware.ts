import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "www.saaspertise.com";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") ?? "";
  let redirect = false;

  // 1. Enforce HTTPS
  if (request.headers.get("x-forwarded-proto") === "http") {
    url.protocol = "https:";
    redirect = true;
  }

  // 2. Enforce www (redirect bare domain to www; skip localhost and Vercel previews)
  const isLocal = host?.startsWith("localhost") || host?.startsWith("127.0.0.1");
  const isVercelPreview = host?.includes(".vercel.app");
  if (host && host !== CANONICAL_HOST && !isLocal && !isVercelPreview) {
    url.host = CANONICAL_HOST;
    url.port = "";
    redirect = true;
  }

  // 3. Remove trailing slash (except for root)
  const path = url.pathname;
  if (path.length > 1 && path.endsWith("/")) {
    url.pathname = path.slice(0, -1);
    redirect = true;
  }

  if (redirect) {
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}
