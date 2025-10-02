import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, inquiry, message } = body

    // Create a test account if no email credentials are provided
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'serenitylivingoflexington@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password-here'
      }
    })

    // Email to the business
    const businessEmailOptions = {
      from: process.env.EMAIL_USER || 'serenitylivingoflexington@gmail.com',
      to: 'serenitylivingoflexington@gmail.com',
      subject: `New Contact Form Submission - ${inquiry}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2563eb; text-align: center;">New Contact Form Submission</h2>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Inquiry Type:</strong> ${inquiry}</p>
          </div>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This message was sent from the Serenity Living contact form.
            </p>
          </div>
        </div>
      `
    }

    // Auto-reply email to the user
    const autoReplyOptions = {
      from: process.env.EMAIL_USER || 'serenitylivingoflexington@gmail.com',
      to: email,
      subject: 'Thank you for contacting Serenity Living',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2563eb; text-align: center;">Thank You for Your Interest!</h2>

          <p>Dear ${name},</p>

          <p>Thank you for reaching out to Serenity Living. We have received your inquiry regarding <strong>${inquiry}</strong> and appreciate your interest in our senior living community.</p>

          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <h3 style="color: #1e40af; margin-top: 0;">What happens next?</h3>
            <ul style="color: #374151;">
              <li>Our team will review your inquiry within 24 hours</li>
              <li>A member of our staff will contact you at ${phone} or ${email}</li>
              <li>We'll be happy to answer any questions and schedule a tour if you're interested</li>
            </ul>
          </div>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Contact Information</h3>
            <p><strong>Phone:</strong> (839) 329-6084</p>
            <p><strong>Email:</strong> serenitylivingoflexington@gmail.com</p>
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
      `
    }

    // Send both emails
    try {
      await transporter.sendMail(businessEmailOptions)
      await transporter.sendMail(autoReplyOptions)

      return NextResponse.json(
        { message: 'Email sent successfully' },
        { status: 200 }
      )
    } catch (emailError) {
      console.error('Email sending error:', emailError)

      // Even if email fails, we still want to let the user know we received their message
      return NextResponse.json(
        {
          message: 'Message received successfully. We will contact you soon.',
          warning: 'Email notification may be delayed.'
        },
        { status: 200 }
      )
    }

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}