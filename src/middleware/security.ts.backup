// Security Middleware Module (Cloudflare Workers Compatible)
// Implements CSRF, Rate Limiting, and Security Headers

import type { Context, Next } from 'hono'

// ============================================
// CSRF PROTECTION (Web Crypto API)
// ============================================

interface CSRFConfig {
  secret: string
  cookieName?: string
  headerName?: string
}

export class CSRFProtection {
  private secret: string
  private cookieName: string
  private headerName: string

  constructor(config: CSRFConfig) {
    this.secret = config.secret
    this.cookieName = config.cookieName || 'csrf_token'
    this.headerName = config.headerName || 'X-CSRF-Token'
  }

  // Generate random token (Web Crypto API)
  private generateRandomToken(): string {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }

  // Generate CSRF token with timestamp and signature
  async generateToken(): Promise<string> {
    const token = this.generateRandomToken()
    const timestamp = Date.now().toString()
    
    // Create HMAC signature using Web Crypto API
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(this.secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    
    const signature_bytes = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(`${token}:${timestamp}`)
    )
    
    const signature = Array.from(new Uint8Array(signature_bytes))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    
    return `${token}:${timestamp}:${signature}`
  }

  async validateToken(token: string): Promise<boolean> {
    if (!token) return false

    const parts = token.split(':')
    if (parts.length !== 3) return false

    const [tokenPart, timestamp, providedSig] = parts
    
    // Check if token is too old (1 hour max)
    const tokenAge = Date.now() - parseInt(timestamp)
    if (tokenAge > 3600000) return false

    // Verify signature
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(this.secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    
    const signature_bytes = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(`${tokenPart}:${timestamp}`)
    )
    
    const expectedSig = Array.from(new Uint8Array(signature_bytes))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    return providedSig === expectedSig
  }

  middleware() {
    return async (c: Context, next: Next) => {
      // GET requests: generate and set token
      if (c.req.method === 'GET') {
        const token = await this.generateToken()
        c.set('csrfToken', token)
        await next()
        return
      }

      // POST/PUT/DELETE/PATCH: validate token
      if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(c.req.method)) {
        const token = c.req.header(this.headerName) || 
                     c.req.header('X-CSRF-TOKEN') ||
                     c.req.header('x-csrf-token')
        
        if (!token || !(await this.validateToken(token))) {
          return c.json({ 
            success: false, 
            error: 'Invalid or missing CSRF token' 
          }, 403)
        }
      }

      await next()
    }
  }
}

// Create CSRF instance (lazy initialization to avoid global scope issues)
let csrfInstance: CSRFProtection | null = null

export const csrf = {
  middleware: () => {
    return async (c: Context, next: Next) => {
      if (!csrfInstance) {
        csrfInstance = new CSRFProtection({
          secret: c.env.CSRF_SECRET || 'default-csrf-secret-change-in-production'
        })
      }
      return csrfInstance.middleware()(c, next)
    }
  }
}

// ============================================
// RATE LIMITING
// ============================================

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  keyGenerator?: (c: Context) => string
}

export class RateLimiter {
  private config: RateLimitConfig
  private requests: Map<string, { count: number; resetTime: number }> | null = null

  constructor(config: RateLimitConfig) {
    this.config = config
  }

  private getRequests() {
    if (!this.requests) {
      this.requests = new Map()
    }
    return this.requests
  }

  private getKey(c: Context): string {
    if (this.config.keyGenerator) {
      return this.config.keyGenerator(c)
    }
    return c.req.header('cf-connecting-ip') || 
           c.req.header('x-forwarded-for') || 
           c.req.header('x-real-ip') || 
           'unknown'
  }

  middleware() {
    return async (c: Context, next: Next) => {
      const key = this.getKey(c)
      const now = Date.now()
      const requests = this.getRequests()
      const record = requests.get(key)

      if (!record || now > record.resetTime) {
        requests.set(key, {
          count: 1,
          resetTime: now + this.config.windowMs
        })
        await next()
        return
      }

      if (record.count >= this.config.maxRequests) {
        const retryAfter = Math.ceil((record.resetTime - now) / 1000)
        
        return c.json({
          success: false,
          error: 'Too many requests',
          retryAfter
        }, 429, {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': this.config.maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': record.resetTime.toString()
        })
      }

      record.count++
      await next()
    }
  }
}

// Rate limiter instances (lazy initialization)
export const loginRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 5
})

export const apiRateLimiter = new RateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 100
})

export const adminRateLimiter = new RateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 50
})

// ============================================
// SECURITY HEADERS
// ============================================

export function securityHeaders() {
  return async (c: Context, next: Next) => {
    await next()
    
    c.header('X-Content-Type-Options', 'nosniff')
    c.header('X-Frame-Options', 'DENY')
    c.header('X-XSS-Protection', '1; mode=block')
    c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
    c.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
    c.header(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://cdn.jsdelivr.net https://js.stripe.com; style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net; img-src 'self' data: https:; font-src 'self' https://cdn.jsdelivr.net; connect-src 'self' https://api.stripe.com; frame-src https://js.stripe.com https://hooks.stripe.com;"
    )
  }
}

// ============================================
// ENHANCED ADMIN AUTH
// ============================================

// Session-based admin auth (for cookies)
export const sessionAdminAuth = async (c: Context, next: Next) => {
  const sessionToken = c.req.cookie('session_token')
  
  if (!sessionToken) {
    // For HTML pages, redirect to login
    const accept = c.req.header('Accept') || ''
    if (accept.includes('text/html')) {
      return c.redirect('/login?redirect=' + encodeURIComponent(c.req.url))
    }
    return c.json({ error: 'Unauthorized - Please login' }, 401)
  }

  const session = await c.env.DB.prepare(`
    SELECT u.id, u.email, u.role, u.status, u.first_name, u.last_name, s.expires_at
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.token = ? AND s.expires_at > datetime('now')
  `).bind(sessionToken).first() as any

  if (!session) {
    const accept = c.req.header('Accept') || ''
    if (accept.includes('text/html')) {
      return c.redirect('/login?redirect=' + encodeURIComponent(c.req.url))
    }
    return c.json({ error: 'Session expired' }, 401)
  }

  if (session.role !== 'admin' || session.status !== 'active') {
    return c.json({ error: 'Admin access required' }, 403)
  }

  c.set('currentUser', session)
  await next()
}

// Bearer token admin auth (for API calls with Authorization header)
export const enhancedAdminAuth = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const token = authHeader.substring(7)
  
  const session = await c.env.DB.prepare(`
    SELECT u.id, u.email, u.role, u.status, s.expires_at
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.token = ? AND s.expires_at > datetime('now')
  `).bind(token).first() as any

  if (!session || session.role !== 'admin' || session.status !== 'active') {
    return c.json({ error: 'Admin access required' }, 403)
  }

  c.set('currentUser', session)
  await next()
}

// Combined admin auth (accepts both session cookies and Bearer tokens)
export const adminAuth = async (c: Context, next: Next) => {
  // Try Bearer token first
  const authHeader = c.req.header('Authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return enhancedAdminAuth(c, next)
  }
  
  // Fall back to session cookie
  return sessionAdminAuth(c, next)
}

// ============================================
// BRUTE FORCE PROTECTION
// ============================================

export const bruteForceProtection = new RateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 5,
  keyGenerator: (c) => {
    const email = c.req.query('email') || c.req.json().then(body => body.email).catch(() => '')
    const ip = c.req.header('cf-connecting-ip') || 'unknown'
    return `${ip}:${email}`
  }
})

// ============================================
// REQUEST SIZE LIMIT
// ============================================

export function requestSizeLimit(maxBytes: number) {
  return async (c: Context, next: Next) => {
    const contentLength = c.req.header('content-length')
    
    if (contentLength && parseInt(contentLength) > maxBytes) {
      return c.json({
        success: false,
        error: `Request body too large. Maximum size is ${maxBytes / 1024 / 1024}MB`
      }, 413)
    }

    await next()
  }
}
