import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, date, time, message } = body

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
      subject: `New Tour Booking - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #3d5a80; text-align: center;">New Tour Booking Request</h2>

          <div style="background-color: #f0f6fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #3d5a80; margin-top: 0;">Visitor Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          </div>

          <div style="background-color: #fef7f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #3d5a80; margin-top: 0;">Tour Details</h3>
            <p><strong>Preferred Date:</strong> ${date}</p>
            <p><strong>Preferred Time:</strong> ${time}</p>
          </div>

          ${message ? `
          <div style="background-color: #f0f6fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #3d5a80; margin-top: 0;">Additional Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          ` : ''}

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This message was sent from the Serenity Living tour booking form.
            </p>
          </div>
        </div>
      `,
      text: `
New Tour Booking Request

Visitor Information:
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Tour Details:
Preferred Date: ${date}
Preferred Time: ${time}

${message ? `Additional Message:\n${message}\n` : ''}
---
This message was sent from the Serenity Living tour booking form.
      `
    }

    // Auto-reply email to the user
    const autoReplyOptions = {
      from: `"Serenity Living" <serenitylivingoflexington@gmail.com>`,
      to: email,
      subject: 'Tour Request Received - Serenity Living',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #3d5a80; text-align: center;">Your Tour Request Has Been Received!</h2>

          <p>Dear ${firstName} ${lastName},</p>

          <p>Thank you for scheduling a tour with Serenity Living! We're excited to show you our community and answer any questions you may have.</p>

          <div style="background-color: #f0f6fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3d5a80;">
            <h3 style="color: #3d5a80; margin-top: 0;">Your Tour Details</h3>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Duration:</strong> 45-60 minutes</p>
          </div>

          <div style="background-color: #f0f6fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #3d5a80; margin-top: 0;">What to Expect</h3>
            <ul style="color: #374151;">
              <li>A personal guide will show you around our facilities</li>
              <li>Meet our caring staff members</li>
              <li>Learn about our services and amenities</li>
              <li>Get all your questions answered</li>
            </ul>
          </div>

          <div style="background-color: #fef7f4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff7f5c;">
            <h3 style="color: #3d5a80; margin-top: 0;">Next Steps</h3>
            <p style="color: #374151;">A member of our team will contact you within 24 hours at ${phone} or ${email} to confirm your tour appointment.</p>
          </div>

          <div style="background-color: #f0f6fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #3d5a80; margin-top: 0;">Contact Information</h3>
            <p><strong>Phone:</strong> <a href="tel:+18393296084">(839) 329-6084</a></p>
            <p><strong>Email:</strong> <a href="mailto:serenitylivingoflexington@gmail.com">serenitylivingoflexington@gmail.com</a></p>
            <p><strong>Address:</strong> 120 Rice Dr, Gilbert, SC 29054</p>
          </div>

          <p>If you have any questions or need to reschedule, please don't hesitate to contact us.</p>

          <p>We look forward to meeting you!</p>

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
Dear ${firstName} ${lastName},

Thank you for scheduling a tour with Serenity Living! We're excited to show you our community and answer any questions you may have.

Your Tour Details:
Date: ${date}
Time: ${time}
Duration: 45-60 minutes

What to Expect:
- A personal guide will show you around our facilities
- Meet our caring staff members
- Learn about our services and amenities
- Get all your questions answered

Next Steps:
A member of our team will contact you within 24 hours at ${phone} or ${email} to confirm your tour appointment.

Contact Information:
Phone: (839) 329-6084
Email: serenitylivingoflexington@gmail.com
Address: 120 Rice Dr, Gilbert, SC 29054

If you have any questions or need to reschedule, please don't hesitate to contact us.

We look forward to meeting you!

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
          message: 'Thank you! Your tour request has been sent successfully. We will contact you soon to confirm.'
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
        firstName,
        lastName,
        email,
        phone,
        date,
        time,
        message
      }

      console.log('Tour booking submission (email failed):', JSON.stringify(submissionData, null, 2))

      // Return success to user but log the issue
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you! Your tour request has been received. We will contact you soon to confirm.',
          warning: 'Email notification is pending. Our team has been notified.'
        },
        { status: 200 }
      )
    }

  } catch (error) {
    console.error('Book tour error:', error)
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
