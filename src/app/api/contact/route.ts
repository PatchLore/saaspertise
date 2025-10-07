import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Store contact submission in database
    // Note: Contact form submissions are stored without a consultant relationship
    // These are general inquiries that admin can view separately
    const contactSubmission = {
      id: `contact-${Date.now()}`,
      name,
      email,
      company: company || null,
      subject,
      message,
      createdAt: new Date()
    }
    
    // For now, we'll just log and send email
    // In future, create a separate ContactSubmission model in Prisma schema
    console.log('Contact form submission:', contactSubmission)

    // Send email notification to admin
    if (process.env.RESEND_API_KEY && process.env.FROM_EMAIL) {
      try {
        await resend.emails.send({
          from: process.env.FROM_EMAIL,
          to: 'info@saaspertise.com', // Your admin email
          subject: `New Contact Form Submission - ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>New Contact Form Submission</h2>
              <p>You have received a new contact form submission:</p>
              
              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Contact Information:</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
                <p><strong>Subject:</strong> ${subject}</p>
              </div>
              
              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Message:</h3>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                <p><strong>Submission ID:</strong> ${contactSubmission.id}</p>
                <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <p style="margin-top: 20px; color: #666; font-size: 14px;">
                This submission was generated through the Saaspertise contact form. 
                Please respond directly to the sender's email address.
              </p>
            </div>
          `
        })
      } catch (emailError) {
        // Log error for debugging but don't expose in production
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to send email notification:', emailError)
        }
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      { 
        message: 'Thank you for your message! We will get back to you within 24 hours.',
        submissionId: contactSubmission.id
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { message: 'Internal server error. Please try again or contact us directly at info@saaspertise.com' },
      { status: 500 }
    )
  }
}
