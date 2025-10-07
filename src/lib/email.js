import nodemailer from 'nodemailer'

// Create transporter - will work without credentials by logging to console
function createTransporter() {
  // If email credentials are available, use them
  if (process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })
  }

  // Fallback: return null if no credentials
  return null
}

export async function sendContactEmail({ name, email, phone, inquiry, message }) {
  const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Inquiry Type: ${inquiry}

Message:
${message}

---
Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
  `.trim()

  console.log('\n========================================')
  console.log('EMAIL NOTIFICATION - CONTACT FORM')
  console.log('========================================')
  console.log('To: serenitylivingoflexington@gmail.com')
  console.log('Subject: New Contact Form Submission')
  console.log('---')
  console.log(emailContent)
  console.log('========================================\n')

  const transporter = createTransporter()

  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@serenitylivingoflexington.com',
        to: 'serenitylivingoflexington@gmail.com',
        subject: `New Contact Form Submission - ${inquiry}`,
        text: emailContent,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Contact Form Submission</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Inquiry Type:</strong> ${inquiry}</p>
            </div>
            <div style="margin: 20px 0;">
              <h3>Message:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
            </p>
          </div>
        `,
      })
      console.log('✅ Email sent successfully')
      return { success: true }
    } catch (error) {
      console.error('❌ Email sending failed:', error.message)
      // Don't throw error - form submission should succeed even if email fails
      return { success: false, error: error.message }
    }
  } else {
    console.log('⚠️  Email credentials not configured - email not sent')
    return { success: false, error: 'No email credentials configured' }
  }
}

export async function sendTourBookingEmail({ firstName, lastName, email, phone, date, time, message }) {
  const emailContent = `
New Tour Booking Request

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Preferred Date: ${date}
Preferred Time: ${time}
${message ? `\nAdditional Message:\n${message}` : ''}

---
Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
  `.trim()

  console.log('\n========================================')
  console.log('EMAIL NOTIFICATION - TOUR BOOKING')
  console.log('========================================')
  console.log('To: serenitylivingoflexington@gmail.com')
  console.log('Subject: New Tour Booking Request')
  console.log('---')
  console.log(emailContent)
  console.log('========================================\n')

  const transporter = createTransporter()

  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@serenitylivingoflexington.com',
        to: 'serenitylivingoflexington@gmail.com',
        subject: `New Tour Booking - ${firstName} ${lastName} on ${date}`,
        text: emailContent,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Tour Booking Request</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
              <p><strong>Preferred Date:</strong> ${date}</p>
              <p><strong>Preferred Time:</strong> ${time}</p>
            </div>
            ${message ? `
            <div style="margin: 20px 0;">
              <h3>Additional Message:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            ` : ''}
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
            </p>
            <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
              <p style="margin: 0; color: #92400e;">
                <strong>Action Required:</strong> Please call ${firstName} at ${phone} to confirm the tour booking.
              </p>
            </div>
          </div>
        `,
      })
      console.log('✅ Email sent successfully')
      return { success: true }
    } catch (error) {
      console.error('❌ Email sending failed:', error.message)
      // Don't throw error - form submission should succeed even if email fails
      return { success: false, error: error.message }
    }
  } else {
    console.log('⚠️  Email credentials not configured - email not sent')
    return { success: false, error: 'No email credentials configured' }
  }
}
