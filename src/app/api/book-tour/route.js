import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { sendTourBookingEmail } from '@/lib/email'

export async function POST(request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, date, time, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !date || !time) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Validate date is not in the past
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (selectedDate < today) {
      return NextResponse.json(
        { success: false, message: 'Tour date cannot be in the past' },
        { status: 400 }
      )
    }

    // Save to database
    await query(
      `INSERT INTO tour_bookings (first_name, last_name, email, phone, preferred_date, preferred_time, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [firstName, lastName, email, phone, date, time, message || null]
    )

    // Send email notification (non-blocking)
    sendTourBookingEmail({ firstName, lastName, email, phone, date, time, message }).catch(err => {
      console.error('Email sending failed (non-critical):', err)
    })

    console.log('NEW TOUR BOOKING SUBMISSION')
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      type: 'TOUR_BOOKING',
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
      message
    }, null, 2))

    return NextResponse.json(
      {
        success: true,
        message: `Thank you! Your tour request has been received. We will contact you soon at ${phone} to confirm.`
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Book tour error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to book your tour. Please try again or call us directly at (839) 329-6084.'
      },
      { status: 500 }
    )
  }
}
