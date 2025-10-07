const { Pool } = require('pg')

async function setupNeonDatabase() {
  const connectionString = 'postgresql://neondb_owner:npg_5juoyGFh8wSe@ep-jolly-rain-adorw5ys-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require'

  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  })

  try {
    console.log('🔌 Connecting to Neon database...\n')

    // Test connection
    await pool.query('SELECT NOW()')
    console.log('✅ Connection successful!\n')

    // Create contact_submissions table
    console.log('Creating contact_submissions table...')
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
    console.log('✅ contact_submissions table created\n')

    // Create tour_bookings table
    console.log('Creating tour_bookings table...')
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
    console.log('✅ tour_bookings table created\n')

    // Verify tables
    const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('contact_submissions', 'tour_bookings')
      ORDER BY table_name
    `)

    console.log('📊 Tables in database:')
    result.rows.forEach(row => {
      console.log(`  ✓ ${row.table_name}`)
    })

    console.log('\n🎉 Database setup complete!')
    console.log('\n📋 Next steps:')
    console.log('  1. Update Vercel environment variables')
    console.log('  2. Redeploy to Vercel')
    console.log('  3. Test forms on live site')

  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.code) {
      console.error('   Error Code:', error.code)
    }
    throw error
  } finally {
    await pool.end()
  }
}

setupNeonDatabase().catch(err => {
  console.error('\n❌ Setup failed:', err.message)
  process.exit(1)
})
