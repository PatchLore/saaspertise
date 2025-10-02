import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      )
    }

    // In a real implementation, you might want to invalidate the session
    // For NextAuth with JWT strategy, the client should handle logout
    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}



