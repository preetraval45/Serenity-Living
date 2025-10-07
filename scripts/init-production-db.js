// Production database initialization script for Neon
const { Pool } = require('pg')

async function initProductionDatabase() {
  // Use the connection string from command line or environment variable
  const connectionString = process.env.NEON_DATABASE_URL || process.argv[2]

  if (!connectionString) {
    console.error('❌ Error: Please provide database connection string')
    console.log('\nUsage:')
    console.log('  node scripts/init-production-db.js "your-connection-string"')
    console.log('\nOr set NEON_DATABASE_URL environment variable')
    process.exit(1)
  }

  console.log('Connection string received ✓')

  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  })

  try {
    console.log('Connecting to Neon database...')

    // Contact submissions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        inquiry VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✓ contact_submissions table created')

    // Tour bookings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tour_bookings (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        preferred_date DATE NOT NULL,
        preferred_time VARCHAR(50) NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✓ tour_bookings table created')

    console.log('\n✅ Production database initialization complete!')
    console.log('\nNext steps:')
    console.log('1. Add DATABASE_URL to Vercel environment variables')
    console.log('2. Redeploy with: vercel --prod')

  } catch (error) {
    console.error('Error:', error.message)
    throw error
  } finally {
    await pool.end()
  }
}

initProductionDatabase().catch(console.error)
