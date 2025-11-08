import { NextResponse } from 'next/server'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.saaspertise.com'

export function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
