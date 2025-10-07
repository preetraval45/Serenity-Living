import { NextResponse } from 'next/server'
import { query, initDatabase } from '@/lib/db'

export async function GET(request) {
  try {
    // Test database connection
    console.log('Testing database connection...')
    await query('SELECT NOW() as current_time')
    console.log('✅ Database connection successful')

    // Initialize tables
    console.log('Initializing database tables...')
    await initDatabase()

    // Verify tables exist
    const tables = await query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('contact_submissions', 'tour_bookings')
      ORDER BY table_name
    `)

    return NextResponse.json({
      success: true,
      message: 'Database setup complete!',
      tables: tables.rows.map(r => r.table_name),
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Database setup error:', error)

    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      details: 'Check Vercel function logs for more information'
    }, { status: 500 })
  }
}
