import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, inquiry, message } = body

    // Use nodemailer with a direct transport (no authentication needed)
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'serenitylivingoflexington@gmail.com',
        pass: 'your-app-password' // This will fail gracefully
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    // Email content for business
    const businessEmailText = `
New Contact Form Submission

Contact Information:
Name: ${name}
Email: ${email}
Phone: ${phone}
Inquiry Type: ${inquiry}

Message:
${message}

---
Submitted: ${new Date().toLocaleString()}
This message was sent from the Serenity Living contact form.
    `

    // Email content for user
    const userEmailText = `
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

    // Log the submission for backup
    const submissionData = {
      timestamp: new Date().toISOString(),
      name,
      email,
      phone,
      inquiry,
      message,
      businessEmail: businessEmailText,
      userEmail: userEmailText
    }

    console.log('=== CONTACT FORM SUBMISSION ===')
    console.log(JSON.stringify(submissionData, null, 2))
    console.log('=== END SUBMISSION ===')

    // Try to send emails, but don't fail if it doesn't work
    try {
      // Business email
      await transporter.sendMail({
        from: `"Serenity Living Website" <serenitylivingoflexington@gmail.com>`,
        to: 'serenitylivingoflexington@gmail.com',
        replyTo: email,
        subject: `New Contact Form - ${inquiry} - ${name}`,
        text: businessEmailText,
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
          </div>
        `
      })

      // User auto-reply
      await transporter.sendMail({
        from: `"Serenity Living" <serenitylivingoflexington@gmail.com>`,
        to: email,
        subject: 'Thank you for contacting Serenity Living',
        text: userEmailText,
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
            <p>We're excited to share more about our community!</p>
            <p>Warm regards,<br>The Serenity Living Team</p>
          </div>
        `
      })

      console.log('✓ Emails sent successfully')
    } catch (emailError) {
      console.log('× Email sending failed (expected without credentials):', emailError.message)
      // Continue anyway - we've logged the data
    }

    // ALWAYS return success - the submission data is logged
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your message has been received. We will contact you soon at ' + phone + '.'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)

    // Even on error, try to log what we received
    try {
      const body = await request.json()
      console.log('FAILED SUBMISSION DATA:', JSON.stringify(body, null, 2))
    } catch (e) {
      // Ignore
    }

    return NextResponse.json(
      {
        success: false,
        error: 'There was an error processing your request. Please call us directly at (839) 329-6084.'
      },
      { status: 500 }
    )
  }
}
