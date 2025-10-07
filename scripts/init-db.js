// Database initialization script
// Run this locally to create the database tables

const { Pool } = require('pg')

async function initDatabase() {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
  })

  try {
    console.log('Creating serenity_living database...')
    await pool.query('CREATE DATABASE serenity_living')
    console.log('✓ Database created')
  } catch (error) {
    if (error.code === '42P04') {
      console.log('✓ Database already exists')
    } else {
      throw error
    }
  }

  await pool.end()

  // Connect to the new database
  const dbPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'serenity_living',
    password: 'postgres',
    port: 5432,
  })

  try {
    console.log('\nCreating tables...')

    // Contact submissions table
    await dbPool.query(`
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
    await dbPool.query(`
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

    console.log('\n✅ Database initialization complete!')
    console.log('\nYou can now use the following connection string:')
    console.log('postgresql://postgres:postgres@localhost:5432/serenity_living')

  } catch (error) {
    console.error('Error creating tables:', error)
    throw error
  } finally {
    await dbPool.end()
  }
}

initDatabase().catch(console.error)
