const { Pool } = require('pg')

async function testConnection(connectionString, label) {
  console.log(`\n🔍 Testing: ${label}`)
  console.log(`Connection: ${connectionString.replace(/:[^:@]+@/, ':***@')}`)

  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  })

  try {
    const result = await pool.query('SELECT NOW() as current_time, current_database() as db_name, current_user as user_name')
    console.log('✅ SUCCESS!')
    console.log(`   Database: ${result.rows[0].db_name}`)
    console.log(`   User: ${result.rows[0].user_name}`)
    console.log(`   Time: ${result.rows[0].current_time}`)
    return true
  } catch (error) {
    console.log('❌ FAILED!')
    console.log(`   Error: ${error.message}`)
    console.log(`   Code: ${error.code}`)
    return false
  } finally {
    await pool.end()
  }
}

async function main() {
  console.log('🧪 Testing Neon Database Connection...\n')
  console.log('=' .repeat(60))

  // Original connection string from user
  const original = 'postgresql://neondb_owner:npg_5juoyGFh8wSe@ep-jolly-rain-a-dorw5ys-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require'

  await testConnection(original, 'Original connection string')

  console.log('\n' + '='.repeat(60))
  console.log('\n📝 IMPORTANT:')
  console.log('If the connection failed, please:')
  console.log('1. Go to https://console.neon.tech')
  console.log('2. Select your project')
  console.log('3. Click "Connection Details"')
  console.log('4. Copy the POOLED connection string')
  console.log('5. Make sure it includes the correct password')
  console.log('\nThe format should be:')
  console.log('postgresql://USER:PASSWORD@HOST-pooler.REGION.aws.neon.tech/DATABASE?sslmode=require')
}

main().catch(console.error)
