import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { sendContactEmail } from '@/lib/email'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, inquiry, message } = body

    // Validate required fields
    if (!name || !email || !inquiry || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to database
    await query(
      `INSERT INTO contact_submissions (name, email, phone, inquiry, message)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, email, phone || null, inquiry, message]
    )

    // Send email notification (non-blocking)
    sendContactEmail({ name, email, phone, inquiry, message }).catch(err => {
      console.error('Email sending failed (non-critical):', err)
    })

    console.log('========================================')
    console.log('NEW CONTACT FORM SUBMISSION')
    console.log('========================================')
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      type: 'CONTACT_FORM',
      name,
      email,
      phone,
      inquiry,
      message
    }, null, 2))
    console.log('========================================')

    return NextResponse.json(
      {
        success: true,
        message: phone
          ? `Thank you! Your message has been received. We will contact you soon at ${phone}.`
          : 'Thank you! Your message has been received. We will contact you soon.'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to submit your message. Please try again or call us directly at (839) 329-6084.'
      },
      { status: 500 }
    )
  }
}
