import { Hono } from 'hono'
import { CloudflareBindings } from '../types'
import { hashPassword, verifyPassword, generateToken } from '../utils/helpers'

export const authApi = new Hono<{ Bindings: CloudflareBindings }>()

// ===========================
// REGISTER
// ===========================
authApi.post('/register', async (c) => {
  try {
    const { name, email, password } = await c.req.json()
    const { DB } = c.env

    // Validate input
    if (!name || !email || !password) {
      return c.json({ success: false, error: 'Alle Felder sind erforderlich' }, 400)
    }

    if (password.length < 8) {
      return c.json({ success: false, error: 'Passwort muss mindestens 8 Zeichen lang sein' }, 400)
    }

    // Check if user already exists
    const existingUser = await DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email.toLowerCase()).first()

    if (existingUser) {
      return c.json({ success: false, error: 'Diese E-Mail-Adresse wird bereits verwendet' }, 409)
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const result = await DB.prepare(
      `INSERT INTO users (name, email, password, role, status) 
       VALUES (?, ?, ?, 'customer', 'active')`
    ).bind(name, email.toLowerCase(), hashedPassword).run()

    return c.json({
      success: true,
      message: 'Konto erfolgreich erstellt',
      userId: result.meta.last_row_id
    })
  } catch (error: any) {
    console.error('Registration error:', error)
    return c.json({ success: false, error: error.message || 'Registrierung fehlgeschlagen' }, 500)
  }
})

// ===========================
// LOGIN
// ===========================
authApi.post('/login', async (c) => {
  try {
    const { email, password, remember } = await c.req.json()
    const { DB } = c.env

    // Validate input
    if (!email || !password) {
      return c.json({ success: false, error: 'E-Mail und Passwort sind erforderlich' }, 400)
    }

    // Find user
    const user = await DB.prepare(
      'SELECT id, name, email, password, role, status FROM users WHERE email = ?'
    ).bind(email.toLowerCase()).first() as any

    if (!user) {
      return c.json({ success: false, error: 'E-Mail oder Passwort falsch' }, 401)
    }

    // Check if account is active
    if (user.status !== 'active') {
      return c.json({ success: false, error: 'Ihr Konto wurde deaktiviert' }, 403)
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return c.json({ success: false, error: 'E-Mail oder Passwort falsch' }, 401)
    }

    // Generate session token
    const token = generateToken()
    const expiresAt = remember 
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      : new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Create session
    await DB.prepare(
      `INSERT INTO sessions (user_id, token, expires_at) 
       VALUES (?, ?, ?)`
    ).bind(user.id, token, expiresAt.toISOString()).run()

    // Remove password from response
    delete user.password

    return c.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error: any) {
    console.error('Login error:', error)
    return c.json({ success: false, error: error.message || 'Login fehlgeschlagen' }, 500)
  }
})

// ===========================
// LOGOUT
// ===========================
authApi.post('/logout', async (c) => {
  try {
    const token = c.req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return c.json({ success: false, error: 'Nicht autorisiert' }, 401)
    }

    const { DB } = c.env

    // Delete session
    await DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run()

    return c.json({ success: true, message: 'Erfolgreich abgemeldet' })
  } catch (error: any) {
    console.error('Logout error:', error)
    return c.json({ success: false, error: error.message || 'Logout fehlgeschlagen' }, 500)
  }
})

// ===========================
// GET CURRENT USER
// ===========================
authApi.get('/me', async (c) => {
  try {
    const token = c.req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return c.json({ success: false, error: 'Nicht autorisiert' }, 401)
    }

    const { DB } = c.env

    // Find session
    const session = await DB.prepare(
      `SELECT s.user_id, s.expires_at, u.id, u.name, u.email, u.role, u.status
       FROM sessions s
       JOIN users u ON s.user_id = u.id
       WHERE s.token = ? AND s.expires_at > datetime('now')`
    ).bind(token).first() as any

    if (!session) {
      return c.json({ success: false, error: 'Session abgelaufen' }, 401)
    }

    return c.json({
      success: true,
      user: {
        id: session.id,
        name: session.name,
        email: session.email,
        role: session.role
      }
    })
  } catch (error: any) {
    console.error('Get user error:', error)
    return c.json({ success: false, error: error.message || 'Fehler beim Abrufen des Benutzers' }, 500)
  }
})

// ===========================
// CHANGE PASSWORD
// ===========================
authApi.post('/change-password', async (c) => {
  try {
    const token = c.req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return c.json({ success: false, error: 'Nicht autorisiert' }, 401)
    }

    const { currentPassword, newPassword } = await c.req.json()
    const { DB } = c.env

    // Validate input
    if (!currentPassword || !newPassword) {
      return c.json({ success: false, error: 'Alle Felder sind erforderlich' }, 400)
    }

    if (newPassword.length < 8) {
      return c.json({ success: false, error: 'Passwort muss mindestens 8 Zeichen lang sein' }, 400)
    }

    // Find session and user
    const session = await DB.prepare(
      `SELECT s.user_id, u.password
       FROM sessions s
       JOIN users u ON s.user_id = u.id
       WHERE s.token = ? AND s.expires_at > datetime('now')`
    ).bind(token).first() as any

    if (!session) {
      return c.json({ success: false, error: 'Session abgelaufen' }, 401)
    }

    // Verify current password
    const isValidPassword = await verifyPassword(currentPassword, session.password)
    if (!isValidPassword) {
      return c.json({ success: false, error: 'Aktuelles Passwort ist falsch' }, 401)
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword)

    // Update password
    await DB.prepare(
      'UPDATE users SET password = ?, updated_at = datetime(\'now\') WHERE id = ?'
    ).bind(hashedPassword, session.user_id).run()

    return c.json({ success: true, message: 'Passwort erfolgreich geändert' })
  } catch (error: any) {
    console.error('Change password error:', error)
    return c.json({ success: false, error: error.message || 'Passwortänderung fehlgeschlagen' }, 500)
  }
})

export default authApi
