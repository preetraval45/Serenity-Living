import { Pool } from 'pg'

const pool = process.env.DATABASE_URL ? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
}) : null

// Database initialization
export async function initializeDatabase() {
  if (!pool) {
    throw new Error('Database pool not initialized - DATABASE_URL not set')
  }
  
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        password VARCHAR(255),
        email_verified TIMESTAMP,
        image TEXT,
        reset_token VARCHAR(255),
        reset_token_expires TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create accounts table for OAuth
    await pool.query(`
      CREATE TABLE IF NOT EXISTS accounts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(255) NOT NULL,
        provider VARCHAR(255) NOT NULL,
        provider_account_id VARCHAR(255) NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at INTEGER,
        token_type VARCHAR(255),
        scope VARCHAR(255),
        id_token TEXT,
        session_state VARCHAR(255),
        UNIQUE(provider, provider_account_id)
      )
    `)

    // Create sessions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        session_token VARCHAR(255) UNIQUE NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        expires TIMESTAMP NOT NULL
      )
    `)

    // Create verification_tokens table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS verification_tokens (
        identifier VARCHAR(255) NOT NULL,
        token VARCHAR(255) UNIQUE NOT NULL,
        expires TIMESTAMP NOT NULL,
        UNIQUE(identifier, token)
      )
    `)

    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Database initialization error:', error)
    throw error
  }
}

// User operations
export const db = {
  // Find user by email
  async findUserByEmail(email) {
    if (!pool) throw new Error('Database not connected')
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    return result.rows[0] || null
  },

  // Find user by id
  async findUserById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    return result.rows[0] || null
  },

  // Find user by reset token
  async findUserByResetToken(token) {
    const result = await pool.query(
      'SELECT * FROM users WHERE reset_token = $1 AND reset_token_expires > NOW()',
      [token]
    )
    return result.rows[0] || null
  },

  // Create new user
  async createUser({ name, email, phone, password }) {
    const result = await pool.query(
      'INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, password]
    )
    return result.rows[0]
  },

  // Update user
  async updateUser(id, updates) {
    const fields = Object.keys(updates)
    const values = Object.values(updates)
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ')
    
    const result = await pool.query(
      `UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      [id, ...values]
    )
    return result.rows[0]
  },

  // Delete user
  async deleteUser(id) {
    await pool.query('DELETE FROM users WHERE id = $1', [id])
  },

  // Account operations for OAuth
  async createAccount(account) {
    const result = await pool.query(
      `INSERT INTO accounts (user_id, type, provider, provider_account_id, refresh_token, access_token, expires_at, token_type, scope, id_token, session_state)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        account.userId,
        account.type,
        account.provider,
        account.providerAccountId,
        account.refresh_token,
        account.access_token,
        account.expires_at,
        account.token_type,
        account.scope,
        account.id_token,
        account.session_state
      ]
    )
    return result.rows[0]
  },

  // Session operations
  async createSession(session) {
    const result = await pool.query(
      'INSERT INTO sessions (session_token, user_id, expires) VALUES ($1, $2, $3) RETURNING *',
      [session.sessionToken, session.userId, session.expires]
    )
    return result.rows[0]
  },

  async getSession(sessionToken) {
    const result = await pool.query('SELECT * FROM sessions WHERE session_token = $1', [sessionToken])
    return result.rows[0] || null
  },

  async updateSession(sessionToken, session) {
    const result = await pool.query(
      'UPDATE sessions SET expires = $2 WHERE session_token = $1 RETURNING *',
      [sessionToken, session.expires]
    )
    return result.rows[0]
  },

  async deleteSession(sessionToken) {
    await pool.query('DELETE FROM sessions WHERE session_token = $1', [sessionToken])
  },

  // Verification token operations
  async createVerificationToken(token) {
    const result = await pool.query(
      'INSERT INTO verification_tokens (identifier, token, expires) VALUES ($1, $2, $3) RETURNING *',
      [token.identifier, token.token, token.expires]
    )
    return result.rows[0]
  },

  async useVerificationToken({ identifier, token }) {
    const result = await pool.query(
      'DELETE FROM verification_tokens WHERE identifier = $1 AND token = $2 RETURNING *',
      [identifier, token]
    )
    return result.rows[0] || null
  }
}

export { pool }