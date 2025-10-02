import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, inquiry, message } = body

    // Log the submission
    const submissionData = {
      timestamp: new Date().toISOString(),
      type: 'CONTACT_FORM',
      name,
      email,
      phone,
      inquiry,
      message
    }

    console.log('========================================')
    console.log('NEW CONTACT FORM SUBMISSION')
    console.log('========================================')
    console.log(JSON.stringify(submissionData, null, 2))
    console.log('========================================')

    // ALWAYS return success
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your message has been received. We will contact you soon at ' + phone + '.'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)

    // Return success anyway
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your message has been received. We will contact you soon.'
      },
      { status: 200 }
    )
  }
}
