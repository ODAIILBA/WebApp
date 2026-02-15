/**
 * Authentication Service
 * Complete user authentication, registration, and session management
 */

import { D1Database } from '@cloudflare/workers-types'
import { AuditLogService } from './audit-log-service'

export interface User {
  id: number
  email: string
  password_hash: string
  first_name: string
  last_name: string
  role: string
  is_verified: boolean
  two_factor_enabled: boolean
  created_at: string
}

export interface RegisterData {
  email: string
  password: string
  first_name: string
  last_name: string
}

export interface LoginData {
  email: string
  password: string
}

export interface Session {
  id: string
  user_id: number
  token: string
  expires_at: string
  ip_address: string
  user_agent: string
}

export class AuthService {
  private db: D1Database
  private auditLog: AuditLogService

  constructor(db: D1Database, auditLog: AuditLogService) {
    this.db = db
    this.auditLog = auditLog
  }

  /**
   * Register a new user
   */
  async register(data: RegisterData, ipAddress: string): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      // Validate input
      const validation = this.validateRegistration(data)
      if (!validation.valid) {
        return { success: false, error: validation.errors.join(', ') }
      }

      // Check if email already exists
      const existing = await this.db.prepare(`
        SELECT id FROM users WHERE email = ?
      `).bind(data.email.toLowerCase()).first()

      if (existing) {
        return { success: false, error: 'Email already registered' }
      }

      // Hash password
      const passwordHash = await this.hashPassword(data.password)

      // Create user
      const result = await this.db.prepare(`
        INSERT INTO users (
          email, password_hash, first_name, last_name, 
          role, is_verified, two_factor_enabled, created_at
        ) VALUES (?, ?, ?, ?, 'customer', 0, 0, CURRENT_TIMESTAMP)
      `).bind(
        data.email.toLowerCase(),
        passwordHash,
        data.first_name,
        data.last_name
      ).run()

      const userId = result.meta.last_row_id

      // Generate verification token
      const verificationToken = await this.generateToken()
      await this.db.prepare(`
        INSERT INTO email_verifications (user_id, token, expires_at)
        VALUES (?, ?, datetime('now', '+24 hours'))
      `).bind(userId, verificationToken).run()

      // Audit log
      await this.auditLog.log({
        userId: userId.toString(),
        action: 'user_register',
        module: 'auth',
        details: { email: data.email, first_name: data.first_name, last_name: data.last_name },
        ipAddress
      })

      return {
        success: true,
        user: {
          id: userId,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          verification_token: verificationToken
        }
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      return { success: false, error: error.message || 'Registration failed' }
    }
  }

  /**
   * Login user
   */
  async login(data: LoginData, ipAddress: string, userAgent: string): Promise<{ 
    success: boolean
    user?: any
    session?: Session
    error?: string
  }> {
    try {
      // Get user
      const user = await this.db.prepare(`
        SELECT id, email, password_hash, first_name, last_name, role, 
               email_verified as is_verified, 
               is_active
        FROM users 
        WHERE email = ?
      `).bind(data.email.toLowerCase()).first() as any

      if (!user) {
        return { success: false, error: 'Invalid email or password' }
      }

      // Check if account is active
      if (!user.is_active) {
        return { success: false, error: 'Account is deactivated' }
      }

      // Verify password
      const passwordValid = await this.verifyPassword(data.password, user.password_hash)
      if (!passwordValid) {
        return { success: false, error: 'Invalid email or password' }
      }

      // Check if email is verified
      if (!user.is_verified) {
        return { success: false, error: 'Please verify your email address before logging in' }
      }

      // Create session
      const sessionToken = await this.generateToken()
      const sessionId = await this.createSession(user.id, sessionToken, ipAddress, userAgent)

      // Audit log
      await this.auditLog.log({
        userId: user.id.toString(),
        action: 'user_login',
        module: 'auth',
        details: { email: user.email, role: user.role },
        ipAddress,
        userAgent
      })

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          two_factor_enabled: user.two_factor_enabled
        },
        session: {
          id: sessionId,
          user_id: user.id,
          token: sessionToken,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          ip_address: ipAddress,
          user_agent: userAgent
        }
      }
    } catch (error: any) {
      console.error('Login error:', error)
      return { success: false, error: error.message || 'Login failed' }
    }
  }

  /**
   * Logout user
   */
  async logout(sessionToken: string, userId: string, ipAddress: string): Promise<boolean> {
    try {
      await this.db.prepare(`
        DELETE FROM sessions WHERE token = ?
      `).bind(sessionToken).run()

      await this.auditLog.log({
        userId,
        action: 'user_logout',
        module: 'auth',
        details: {},
        ipAddress
      })

      return true
    } catch (error) {
      console.error('Logout error:', error)
      return false
    }
  }

  /**
   * Verify session token
   */
  async verifySession(token: string): Promise<{ valid: boolean; user?: any; session?: any }> {
    try {
      const session = await this.db.prepare(`
        SELECT s.*, 
               u.id as user_id, u.email, u.first_name, u.last_name, u.role,
               u.email_verified as is_verified
        FROM sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.token = ? AND s.expires_at > datetime('now')
      `).bind(token).first() as any

      if (!session) {
        return { valid: false }
      }

      return {
        valid: true,
        user: {
          id: session.user_id,
          email: session.email,
          first_name: session.first_name,
          last_name: session.last_name,
          role: session.role,
          is_verified: session.is_verified
        },
        session: {
          id: session.id,
          token: session.token,
          expires_at: session.expires_at
        }
      }
    } catch (error) {
      console.error('Session verification error:', error)
      return { valid: false }
    }
  }

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<{ success: boolean; error?: string }> {
    try {
      const verification = await this.db.prepare(`
        SELECT user_id, expires_at
        FROM email_verifications
        WHERE token = ? AND used_at IS NULL
      `).bind(token).first() as any

      if (!verification) {
        return { success: false, error: 'Invalid or expired verification token' }
      }

      if (new Date(verification.expires_at) < new Date()) {
        return { success: false, error: 'Verification token has expired' }
      }

      // Mark user as verified
      await this.db.prepare(`
        UPDATE users SET is_verified = 1 WHERE id = ?
      `).bind(verification.user_id).run()

      // Mark token as used
      await this.db.prepare(`
        UPDATE email_verifications 
        SET used_at = CURRENT_TIMESTAMP 
        WHERE token = ?
      `).bind(token).run()

      // Audit log
      await this.auditLog.log({
        userId: verification.user_id.toString(),
        action: 'email_verified',
        module: 'auth',
        details: {},
        ipAddress: 'system'
      })

      return { success: true }
    } catch (error: any) {
      console.error('Email verification error:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string, ipAddress: string): Promise<{ success: boolean; token?: string; error?: string }> {
    try {
      const user = await this.db.prepare(`
        SELECT id FROM users WHERE email = ?
      `).bind(email.toLowerCase()).first() as any

      if (!user) {
        // Don't reveal if email exists
        return { success: true }
      }

      // Generate reset token
      const resetToken = await this.generateToken()
      
      await this.db.prepare(`
        INSERT INTO password_resets (user_id, token, expires_at)
        VALUES (?, ?, datetime('now', '+1 hour'))
      `).bind(user.id, resetToken).run()

      // Audit log
      await this.auditLog.log({
        userId: user.id.toString(),
        action: 'password_reset_requested',
        module: 'auth',
        details: { email },
        ipAddress
      })

      return { success: true, token: resetToken }
    } catch (error: any) {
      console.error('Password reset request error:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string, ipAddress: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Validate password
      if (!this.isStrongPassword(newPassword)) {
        return { 
          success: false, 
          error: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character' 
        }
      }

      const reset = await this.db.prepare(`
        SELECT user_id, expires_at
        FROM password_resets
        WHERE token = ? AND used_at IS NULL
      `).bind(token).first() as any

      if (!reset) {
        return { success: false, error: 'Invalid or expired reset token' }
      }

      if (new Date(reset.expires_at) < new Date()) {
        return { success: false, error: 'Reset token has expired' }
      }

      // Hash new password
      const passwordHash = await this.hashPassword(newPassword)

      // Update password
      await this.db.prepare(`
        UPDATE users SET password_hash = ? WHERE id = ?
      `).bind(passwordHash, reset.user_id).run()

      // Mark token as used
      await this.db.prepare(`
        UPDATE password_resets 
        SET used_at = CURRENT_TIMESTAMP 
        WHERE token = ?
      `).bind(token).run()

      // Invalidate all sessions
      await this.db.prepare(`
        DELETE FROM sessions WHERE user_id = ?
      `).bind(reset.user_id).run()

      // Audit log
      await this.auditLog.log({
        userId: reset.user_id.toString(),
        action: 'password_reset',
        module: 'auth',
        details: {},
        ipAddress
      })

      return { success: true }
    } catch (error: any) {
      console.error('Password reset error:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Change password (authenticated user)
   */
  async changePassword(
    userId: number, 
    currentPassword: string, 
    newPassword: string,
    ipAddress: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Validate new password
      if (!this.isStrongPassword(newPassword)) {
        return { 
          success: false, 
          error: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character' 
        }
      }

      // Get current password hash
      const user = await this.db.prepare(`
        SELECT password_hash FROM users WHERE id = ?
      `).bind(userId).first() as any

      if (!user) {
        return { success: false, error: 'User not found' }
      }

      // Verify current password
      const passwordValid = await this.verifyPassword(currentPassword, user.password_hash)
      if (!passwordValid) {
        return { success: false, error: 'Current password is incorrect' }
      }

      // Hash new password
      const passwordHash = await this.hashPassword(newPassword)

      // Update password
      await this.db.prepare(`
        UPDATE users SET password_hash = ? WHERE id = ?
      `).bind(passwordHash, userId).run()

      // Audit log
      await this.auditLog.log({
        userId: userId.toString(),
        action: 'password_changed',
        module: 'auth',
        details: {},
        ipAddress
      })

      return { success: true }
    } catch (error: any) {
      console.error('Password change error:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Hash password using Web Crypto API
   */
  private async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hash = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  /**
   * Verify password against hash
   */
  private async verifyPassword(password: string, hash: string): Promise<boolean> {
    const passwordHash = await this.hashPassword(password)
    return passwordHash === hash
  }

  /**
   * Generate secure random token
   */
  private async generateToken(): Promise<string> {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return Array.from(array)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  /**
   * Create session
   */
  private async createSession(
    userId: number,
    token: string,
    ipAddress: string,
    userAgent: string
  ): Promise<string> {
    const result = await this.db.prepare(`
      INSERT INTO sessions (
        user_id, token, ip_address, user_agent, 
        expires_at, created_at
      ) VALUES (?, ?, ?, ?, datetime('now', '+7 days'), CURRENT_TIMESTAMP)
    `).bind(userId, token, ipAddress, userAgent).run()

    return result.meta.last_row_id?.toString() || '0'
  }

  /**
   * Increment failed login attempts
   */
  private async incrementFailedAttempts(userId: number) {
    await this.db.prepare(`
      UPDATE users 
      SET 
        login_attempts = login_attempts + 1,
        locked_until = CASE 
          WHEN login_attempts >= 4 THEN datetime('now', '+30 minutes')
          ELSE NULL
        END
      WHERE id = ?
    `).bind(userId).run()
  }

  /**
   * Reset failed login attempts
   */
  private async resetFailedAttempts(userId: number) {
    await this.db.prepare(`
      UPDATE users 
      SET login_attempts = 0, locked_until = NULL
      WHERE id = ?
    `).bind(userId).run()
  }

  /**
   * Log failed login attempt
   */
  private async logFailedLogin(email: string, ipAddress: string, reason: string) {
    await this.auditLog.log({
      userId: 'anonymous',
      action: 'login_failed',
      module: 'auth',
      details: { email, reason },
      ipAddress,
      severity: 'security'
    })
  }

  /**
   * Validate registration data
   */
  private validateRegistration(data: RegisterData): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    // Email validation
    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push('Valid email is required')
    }

    // Password validation
    if (!data.password || !this.isStrongPassword(data.password)) {
      errors.push('Password must be at least 8 characters with uppercase, lowercase, number, and special character')
    }

    // Name validation
    if (!data.first_name || data.first_name.length < 2) {
      errors.push('First name must be at least 2 characters')
    }

    if (!data.last_name || data.last_name.length < 2) {
      errors.push('Last name must be at least 2 characters')
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Check password strength
   */
  private isStrongPassword(password: string): boolean {
    if (password.length < 8) return false
    
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecial
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: number): Promise<any> {
    try {
      const user = await this.db.prepare(`
        SELECT id, email, first_name, last_name, role, 
               email_verified as is_verified,
               0 as two_factor_enabled,
               created_at,
               NULL as last_login
        FROM users 
        WHERE id = ?
      `).bind(userId).first()

      return user
    } catch (error) {
      console.error('Get user error:', error)
      return null
    }
  }

  /**
   * Clean expired sessions
   */
  async cleanExpiredSessions(): Promise<number> {
    try {
      const result = await this.db.prepare(`
        DELETE FROM sessions WHERE expires_at < datetime('now')
      `).run()

      return result.meta.changes || 0
    } catch (error) {
      console.error('Clean sessions error:', error)
      return 0
    }
  }
}
