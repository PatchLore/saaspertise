import { Resend } from 'resend'
import sgMail from '@sendgrid/mail'
import Mailgun from 'mailgun.js'

export interface EmailOptions {
  to: string
  from: string
  subject: string
  html: string
}

export interface EmailResult {
  success: boolean
  id?: string
  error?: string
  provider: 'resend' | 'sendgrid' | 'mailgun'
}

class EmailService {
  private provider: 'resend' | 'sendgrid' | 'mailgun'
  private resend: Resend | null = null
  private mailgun: Mailgun | null = null

  constructor() {
    // Determine provider from environment - prioritize resend for production
    this.provider = (process.env.EMAIL_PROVIDER as 'resend' | 'sendgrid' | 'mailgun') || 'resend'
    
    if (this.provider === 'resend' && process.env.RESEND_API_KEY) {
      this.resend = new Resend(process.env.RESEND_API_KEY)
    }
    
    if (this.provider === 'sendgrid' && process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    }

    if (this.provider === 'mailgun' && process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
      this.mailgun = new Mailgun(FormData)
    }
  }

  async sendEmail(options: EmailOptions): Promise<EmailResult> {
    console.log(`📧 Sending email via ${this.provider}:`, { 
      to: options.to, 
      from: options.from,
      subject: options.subject 
    })

    if (this.provider === 'resend') {
      return this.sendViaResend(options)
    } else if (this.provider === 'sendgrid') {
      return this.sendViaSendGrid(options)
    } else if (this.provider === 'mailgun') {
      return this.sendViaMailgun(options)
    } else {
      return {
        success: false,
        error: `Unknown email provider: ${this.provider}`,
        provider: this.provider
      }
    }
  }

  private async sendViaResend(options: EmailOptions): Promise<EmailResult> {
    try {
      if (!this.resend) {
        throw new Error('Resend not initialized - check RESEND_API_KEY')
      }

      const result = await this.resend.emails.send({
        to: options.to,
        from: options.from,
        subject: options.subject,
        html: options.html
      })

      console.log('✅ Resend success:', { id: result.data?.id, to: options.to })
      
      return {
        success: true,
        id: result.data?.id,
        provider: 'resend'
      }
    } catch (error) {
      console.error('❌ Resend failed:', error instanceof Error ? error.message : 'Unknown error')
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        provider: 'resend'
      }
    }
  }

  private async sendViaSendGrid(options: EmailOptions): Promise<EmailResult> {
    try {
      const msg = {
        to: options.to,
        from: options.from,
        subject: options.subject,
        html: options.html,
      }

      const result = await sgMail.send(msg)
      console.log('✅ SendGrid success:', { id: result[0]?.headers?.['x-message-id'], to: options.to })
      
      return {
        success: true,
        id: result[0]?.headers?.['x-message-id'] as string,
        provider: 'sendgrid'
      }
    } catch (error) {
      console.error('❌ SendGrid failed:', error instanceof Error ? error.message : 'Unknown error')
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        provider: 'sendgrid'
      }
    }
  }

  private async sendViaMailgun(options: EmailOptions): Promise<EmailResult> {
    try {
      if (!this.mailgun) {
        throw new Error('Mailgun not initialized - check MAILGUN_API_KEY and MAILGUN_DOMAIN')
      }

      const mg = this.mailgun.client({
        username: 'api',
        key: process.env.MAILGUN_API_KEY!,
      })

      const result = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
        from: options.from,
        to: options.to,
        subject: options.subject,
        html: options.html,
      })

      console.log('✅ Mailgun success:', { id: result.id, to: options.to })
      
      return {
        success: true,
        id: result.id,
        provider: 'mailgun'
      }
    } catch (error) {
      console.error('❌ Mailgun failed:', error instanceof Error ? error.message : 'Unknown error')
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        provider: 'mailgun'
      }
    }
  }

  // Fallback method that tries both providers
  async sendWithFallback(options: EmailOptions): Promise<EmailResult> {
    // Try primary provider first
    const primaryResult = await this.sendEmail(options)
    
    if (primaryResult.success) {
      return primaryResult
    }

    console.log(`⚠️ Primary provider (${this.provider}) failed, trying fallback`)
    
    // Try fallback provider - prioritize resend for reliability
    const fallbackProvider: 'resend' | 'mailgun' = this.provider === 'resend' ? 'mailgun' : 'resend'
    const originalProvider = this.provider
    
    this.provider = fallbackProvider
    
    // Reinitialize for fallback
    if (fallbackProvider === 'resend' && process.env.RESEND_API_KEY) {
      this.resend = new Resend(process.env.RESEND_API_KEY)
    } else if (fallbackProvider === 'mailgun' && process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
      this.mailgun = new Mailgun(FormData)
    }
    
    const fallbackResult = await this.sendEmail(options)
    
    // Restore original provider
    this.provider = originalProvider
    
    return {
      ...fallbackResult,
      provider: fallbackProvider
    }
  }
}

export const emailService = new EmailService()
