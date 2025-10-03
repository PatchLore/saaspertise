import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (session) {
      // User is authenticated, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } else {
      // User is not authenticated, redirect to sign-in
      return NextResponse.redirect(new URL('/auth/signin?error=SessionExpired', request.url))
    }
  } catch (error) {
    console.error('Callback error:', error)
    return NextResponse.redirect(new URL('/auth/signin?error=CallbackError', request.url))
  }
}



