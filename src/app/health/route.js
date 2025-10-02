import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    status: 'healthy',
    service: 'Serenity Living Frontend',
    timestamp: new Date().toISOString()
  })
}