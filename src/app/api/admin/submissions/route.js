import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// Disable caching for this API route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    // Fetch contact submissions
    const contactResult = await query(
      'SELECT * FROM contact_submissions ORDER BY created_at DESC'
    )

    // Fetch tour bookings
    const tourResult = await query(
      'SELECT * FROM tour_bookings ORDER BY created_at DESC'
    )

    return NextResponse.json(
      {
        success: true,
        contactSubmissions: contactResult.rows,
        tourBookings: tourResult.rows
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    )
  } catch (error) {
    console.error('Error fetching submissions:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch submissions',
        contactSubmissions: [],
        tourBookings: []
      },
      { status: 500 }
    )
  }
}
