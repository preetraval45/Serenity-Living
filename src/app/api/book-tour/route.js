import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, date, time, message } = body

    // Create transporter
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
      subject: `New Tour Booking Request - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2563eb; text-align: center;">New Tour Booking Request</h2>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Visitor Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
          </div>

          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Tour Details</h3>
            <p><strong>Preferred Date:</strong> ${date}</p>
            <p><strong>Preferred Time:</strong> ${time}</p>
          </div>

          ${message ? `
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Additional Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          ` : ''}

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This message was sent from the Serenity Living tour booking form.
            </p>
          </div>
        </div>
      `
    }

    // Auto-reply email to the user
    const autoReplyOptions = {
      from: process.env.EMAIL_USER || 'serenitylivingoflexington@gmail.com',
      to: email,
      subject: 'Tour Request Received - Serenity Living',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2563eb; text-align: center;">Your Tour Request Has Been Received!</h2>

          <p>Dear ${firstName} ${lastName},</p>

          <p>Thank you for scheduling a tour with Serenity Living! We're excited to show you our community and answer any questions you may have.</p>

          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <h3 style="color: #1e40af; margin-top: 0;">Your Tour Details</h3>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Duration:</strong> 45-60 minutes</p>
          </div>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">What to Expect</h3>
            <ul style="color: #374151;">
              <li>A personal guide will show you around our facilities</li>
              <li>Meet our caring staff members</li>
              <li>Learn about our services and amenities</li>
              <li>Get all your questions answered</li>
            </ul>
          </div>

          <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
            <h3 style="color: #c2410c; margin-top: 0;">Next Steps</h3>
            <p style="color: #374151;">A member of our team will contact you within 24 hours at ${phone} or ${email} to confirm your tour appointment.</p>
          </div>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Contact Information</h3>
            <p><strong>Phone:</strong> (839) 329-6084</p>
            <p><strong>Email:</strong> serenitylivingoflexington@gmail.com</p>
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
      `
    }

    // Send both emails
    try {
      await transporter.sendMail(businessEmailOptions)
      await transporter.sendMail(autoReplyOptions)

      return NextResponse.json(
        { message: 'Tour booking request sent successfully' },
        { status: 200 }
      )
    } catch (emailError) {
      console.error('Email sending error:', emailError)

      return NextResponse.json(
        {
          message: 'Tour request received successfully. We will contact you soon to confirm.',
          warning: 'Email notification may be delayed.'
        },
        { status: 200 }
      )
    }

  } catch (error) {
    console.error('Book tour error:', error)
    return NextResponse.json(
      { error: 'Failed to process tour booking' },
      { status: 500 }
    )
  }
}
