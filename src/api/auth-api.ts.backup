/**
 * Authentication API Routes
 * User registration, login, password reset, email verification
 */

import { Hono } from 'hono'
import { AuthService } from '../services/auth-service'
import { AuditLogService } from '../services/audit-log-service'
import { setCookie, deleteCookie } from 'hono/cookie'

type Bindings = {
  DB: D1Database
}

const authAPI = new Hono<{ Bindings: Bindings }>()

// ============================================
// PUBLIC AUTHENTICATION ENDPOINTS
// ============================================

/**
 * POST /api/auth/register
 * Register a new user
 */
authAPI.post('/register', async (c) => {
  try {
    const { env } = c
    const { email, password, first_name, last_name } = await c.req.json()

    const auditLog = new AuditLogService(env.DB)
    const authService = new AuthService(env.DB, auditLog)

    const ipAddress = c.req.header('cf-connecting-ip') || 'unknown'
    
    const result = await authService.register(
      { email, password, first_name, last_name },
      ipAddress
    )

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400)
    }

    return c.json({
      success: true,
      message: 'Registration successful. Please check your email to verify your account.',
      user: result.user
    })
  } catch (error: any) {
    console.error('Register endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * POST /api/auth/login
 * Login user
 */
authAPI.post('/login', async (c) => {
  try {
    const { env } = c
    const { email, password } = await c.req.json()

    const auditLog = new AuditLogService(env.DB)
    const authService = new AuthService(env.DB, auditLog)

    const ipAddress = c.req.header('cf-connecting-ip') || 'unknown'
    const userAgent = c.req.header('user-agent') || 'unknown'
    
    const result = await authService.login(
      { email, password },
      ipAddress,
      userAgent
    )

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 401)
    }

    // Set session cookie
    setCookie(c, 'session_token', result.session!.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    })

    return c.json({
      success: true,
      message: 'Login successful',
      user: result.user,
      session: {
        expires_at: result.session!.expires_at
      }
    })
  } catch (error: any) {
    console.error('Login endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * POST /api/auth/logout
 * Logout user
 */
authAPI.post('/logout', async (c) => {
  try {
    const { env } = c
    const sessionToken = c.req.header('Authorization')?.replace('Bearer ', '') || 
                         (await c.req.parseBody())['session_token'] as string

    if (!sessionToken) {
      return c.json({ success: false, error: 'No session token provided' }, 400)
    }

    const auditLog = new AuditLogService(env.DB)
    const authService = new AuthService(env.DB, auditLog)

    const ipAddress = c.req.header('cf-connecting-ip') || 'unknown'
    
    // Verify session to get user ID
    const session = await authService.verifySession(sessionToken)
    if (session.valid) {
      await authService.logout(sessionToken, session.user!.id.toString(), ipAddress)
    }

    // Clear cookie
    deleteCookie(c, 'session_token', { path: '/' })

    return c.json({ success: true, message: 'Logout successful' })
  } catch (error: any) {
    console.error('Logout endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * POST /api/auth/verify-email
 * Verify email with token
 */
authAPI.post('/verify-email', async (c) => {
  try {
    const { env } = c
    const { token } = await c.req.json()

    const auditLog = new AuditLogService(env.DB)
    const authService = new AuthService(env.DB, auditLog)
    
    const result = await authService.verifyEmail(token)

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400)
    }

    return c.json({
      success: true,
      message: 'Email verified successfully. You can now login.'
    })
  } catch (error: any) {
    console.error('Verify email endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * POST /api/auth/forgot-password
 * Request password reset
 */
authAPI.post('/forgot-password', async (c) => {
  try {
    const { env } = c
    const { email } = await c.req.json()

    const auditLog = new AuditLogService(env.DB)
    const authService = new AuthService(env.DB, auditLog)

    const ipAddress = c.req.header('cf-connecting-ip') || 'unknown'
    
    const result = await authService.requestPasswordReset(email, ipAddress)

    // Always return success to avoid email enumeration
    return c.json({
      success: true,
      message: 'If the email exists, a password reset link has been sent.',
      token: result.token // Remove in production, only for demo
    })
  } catch (error: any) {
    console.error('Forgot password endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * POST /api/auth/reset-password
 * Reset password with token
 */
authAPI.post('/reset-password', async (c) => {
  try {
    const { env } = c
    const { token, password } = await c.req.json()

    const auditLog = new AuditLogService(env.DB)
    const authService = new AuthService(env.DB, auditLog)

    const ipAddress = c.req.header('cf-connecting-ip') || 'unknown'
    
    const result = await authService.resetPassword(token, password, ipAddress)

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400)
    }

    return c.json({
      success: true,
      message: 'Password reset successfully. You can now login with your new password.'
    })
  } catch (error: any) {
    console.error('Reset password endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * GET /api/auth/me
 * Get current user info
 */
authAPI.get('/me', async (c) => {
  try {
    const { env } = c
    const sessionToken = c.req.header('Authorization')?.replace('Bearer ', '') ||
                         c.req.cookie('session_token')

    if (!sessionToken) {
      return c.json({ success: false, error: 'Not authenticated' }, 401)
    }

    const auditLog = new AuditLogService(env.DB)
    const authService = new AuthService(env.DB, auditLog)
    
    const session = await authService.verifySession(sessionToken)

    if (!session.valid) {
      return c.json({ success: false, error: 'Invalid or expired session' }, 401)
    }

    return c.json({
      success: true,
      user: session.user,
      session: {
        expires_at: session.session!.expires_at
      }
    })
  } catch (error: any) {
    console.error('Get me endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * POST /api/auth/change-password
 * Change password (authenticated)
 */
authAPI.post('/change-password', async (c) => {
  try {
    const { env } = c
    const sessionToken = c.req.header('Authorization')?.replace('Bearer ', '') ||
                         c.req.cookie('session_token')

    if (!sessionToken) {
      return c.json({ success: false, error: 'Not authenticated' }, 401)
    }

    const auditLog = new AuditLogService(env.DB)
    const authService = new AuthService(env.DB, auditLog)
    
    const session = await authService.verifySession(sessionToken)

    if (!session.valid) {
      return c.json({ success: false, error: 'Invalid or expired session' }, 401)
    }

    const { current_password, new_password } = await c.req.json()
    const ipAddress = c.req.header('cf-connecting-ip') || 'unknown'
    
    const result = await authService.changePassword(
      session.user!.id,
      current_password,
      new_password,
      ipAddress
    )

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400)
    }

    return c.json({
      success: true,
      message: 'Password changed successfully'
    })
  } catch (error: any) {
    console.error('Change password endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * GET /api/auth/sessions
 * Get active sessions (authenticated)
 */
authAPI.get('/sessions', async (c) => {
  try {
    const { env } = c
    const sessionToken = c.req.header('Authorization')?.replace('Bearer ', '') ||
                         c.req.cookie('session_token')

    if (!sessionToken) {
      return c.json({ success: false, error: 'Not authenticated' }, 401)
    }

    const auditLog = new AuditLogService(env.DB)
    const authService = new AuthService(env.DB, auditLog)
    
    const session = await authService.verifySession(sessionToken)

    if (!session.valid) {
      return c.json({ success: false, error: 'Invalid or expired session' }, 401)
    }

    // Get all active sessions for this user
    const sessions = await env.DB.prepare(`
      SELECT id, ip_address, user_agent, created_at, expires_at,
             CASE WHEN token = ? THEN 1 ELSE 0 END as is_current
      FROM sessions
      WHERE user_id = ? AND expires_at > datetime('now')
      ORDER BY created_at DESC
    `).bind(sessionToken, session.user!.id).all()

    return c.json({
      success: true,
      sessions: sessions.results
    })
  } catch (error: any) {
    console.error('Get sessions endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * DELETE /api/auth/sessions/:id
 * Revoke a session (authenticated)
 */
authAPI.delete('/sessions/:id', async (c) => {
  try {
    const { env } = c
    const sessionToken = c.req.header('Authorization')?.replace('Bearer ', '') ||
                         c.req.cookie('session_token')

    if (!sessionToken) {
      return c.json({ success: false, error: 'Not authenticated' }, 401)
    }

    const auditLog = new AuditLogService(env.DB)
    const authService = new AuthService(env.DB, auditLog)
    
    const session = await authService.verifySession(sessionToken)

    if (!session.valid) {
      return c.json({ success: false, error: 'Invalid or expired session' }, 401)
    }

    const sessionId = c.req.param('id')

    // Delete session (only if it belongs to the user)
    await env.DB.prepare(`
      DELETE FROM sessions 
      WHERE id = ? AND user_id = ?
    `).bind(sessionId, session.user!.id).run()

    return c.json({
      success: true,
      message: 'Session revoked successfully'
    })
  } catch (error: any) {
    console.error('Delete session endpoint error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

export default authAPI
