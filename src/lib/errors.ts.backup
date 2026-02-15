/**
 * Centralized Error Handling
 * Production-ready error handling with logging and user-friendly messages
 */

import { Context } from 'hono'
import { SecurityLogger } from './audit'

/**
 * Error types
 */
export enum ErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  PAYMENT_ERROR = 'PAYMENT_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_API_ERROR = 'EXTERNAL_API_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

/**
 * Application Error class
 */
export class AppError extends Error {
  constructor(
    public type: ErrorType,
    public message: string,
    public statusCode: number = 500,
    public details?: any,
    public isOperational: boolean = true
  ) {
    super(message)
    this.name = 'AppError'
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Error response interface
 */
export interface ErrorResponse {
  success: false
  error: {
    type: string
    message: string
    details?: any
    requestId?: string
  }
}

/**
 * Create user-friendly error message
 */
function getUserFriendlyMessage(error: AppError): string {
  const messages: Record<ErrorType, string> = {
    [ErrorType.VALIDATION_ERROR]: 'The data you provided is invalid. Please check and try again.',
    [ErrorType.AUTHENTICATION_ERROR]: 'Authentication failed. Please log in again.',
    [ErrorType.AUTHORIZATION_ERROR]: 'You do not have permission to perform this action.',
    [ErrorType.NOT_FOUND]: 'The requested resource was not found.',
    [ErrorType.RATE_LIMIT_ERROR]: 'Too many requests. Please try again later.',
    [ErrorType.PAYMENT_ERROR]: 'Payment processing failed. Please try again or use a different payment method.',
    [ErrorType.DATABASE_ERROR]: 'A database error occurred. Our team has been notified.',
    [ErrorType.EXTERNAL_API_ERROR]: 'An external service is temporarily unavailable. Please try again later.',
    [ErrorType.INTERNAL_ERROR]: 'An unexpected error occurred. Our team has been notified.',
  }
  
  return messages[error.type] || messages[ErrorType.INTERNAL_ERROR]
}

/**
 * Should expose error details to client?
 */
function shouldExposeDetails(error: AppError, isDevelopment: boolean): boolean {
  // In development, expose all details
  if (isDevelopment) {
    return true
  }
  
  // In production, only expose details for operational errors
  const safeErrorTypes = [
    ErrorType.VALIDATION_ERROR,
    ErrorType.AUTHENTICATION_ERROR,
    ErrorType.AUTHORIZATION_ERROR,
    ErrorType.NOT_FOUND,
    ErrorType.RATE_LIMIT_ERROR,
  ]
  
  return safeErrorTypes.includes(error.type)
}

/**
 * Error handler middleware
 */
export function errorHandler(isDevelopment: boolean = false) {
  return async (error: Error, c: Context) => {
    // Generate request ID for tracking
    const requestId = crypto.randomUUID()
    
    // Determine if this is an AppError
    const isAppError = error instanceof AppError
    const appError = isAppError 
      ? error 
      : new AppError(
          ErrorType.INTERNAL_ERROR,
          'An unexpected error occurred',
          500,
          undefined,
          false
        )
    
    // Log error
    console.error('Error occurred:', {
      requestId,
      type: appError.type,
      message: appError.message,
      statusCode: appError.statusCode,
      isOperational: appError.isOperational,
      stack: isDevelopment ? appError.stack : undefined,
      url: c.req.url,
      method: c.req.method,
    })
    
    // Log security events for certain error types
    if (
      appError.type === ErrorType.AUTHENTICATION_ERROR ||
      appError.type === ErrorType.AUTHORIZATION_ERROR ||
      !appError.isOperational
    ) {
      try {
        const securityLogger = new SecurityLogger(c.env.DB)
        await securityLogger.logSecurityEvent(
          appError.type.toLowerCase(),
          appError.isOperational ? 'medium' : 'high',
          {
            requestId,
            message: appError.message,
            url: c.req.url,
            method: c.req.method,
            ip: c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for'),
          }
        )
      } catch (logError) {
        console.error('Failed to log security event:', logError)
      }
    }
    
    // Build response
    const response: ErrorResponse = {
      success: false,
      error: {
        type: appError.type,
        message: getUserFriendlyMessage(appError),
        requestId,
      }
    }
    
    // Add details if safe to expose
    if (shouldExposeDetails(appError, isDevelopment)) {
      response.error.details = appError.details
      
      // In development, include original message and stack
      if (isDevelopment) {
        response.error.details = {
          ...appError.details,
          originalMessage: appError.message,
          stack: appError.stack,
        }
      }
    }
    
    return c.json(response, appError.statusCode)
  }
}

/**
 * Async route handler wrapper
 * Catches errors and passes to error handler
 */
export function asyncHandler(
  fn: (c: Context) => Promise<Response>
): (c: Context) => Promise<Response> {
  return async (c: Context) => {
    try {
      return await fn(c)
    } catch (error) {
      // Use error handler
      const isDevelopment = c.env.ENVIRONMENT === 'development'
      return errorHandler(isDevelopment)(error as Error, c)
    }
  }
}

/**
 * Common validation error helper
 */
export function validationError(message: string, details?: any): AppError {
  return new AppError(ErrorType.VALIDATION_ERROR, message, 400, details)
}

/**
 * Common authentication error helper
 */
export function authenticationError(message: string = 'Authentication required'): AppError {
  return new AppError(ErrorType.AUTHENTICATION_ERROR, message, 401)
}

/**
 * Common authorization error helper
 */
export function authorizationError(message: string = 'Insufficient permissions'): AppError {
  return new AppError(ErrorType.AUTHORIZATION_ERROR, message, 403)
}

/**
 * Common not found error helper
 */
export function notFoundError(resource: string = 'Resource'): AppError {
  return new AppError(ErrorType.NOT_FOUND, `${resource} not found`, 404)
}

/**
 * Common rate limit error helper
 */
export function rateLimitError(retryAfter?: number): AppError {
  return new AppError(
    ErrorType.RATE_LIMIT_ERROR,
    'Too many requests',
    429,
    { retryAfter }
  )
}

/**
 * Common payment error helper
 */
export function paymentError(message: string, details?: any): AppError {
  return new AppError(ErrorType.PAYMENT_ERROR, message, 402, details)
}

/**
 * Common database error helper
 */
export function databaseError(message: string, details?: any): AppError {
  return new AppError(ErrorType.DATABASE_ERROR, message, 500, details, false)
}

/**
 * Common external API error helper
 */
export function externalApiError(service: string, details?: any): AppError {
  return new AppError(
    ErrorType.EXTERNAL_API_ERROR,
    `${service} service error`,
    502,
    details,
    false
  )
}

/**
 * Retry with exponential backoff
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      
      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  
  throw lastError || new Error('Operation failed after retries')
}

/**
 * Safe JSON parse - Use safeJsonParse from utils/helpers.ts instead
 * This import is for backward compatibility
 */
export { safeJsonParse } from '../utils/helpers'

/**
 * Sanitize error for logging (remove sensitive data)
 */
export function sanitizeError(error: any): any {
  if (!error) return null
  
  const sanitized: any = {
    message: error.message,
    type: error.type || error.name,
    code: error.code,
  }
  
  // Remove sensitive fields
  const sensitiveFields = ['password', 'token', 'secret', 'apiKey', 'creditCard']
  
  if (error.details) {
    sanitized.details = { ...error.details }
    
    for (const field of sensitiveFields) {
      if (field in sanitized.details) {
        sanitized.details[field] = '[REDACTED]'
      }
    }
  }
  
  return sanitized
}
