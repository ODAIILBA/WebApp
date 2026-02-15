/**
 * Secure Authentication Service
 * Uses Web Crypto API for password hashing with salt
 * Implements JWT token generation and validation
 */

import type { D1Database } from '@cloudflare/workers-types'

export interface User {
  id: number
  email: string
  password_hash: string
  first_name: string
  last_name: string
  is_active: number
  is_admin: number
  email_verified: number
  created_at: string
}

export interface AuthToken {
  token: string
  expiresAt: number
  user: {
    id: number
    email: string
    first_name: string
    last_name: string
    is_admin: number
  }
}

export interface JWTPayload {
  userId: number
  email: string
  isAdmin: number
  iat: number
  exp: number
}

/**
 * Generate a secure salt for password hashing
 */
function generateSalt(): string {
  const randomBytes = new Uint8Array(16)
  crypto.getRandomValues(randomBytes)
  return Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Hash password with PBKDF2 (more secure than SHA-256)
 * Uses 100,000 iterations for strong security
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = generateSalt()
  const encoder = new TextEncoder()
  
  // Import password as key
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  )
  
  // Derive key with PBKDF2
  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  )
  
  // Convert to hex
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  // Return salt:hash format
  return `${salt}:${hashHex}`
}

/**
 * Verify password against hash
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [salt, hash] = storedHash.split(':')
  
  if (!salt || !hash) {
    return false
  }
  
  const encoder = new TextEncoder()
  
  // Import password as key
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  )
  
  // Derive key with same parameters
  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  )
  
  // Convert to hex
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  // Constant-time comparison
  return hashHex === hash
}

/**
 * Generate JWT token
 */
export async function generateJWT(
  payload: { userId: number; email: string; isAdmin: number },
  secret: string,
  expiresIn: number = 24 * 60 * 60 // 24 hours in seconds
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  
  const jwtPayload: JWTPayload = {
    userId: payload.userId,
    email: payload.email,
    isAdmin: payload.isAdmin,
    iat: now,
    exp: now + expiresIn
  }
  
  // Create header and payload
  const header = { alg: 'HS256', typ: 'JWT' }
  const encoder = new TextEncoder()
  
  // Base64url encode
  const base64urlEncode = (data: string) => {
    return btoa(data)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  }
  
  const headerEncoded = base64urlEncode(JSON.stringify(header))
  const payloadEncoded = base64urlEncode(JSON.stringify(jwtPayload))
  
  // Create signature
  const message = `${headerEncoded}.${payloadEncoded}`
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(message)
  )
  
  const signatureArray = Array.from(new Uint8Array(signature))
  const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('')
  const signatureEncoded = base64urlEncode(
    signatureArray.map(b => String.fromCharCode(b)).join('')
  )
  
  return `${message}.${signatureEncoded}`
}

/**
 * Verify and decode JWT token
 */
export async function verifyJWT(token: string, secret: string): Promise<JWTPayload | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }
    
    const [headerEncoded, payloadEncoded, signatureEncoded] = parts
    
    // Verify signature
    const message = `${headerEncoded}.${payloadEncoded}`
    const encoder = new TextEncoder()
    
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    
    // Decode signature
    const base64urlDecode = (str: string) => {
      str = str.replace(/-/g, '+').replace(/_/g, '/')
      while (str.length % 4) {
        str += '='
      }
      return atob(str)
    }
    
    const signatureDecoded = base64urlDecode(signatureEncoded)
    const signatureArray = new Uint8Array(
      signatureDecoded.split('').map(c => c.charCodeAt(0))
    )
    
    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(message)
    )
    
    const expectedSignature = new Uint8Array(signature)
    
    // Constant-time comparison
    let valid = signatureArray.length === expectedSignature.length
    for (let i = 0; i < signatureArray.length; i++) {
      valid = valid && signatureArray[i] === expectedSignature[i]
    }
    
    if (!valid) {
      return null
    }
    
    // Decode payload
    const payloadStr = base64urlDecode(payloadEncoded)
    const payload: JWTPayload = JSON.parse(payloadStr)
    
    // Check expiration
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp < now) {
      return null
    }
    
    return payload
  } catch (error) {
    console.error('JWT verification error:', error)
    return null
  }
}

/**
 * Generate secure random token for email verification, password reset, etc.
 */
export function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const randomValues = new Uint8Array(length)
  crypto.getRandomValues(randomValues)
  
  return Array.from(randomValues)
    .map(v => chars[v % chars.length])
    .join('')
}

/**
 * Authentication Service Class
 */
export class AuthService {
  constructor(private db: D1Database, private jwtSecret: string) {}
  
  /**
   * Register new user
   */
  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<{ success: boolean; userId?: number; error?: string }> {
    try {
      // Check if user exists
      const existing = await this.db
        .prepare('SELECT id FROM users WHERE email = ?')
        .bind(email.toLowerCase())
        .first()
      
      if (existing) {
        return { success: false, error: 'Email already registered' }
      }
      
      // Hash password
      const passwordHash = await hashPassword(password)
      
      // Generate email verification token
      const verificationToken = generateSecureToken(32)
      
      // Insert user
      const result = await this.db
        .prepare(`
          INSERT INTO users (
            email, password_hash, first_name, last_name,
            email_verification_token, is_active, email_verified
          ) VALUES (?, ?, ?, ?, ?, 1, 0)
        `)
        .bind(
          email.toLowerCase(),
          passwordHash,
          firstName,
          lastName,
          verificationToken
        )
        .run()
      
      return {
        success: true,
        userId: result.meta.last_row_id as number
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'Registration failed' }
    }
  }
  
  /**
   * Login user
   */
  async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; token?: AuthToken; error?: string }> {
    try {
      // Get user
      const user = await this.db
        .prepare(`
          SELECT id, email, password_hash, first_name, last_name, 
                 is_active, is_admin, email_verified
          FROM users 
          WHERE email = ?
        `)
        .bind(email.toLowerCase())
        .first<User>()
      
      if (!user) {
        return { success: false, error: 'Invalid email or password' }
      }
      
      // Check if active
      if (!user.is_active) {
        return { success: false, error: 'Account is deactivated' }
      }
      
      // Verify password
      const valid = await verifyPassword(password, user.password_hash)
      if (!valid) {
        return { success: false, error: 'Invalid email or password' }
      }
      
      // Generate JWT
      const token = await generateJWT(
        {
          userId: user.id,
          email: user.email,
          isAdmin: user.is_admin
        },
        this.jwtSecret
      )
      
      // Update last login
      await this.db
        .prepare('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?')
        .bind(user.id)
        .run()
      
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      
      return {
        success: true,
        token: {
          token,
          expiresAt,
          user: {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            is_admin: user.is_admin
          }
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed' }
    }
  }
  
  /**
   * Verify JWT token and get user
   */
  async verifyToken(token: string): Promise<JWTPayload | null> {
    return await verifyJWT(token, this.jwtSecret)
  }
  
  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<{ success: boolean; token?: string }> {
    try {
      const user = await this.db
        .prepare('SELECT id FROM users WHERE email = ? AND is_active = 1')
        .bind(email.toLowerCase())
        .first()
      
      if (!user) {
        // Return success even if user not found (security best practice)
        return { success: true }
      }
      
      const resetToken = generateSecureToken(32)
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
      
      await this.db
        .prepare(`
          UPDATE users 
          SET password_reset_token = ?, 
              password_reset_expires = ?
          WHERE id = ?
        `)
        .bind(resetToken, expiresAt.toISOString(), user.id)
        .run()
      
      return { success: true, token: resetToken }
    } catch (error) {
      console.error('Password reset request error:', error)
      return { success: false }
    }
  }
  
  /**
   * Reset password with token
   */
  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const user = await this.db
        .prepare(`
          SELECT id 
          FROM users 
          WHERE password_reset_token = ? 
            AND password_reset_expires > datetime('now')
            AND is_active = 1
        `)
        .bind(token)
        .first()
      
      if (!user) {
        return { success: false, error: 'Invalid or expired reset token' }
      }
      
      const passwordHash = await hashPassword(newPassword)
      
      await this.db
        .prepare(`
          UPDATE users 
          SET password_hash = ?, 
              password_reset_token = NULL,
              password_reset_expires = NULL
          WHERE id = ?
        `)
        .bind(passwordHash, user.id)
        .run()
      
      return { success: true }
    } catch (error) {
      console.error('Password reset error:', error)
      return { success: false, error: 'Password reset failed' }
    }
  }
  
  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<{ success: boolean }> {
    try {
      const result = await this.db
        .prepare(`
          UPDATE users 
          SET email_verified = 1,
              email_verification_token = NULL
          WHERE email_verification_token = ?
        `)
        .bind(token)
        .run()
      
      return { success: result.meta.changes > 0 }
    } catch (error) {
      console.error('Email verification error:', error)
      return { success: false }
    }
  }
}
