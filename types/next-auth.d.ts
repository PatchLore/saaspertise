import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    role: string
    consultantId?: string
  }

  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      role: string
      consultantId?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
    consultantId?: string
  }
}





