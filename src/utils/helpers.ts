// Utility functions for the eCommerce platform

import type { Language } from '../types';

/**
 * Generate a unique order number
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

/**
 * Generate a secure random token
 */
export function generateToken(userOrLength?: any): string {
  // If called with a user object, generate JWT
  if (userOrLength && typeof userOrLength === 'object') {
    const user = userOrLength;
    const header = { alg: 'HS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      is_admin: user.is_admin || (user.role === 'admin' ? 1 : 0),
      iat: now,
      exp: now + (24 * 60 * 60) // 24 hours
    };
    
    // Simple JWT (base64 encoding, not cryptographically signed for now)
    // In production, use proper JWT library with signing
    const headerB64 = btoa(JSON.stringify(header));
    const payloadB64 = btoa(JSON.stringify(payload));
    const signature = btoa('secret'); // Placeholder - use proper signing in production
    
    return `${headerB64}.${payloadB64}.${signature}`;
  }
  
  // Otherwise generate random token
  const length = typeof userOrLength === 'number' ? userOrLength : 32;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  
  for (let i = 0; i < length; i++) {
    token += chars[randomValues[i] % chars.length];
  }
  
  return token;
}

/**
 * Hash password using Web Crypto API (SHA-256)
 * Note: In production, use bcrypt or similar via external API
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify password hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

/**
 * Format price with currency symbol
 */
export function formatPrice(price: number, currency: string = 'EUR', language: Language = 'en'): string {
  const locale = language === 'de' ? 'de-DE' : 'en-US';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(price);
}

/**
 * Calculate discount percentage
 */
export function calculateDiscountPercentage(originalPrice: number, discountedPrice: number): number {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}

/**
 * Calculate VAT amount
 */
export function calculateVAT(amount: number, vatRate: number): number {
  return Number((amount * (vatRate / 100)).toFixed(2));
}

/**
 * Calculate price with VAT
 */
export function calculatePriceWithVAT(amount: number, vatRate: number): number {
  return Number((amount * (1 + vatRate / 100)).toFixed(2));
}

/**
 * Format date based on language
 */
export function formatDate(date: string | Date, language: Language = 'en'): string {
  const locale = language === 'de' ? 'de-DE' : 'en-US';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
}

/**
 * Slugify text for URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate EU VAT number format
 */
export function isValidVATNumber(vat: string): boolean {
  // Simplified VAT validation (real validation requires API)
  const vatRegex = /^[A-Z]{2}[0-9A-Z]{2,13}$/;
  return vatRegex.test(vat.replace(/[\s.-]/g, ''));
}

/**
 * Parse JSON safely
 */
export function safeJsonParse<T>(json: string | null, defaultValue: T): T {
  if (!json) return defaultValue;
  
  try {
    return JSON.parse(json) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Get session expiration date (7 days from now)
 */
export function getSessionExpiration(): string {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString();
}

/**
 * Check if user is admin
 */
export function isAdmin(role: string): boolean {
  return role === 'admin';
}

/**
 * Generate schema.org Product JSON-LD
 */
export function generateProductSchema(product: any, language: Language = 'en'): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description || product.name,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand_name || 'Software Store'
    },
    offers: {
      '@type': 'Offer',
      url: `https://yourstore.com/${language}/products/${product.slug}`,
      priceCurrency: 'EUR',
      price: product.discount_price || product.base_price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.stock_type === 'unlimited' ? 'https://schema.org/InStock' : 'https://schema.org/LimitedAvailability',
      seller: {
        '@type': 'Organization',
        name: 'Premium Software Store'
      }
    },
    aggregateRating: product.review_count > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.review_count
    } : undefined
  };

  return JSON.stringify(schema);
}

/**
 * Generate schema.org FAQPage JSON-LD
 */
export function generateFAQSchema(faqs: any[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return JSON.stringify(schema);
}

/**
 * Sanitize HTML (basic - for production use DOMPurify)
 */
export function sanitizeHTML(html: string): string {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Get country VAT rate (simplified)
 */
export function getCountryVATRate(countryCode: string): number {
  const vatRates: Record<string, number> = {
    'DE': 19.0,
    'FR': 20.0,
    'ES': 21.0,
    'IT': 22.0,
    'NL': 21.0,
    'BE': 21.0,
    'AT': 20.0,
    'PL': 23.0,
    'SE': 25.0,
    'DK': 25.0,
    'FI': 24.0,
    'IE': 23.0,
    'PT': 23.0,
    'CZ': 21.0,
    'RO': 19.0,
    'GR': 24.0,
    'HU': 27.0,
    'BG': 20.0,
    'HR': 25.0,
    'SK': 20.0,
    'SI': 22.0,
    'LT': 21.0,
    'LV': 21.0,
    'EE': 20.0,
    'CY': 19.0,
    'LU': 17.0,
    'MT': 18.0
  };

  return vatRates[countryCode] || 0;
}

/**
 * Parse CSV for license key import
 */
export function parseCSV(csvContent: string): string[][] {
  const lines = csvContent.split('\n').filter(line => line.trim());
  return lines.map(line => {
    // Simple CSV parser (for production, use proper CSV library)
    return line.split(',').map(cell => cell.trim().replace(/^["']|["']$/g, ''));
  });
}

/**
 * Generate CSV for license key export
 */
export function generateCSV(data: any[], headers: string[]): string {
  const rows = [headers.join(',')];
  
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header] || '';
      // Escape values containing commas or quotes
      if (value.toString().includes(',') || value.toString().includes('"')) {
        return `"${value.toString().replace(/"/g, '""')}"`;
      }
      return value;
    });
    rows.push(values.join(','));
  });

  return rows.join('\n');
}

/**
 * Get translation key based on current language
 */
export function t(translations: Record<Language, string>, language: Language = 'en'): string {
  return translations[language] || translations['en'] || '';
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Check if license key is expired
 */
export function isLicenseExpired(expiresAt: string | null): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt) < new Date();
}

/**
 * Get download expiration date (7 days from now)
 */
export function getDownloadExpiration(): string {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString();
}
