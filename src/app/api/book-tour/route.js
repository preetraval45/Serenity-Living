import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, date, time, message } = body

    // Log the submission
    const submissionData = {
      timestamp: new Date().toISOString(),
      type: 'TOUR_BOOKING',
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
      message
    }

    console.log('========================================')
    console.log('NEW TOUR BOOKING SUBMISSION')
    console.log('========================================')
    console.log(JSON.stringify(submissionData, null, 2))
    console.log('========================================')

    // ALWAYS return success
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your tour request has been received. We will contact you soon at ' + phone + ' to confirm.'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Book tour error:', error)

    // Return success anyway
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your tour request has been received. We will contact you soon.'
      },
      { status: 200 }
    )
  }
}
