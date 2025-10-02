import { NextRequest, NextResponse } from 'next/server'
import { emailService } from '@/lib/email-service'

export async function POST(request: NextRequest) {
  try {
    const { email = 'test@example.com' } = await request.json()
    
    console.log('🧪 Test email API called:', { recipient: email })
    
    const emailOptions = {
      to: email,
      from: 'onboarding@resend.dev',
      subject: 'Test Email from Saaspertise',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2>🧪 Test Email</h2>
          <p>This is a test email from the Saaspertise application.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>Recipient:</strong> ${email}</p>
          <p>If you received this email, the email integration is working correctly!</p>
        </div>
      `
    }

    // Use email service with fallback
    const result = await emailService.sendWithFallback(emailOptions)

    if (result.success) {
      console.log(`✅ Test email sent via ${result.provider}:`, { 
        id: result.id, 
        recipient: email 
      })

      return NextResponse.json({
        success: true,
        message: `Test email sent successfully via ${result.provider}`,
        emailId: result.id,
        recipient: email,
        provider: result.provider
      })
    } else {
      console.error(`❌ Test email failed via ${result.provider}:`, result.error)

      return NextResponse.json(
        { 
          success: false, 
          error: result.error,
          provider: result.provider,
          details: 'Check server logs for more information'
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('❌ Test email API error:', error instanceof Error ? error.message : 'Unknown error')

    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: 'Check server logs for more information'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Test email API endpoint',
    usage: 'POST with { "email": "your@email.com" }',
    status: {
      apiKeyPresent: !!process.env.RESEND_API_KEY,
      fromEmail: process.env.FROM_EMAIL || 'onboarding@resend.dev'
    }
  })
}
