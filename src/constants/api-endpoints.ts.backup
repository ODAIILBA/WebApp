/**
 * API Endpoint Constants
 * Centralized API route definitions for consistency and maintainability
 */

/**
 * Base API path
 */
export const API_BASE = '/api';
export const ADMIN_BASE = '/api/admin';

/**
 * Public API Endpoints
 */
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${API_BASE}/auth/login`,
    REGISTER: `${API_BASE}/auth/register`,
    LOGOUT: `${API_BASE}/auth/logout`,
    REFRESH: `${API_BASE}/auth/refresh`,
    VERIFY_EMAIL: `${API_BASE}/auth/verify-email`,
    FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
  },

  // Account Management
  ACCOUNT: {
    PROFILE: `${API_BASE}/account/profile`,
    PASSWORD: `${API_BASE}/account/password`,
    ORDERS: `${API_BASE}/account/orders`,
    ORDER_DETAIL: (id: string) => `${API_BASE}/account/orders/${id}`,
    LICENSES: `${API_BASE}/account/licenses`,
    LICENSE_DETAIL: (id: string) => `${API_BASE}/account/licenses/${id}`,
  },

  // Products
  PRODUCTS: {
    LIST: `${API_BASE}/products`,
    DETAIL: (id: string) => `${API_BASE}/products/${id}`,
    SEARCH: `${API_BASE}/products/search`,
    FEATURED: `${API_BASE}/products/featured`,
    NEW: `${API_BASE}/products/new`,
    BESTSELLERS: `${API_BASE}/products/bestsellers`,
  },

  // Categories
  CATEGORIES: {
    LIST: `${API_BASE}/categories`,
    DETAIL: (id: string) => `${API_BASE}/categories/${id}`,
    PRODUCTS: (id: string) => `${API_BASE}/categories/${id}/products`,
  },

  // Brands
  BRANDS: {
    LIST: `${API_BASE}/brands`,
    DETAIL: (id: string) => `${API_BASE}/brands/${id}`,
    PRODUCTS: (id: string) => `${API_BASE}/brands/${id}/products`,
  },

  // Cart
  CART: {
    GET: `${API_BASE}/cart`,
    ADD: `${API_BASE}/cart/add`,
    UPDATE: `${API_BASE}/cart/update`,
    REMOVE: `${API_BASE}/cart/remove`,
    CLEAR: `${API_BASE}/cart/clear`,
    ITEMS: `${API_BASE}/cart/items`,
  },

  // Checkout
  CHECKOUT: {
    INIT: `${API_BASE}/checkout`,
    VALIDATE: `${API_BASE}/checkout/validate`,
    APPLY_COUPON: `${API_BASE}/checkout/coupon`,
    PAYMENT: `${API_BASE}/checkout/payment`,
    CONFIRM: `${API_BASE}/checkout/confirm`,
  },

  // Orders
  ORDERS: {
    CREATE: `${API_BASE}/orders`,
    DETAIL: (id: string) => `${API_BASE}/orders/${id}`,
    TRACK: (id: string) => `${API_BASE}/orders/${id}/track`,
  },

  // Contact
  CONTACT: {
    SUBMIT: `${API_BASE}/contact`,
    TICKET: `${API_BASE}/contact/ticket`,
  },

  // Search
  SEARCH: {
    PRODUCTS: `${API_BASE}/search/products`,
    AUTOCOMPLETE: `${API_BASE}/search/autocomplete`,
  },
} as const;

/**
 * Admin API Endpoints
 */
export const ADMIN_ENDPOINTS = {
  // Dashboard
  DASHBOARD: {
    STATS: `${ADMIN_BASE}/dashboard/stats`,
    RECENT_ORDERS: `${ADMIN_BASE}/dashboard/orders`,
    RECENT_CUSTOMERS: `${ADMIN_BASE}/dashboard/customers`,
    ACTIVITY_LOG: `${ADMIN_BASE}/dashboard/activity`,
  },

  // Products Management
  PRODUCTS: {
    LIST: `${ADMIN_BASE}/products`,
    CREATE: `${ADMIN_BASE}/products`,
    DETAIL: (id: string) => `${ADMIN_BASE}/products/${id}`,
    UPDATE: (id: string) => `${ADMIN_BASE}/products/${id}`,
    DELETE: (id: string) => `${ADMIN_BASE}/products/${id}`,
    BULK_DELETE: `${ADMIN_BASE}/products/bulk-delete`,
    BULK_UPDATE: `${ADMIN_BASE}/products/bulk-update`,
  },

  // Categories Management
  CATEGORIES: {
    LIST: `${ADMIN_BASE}/categories`,
    CREATE: `${ADMIN_BASE}/categories`,
    DETAIL: (id: string) => `${ADMIN_BASE}/categories/${id}`,
    UPDATE: (id: string) => `${ADMIN_BASE}/categories/${id}`,
    DELETE: (id: string) => `${ADMIN_BASE}/categories/${id}`,
    REORDER: `${ADMIN_BASE}/categories/reorder`,
  },

  // Brands Management
  BRANDS: {
    LIST: `${ADMIN_BASE}/brands`,
    CREATE: `${ADMIN_BASE}/brands`,
    DETAIL: (id: string) => `${ADMIN_BASE}/brands/${id}`,
    UPDATE: (id: string) => `${ADMIN_BASE}/brands/${id}`,
    DELETE: (id: string) => `${ADMIN_BASE}/brands/${id}`,
  },

  // Orders Management
  ORDERS: {
    LIST: `${ADMIN_BASE}/orders`,
    DETAIL: (id: string) => `${ADMIN_BASE}/orders/${id}`,
    UPDATE: (id: string) => `${ADMIN_BASE}/orders/${id}`,
    UPDATE_STATUS: (id: string) => `${ADMIN_BASE}/orders/${id}/status`,
    CANCEL: (id: string) => `${ADMIN_BASE}/orders/${id}/cancel`,
    BULK_UPDATE: `${ADMIN_BASE}/orders/bulk-update`,
  },

  // Customers Management
  CUSTOMERS: {
    LIST: `${ADMIN_BASE}/customers`,
    DETAIL: (id: string) => `${ADMIN_BASE}/customers/${id}`,
    UPDATE: (id: string) => `${ADMIN_BASE}/customers/${id}`,
    DELETE: (id: string) => `${ADMIN_BASE}/customers/${id}`,
    ORDERS: (id: string) => `${ADMIN_BASE}/customers/${id}/orders`,
  },

  // License Keys Management
  LICENSES: {
    LIST: `${ADMIN_BASE}/licenses`,
    CREATE: `${ADMIN_BASE}/licenses`,
    DETAIL: (id: string) => `${ADMIN_BASE}/licenses/${id}`,
    UPDATE: (id: string) => `${ADMIN_BASE}/licenses/${id}`,
    DELETE: (id: string) => `${ADMIN_BASE}/licenses/${id}`,
    REVOKE: (id: string) => `${ADMIN_BASE}/licenses/${id}/revoke`,
  },

  // Coupons Management
  COUPONS: {
    LIST: `${ADMIN_BASE}/coupons`,
    CREATE: `${ADMIN_BASE}/coupons`,
    DETAIL: (id: string) => `${ADMIN_BASE}/coupons/${id}`,
    UPDATE: (id: string) => `${ADMIN_BASE}/coupons/${id}`,
    DELETE: (id: string) => `${ADMIN_BASE}/coupons/${id}`,
  },

  // Analytics
  ANALYTICS: {
    OVERVIEW: `${ADMIN_BASE}/analytics/overview`,
    VISITORS: `${ADMIN_BASE}/analytics/visitors`,
    PRODUCTS: `${ADMIN_BASE}/analytics/products`,
    DEVICES: `${ADMIN_BASE}/analytics/devices`,
    SALES: `${ADMIN_BASE}/analytics/sales`,
  },

  // Certificates
  CERTIFICATES: {
    LIST: `${ADMIN_BASE}/certificates`,
    STATS: `${ADMIN_BASE}/certificates/stats`,
    DETAIL: (id: string) => `${ADMIN_BASE}/certificates/${id}`,
    EMAIL: (id: string) => `${ADMIN_BASE}/certificates/${id}/email`,
    SETTINGS: `${ADMIN_BASE}/certificate-settings`,
  },

  // Contact Messages
  CONTACT: {
    LIST: `${ADMIN_BASE}/contact-messages`,
    DETAIL: (id: string) => `${ADMIN_BASE}/contact-messages/${id}`,
    REPLY: (id: string) => `${ADMIN_BASE}/contact-messages/${id}/reply`,
    DELETE: (id: string) => `${ADMIN_BASE}/contact-messages/${id}`,
  },

  // System
  SYSTEM: {
    BACKUP: `${ADMIN_BASE}/backup`,
    RESTORE: `${ADMIN_BASE}/restore`,
    CACHE_CLEAR: `${ADMIN_BASE}/cache/clear`,
    ACTIVITY_LOG: `${ADMIN_BASE}/activity-log`,
    SETTINGS: `${ADMIN_BASE}/settings`,
  },
} as const;

/**
 * Helper function to build query string
 */
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Helper function to build full URL with query params
 */
export function buildUrl(endpoint: string, params?: Record<string, any>): string {
  if (!params) return endpoint;
  return `${endpoint}${buildQueryString(params)}`;
}
