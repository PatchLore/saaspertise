import { NextAuthOptions } from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
// Removed password CredentialsProvider in favor of Email magic link
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { emailService } from './email-service'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as unknown as Adapter,
  providers: [
    EmailProvider({
      // Uses VerificationToken table via PrismaAdapter
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        // DEMO_MODE bypass for testing
        if (process.env.DEMO_MODE === 'true') {
          console.log('🚀 DEMO_MODE: Skipping email send, auto-authenticating user:', identifier)
          return Promise.resolve()
        }

        console.log('📧 Magic link request:', { recipient: identifier })
        
        try {
          const host = new URL(url).host
          const from = process.env.FROM_EMAIL || 'onboarding@resend.dev' // Use configured sender
          
          const emailOptions = {
            to: identifier,
            from,
            subject: `Sign in to ${host}`,
            html: `
              <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px">
                <h2 style="margin:0 0 16px">Your sign-in link</h2>
                <p style="margin:0 0 16px">Click the button below to sign in to ${host}.</p>
                <p style="margin:24px 0"><a href="${url}" style="background:#2563EB;color:#fff;text-decoration:none;padding:12px 16px;border-radius:6px;display:inline-block">Sign in</a></p>
                <p style="margin:16px 0;color:#555">If you did not request this, you can safely ignore this email.</p>
              </div>
            `
          }

          // Try primary provider with fallback
          const result = await emailService.sendWithFallback(emailOptions)
          
          if (result.success) {
            console.log(`✅ Email sent via ${result.provider}:`, { id: result.id, recipient: identifier })
          } else {
            console.error(`❌ Email failed via ${result.provider}:`, result.error)
          }
          
          return result
        } catch (error) {
          console.error('❌ Email service error:', error instanceof Error ? error.message : 'Unknown error')
          // Don't throw - let NextAuth handle gracefully
        }
      },
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // When using email provider, user may be minimal; safely extract extras
        const extra = user as unknown as { role?: string; consultantId?: string }
        token.role = extra.role ?? 'CONSULTANT'
        token.consultantId = extra.consultantId
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.consultantId = token.consultantId as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // If url is already absolute, use it
      if (url.startsWith('http')) return url
      
      // If url starts with '/', make it absolute
      if (url.startsWith('/')) return `${baseUrl}${url}`
      
      // Default to dashboard for magic link sign-ins
      return `${baseUrl}/dashboard`
    }
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request'
  }
}




