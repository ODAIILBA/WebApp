/**
 * Security Headers Middleware
 * Adds comprehensive security headers to all responses
 */

import { Context, Next } from 'hono';

/**
 * Security headers middleware
 * Implements OWASP recommended security headers
 */
export async function securityHeaders(c: Context, next: Next) {
  await next();

  // Set security headers on response
  const headers = c.res.headers;

  // Content Security Policy - Restrict resource loading
  // Note: Adjust based on your CDN and external resources
  headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdn.tailwindcss.com",
      "img-src 'self' data: https:",
      "font-src 'self' data: https://cdn.jsdelivr.net",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  );

  // Prevent clickjacking attacks
  headers.set('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  headers.set('X-Content-Type-Options', 'nosniff');

  // Enable XSS protection (legacy browsers)
  headers.set('X-XSS-Protection', '1; mode=block');

  // Force HTTPS (31536000 = 1 year)
  // Note: Only enable if you have HTTPS configured
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Control referrer information
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Control browser features and APIs
  headers.set(
    'Permissions-Policy',
    [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'magnetometer=()',
      'gyroscope=()',
      'accelerometer=()'
    ].join(', ')
  );

  // Remove potentially sensitive headers
  headers.delete('X-Powered-By');
  headers.delete('Server');

  return c.res;
}

/**
 * CORS configuration with security in mind
 */
export const secureCORS = {
  origin: (origin: string) => {
    // Allow same-origin and specific domains
    const allowedOrigins = [
      'http://localhost:3000',
      'https://webapp.pages.dev',
      // Add your production domains here
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      return origin;
    }

    return allowedOrigins[0]; // Default to first allowed origin
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Request-Id'],
  maxAge: 600, // 10 minutes
  credentials: true,
};

/**
 * Rate limiting configuration
 */
export const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
};
