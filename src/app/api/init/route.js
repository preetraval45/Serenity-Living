import { NextResponse } from 'next/server'
import { initializeDatabase } from '@/lib/database'

export async function GET() {
  try {
    
    await initializeDatabase()
    return NextResponse.json({ 
      status: 'success', 
      message: 'Database initialized successfully' 
    })
  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to initialize database',
        error: error.message 
      },
      { status: 500 }
    )
  }
}