import { NextRequest, NextResponse } from 'next/server'
import { emailService } from '@/lib/email-service'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email address is required' },
        { status: 400 }
      )
    }

    console.log('🔍 Debug email request:', { email })

    // Check environment variables
    const envCheck = {
      EMAIL_PROVIDER: process.env.EMAIL_PROVIDER,
      RESEND_API_KEY: process.env.RESEND_API_KEY ? 'SET' : 'NOT_SET',
      RESEND_API_KEY_LENGTH: process.env.RESEND_API_KEY?.length || 0,
      MAILGUN_API_KEY: process.env.MAILGUN_API_KEY ? 'SET' : 'NOT_SET',
      MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY ? 'SET' : 'NOT_SET',
      FROM_EMAIL: process.env.FROM_EMAIL,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL
    }

    console.log('🔧 Environment check:', envCheck)

    // Test email sending with detailed logging
    const emailOptions = {
      to: email,
      from: 'onboarding@resend.dev',
      subject: 'Debug Test Email from Saaspertise',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2>🔍 Debug Test Email</h2>
          <p>This is a debug test email from the Saaspertise application.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>Recipient:</strong> ${email}</p>
          <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
          <p><strong>Provider:</strong> ${process.env.EMAIL_PROVIDER || 'default'}</p>
          <p>If you received this email, the email service is working correctly!</p>
          <hr>
          <p><small>Debug information: This email was sent via the debug endpoint for troubleshooting purposes.</small></p>
        </div>
      `
    }

    console.log('📧 Attempting to send debug email:', { to: email })

    // Use email service with fallback
    const result = await emailService.sendWithFallback(emailOptions)

    console.log('📊 Email service result:', result)

    // Return comprehensive debug information
    return NextResponse.json({
      success: result.success,
      debug: {
        environment: envCheck,
        emailOptions: {
          to: emailOptions.to,
          from: emailOptions.from,
          subject: emailOptions.subject
        },
        result: {
          success: result.success,
          provider: result.provider,
          id: result.id,
          error: result.error
        },
        timestamp: new Date().toISOString(),
        recommendations: result.success ? [
          'Email sent successfully!',
          'Check your inbox and spam folder',
          'If not received, check Resend dashboard for delivery logs'
        ] : [
          'Email sending failed',
          'Check API key and account status',
          'Verify email service configuration',
          'Check server logs for detailed errors'
        ]
      }
    })

  } catch (error) {
    console.error('❌ Debug email endpoint error:', error)

    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        debug: {
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          timestamp: new Date().toISOString()
        }
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Debug email API endpoint',
    usage: 'POST with { "email": "your@email.com" }',
    description: 'This endpoint provides detailed debugging information for email sending issues',
    features: [
      'Environment variable validation',
      'Email service testing',
      'Comprehensive error reporting',
      'Provider fallback testing'
    ]
  })
}



