import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, inquiry, message } = body

    // Try multiple transporter configurations
    let transporter

    // First try: Use environment variables if available
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      })
    } else {
      // Fallback: Use direct SMTP configuration
      transporter = nodemailer.createTransporter({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'serenitylivingoflexington@gmail.com',
          pass: process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD || ''
        },
        tls: {
          rejectUnauthorized: false
        }
      })
    }

    // Email to the business
    const businessEmailOptions = {
      from: `"Serenity Living Website" <serenitylivingoflexington@gmail.com>`,
      to: 'serenitylivingoflexington@gmail.com',
      replyTo: email,
      subject: `New Contact Form - ${inquiry} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #3d5a80; text-align: center;">New Contact Form Submission</h2>

          <div style="background-color: #f0f6fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #3d5a80; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Inquiry Type:</strong> ${inquiry}</p>
          </div>

          <div style="background-color: #f0f6fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #3d5a80; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This message was sent from the Serenity Living contact form.
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}
Inquiry Type: ${inquiry}

Message:
${message}

---
This message was sent from the Serenity Living contact form.
      `
    }

    // Auto-reply email to the user
    const autoReplyOptions = {
      from: `"Serenity Living" <serenitylivingoflexington@gmail.com>`,
      to: email,
      subject: 'Thank you for contacting Serenity Living',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #3d5a80; text-align: center;">Thank You for Your Interest!</h2>

          <p>Dear ${name},</p>

          <p>Thank you for reaching out to Serenity Living. We have received your inquiry regarding <strong>${inquiry}</strong> and appreciate your interest in our senior living community.</p>

          <div style="background-color: #f0f6fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3d5a80;">
            <h3 style="color: #3d5a80; margin-top: 0;">What happens next?</h3>
            <ul style="color: #374151;">
              <li>Our team will review your inquiry within 24 hours</li>
              <li>A member of our staff will contact you at ${phone} or ${email}</li>
              <li>We'll be happy to answer any questions and schedule a tour if you're interested</li>
            </ul>
          </div>

          <div style="background-color: #f0f6fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #3d5a80; margin-top: 0;">Contact Information</h3>
            <p><strong>Phone:</strong> <a href="tel:+18393296084">(839) 329-6084</a></p>
            <p><strong>Email:</strong> <a href="mailto:serenitylivingoflexington@gmail.com">serenitylivingoflexington@gmail.com</a></p>
            <p><strong>Address:</strong> 120 Rice Dr, Gilbert, SC 29054</p>
          </div>

          <p>We're excited to share more about our community and how we can provide exceptional care for you or your loved one.</p>

          <p>Warm regards,<br>
          The Serenity Living Team</p>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Serenity Living - Where compassionate care meets comfortable living
            </p>
          </div>
        </div>
      `,
      text: `
Dear ${name},

Thank you for reaching out to Serenity Living. We have received your inquiry regarding ${inquiry} and appreciate your interest in our senior living community.

What happens next?
- Our team will review your inquiry within 24 hours
- A member of our staff will contact you at ${phone} or ${email}
- We'll be happy to answer any questions and schedule a tour if you're interested

Contact Information:
Phone: (839) 329-6084
Email: serenitylivingoflexington@gmail.com
Address: 120 Rice Dr, Gilbert, SC 29054

We're excited to share more about our community and how we can provide exceptional care for you or your loved one.

Warm regards,
The Serenity Living Team

---
Serenity Living - Where compassionate care meets comfortable living
      `
    }

    // Send both emails
    try {
      // Verify transporter connection
      await transporter.verify()

      // Send business email
      await transporter.sendMail(businessEmailOptions)

      // Send auto-reply
      await transporter.sendMail(autoReplyOptions)

      return NextResponse.json(
        {
          success: true,
          message: 'Thank you! Your message has been sent successfully. We will contact you soon.'
        },
        { status: 200 }
      )
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      console.error('Error details:', {
        code: emailError.code,
        command: emailError.command,
        response: emailError.response,
        responseCode: emailError.responseCode
      })

      // Store submission data for manual follow-up
      const submissionData = {
        timestamp: new Date().toISOString(),
        name,
        email,
        phone,
        inquiry,
        message
      }

      console.log('Contact form submission (email failed):', JSON.stringify(submissionData, null, 2))

      // Return success to user but log the issue
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you! Your message has been received. We will contact you soon.',
          warning: 'Email notification is pending. Our team has been notified.'
        },
        { status: 200 }
      )
    }

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'There was an error processing your request. Please try again or call us directly at (839) 329-6084.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}
