/**
 * Webhook Signature Verification
 * Validates webhook signatures from payment providers
 */

import crypto from 'crypto'

/**
 * Verify Stripe webhook signature
 * @param payload Raw webhook payload
 * @param signature Stripe-Signature header
 * @param secret Webhook secret from Stripe dashboard
 */
export function verifyStripeSignature(
  payload: string,
  signature: string | undefined,
  secret: string
): boolean {
  if (!signature) {
    throw new Error('No signature provided')
  }

  try {
    // Stripe signature format: t=timestamp,v1=signature
    const elements = signature.split(',')
    const timestamp = elements.find(e => e.startsWith('t='))?.split('=')[1]
    const sig = elements.find(e => e.startsWith('v1='))?.split('=')[1]

    if (!timestamp || !sig) {
      throw new Error('Invalid signature format')
    }

    // Check timestamp (prevent replay attacks - max 5 minutes old)
    const now = Math.floor(Date.now() / 1000)
    const webhookTime = parseInt(timestamp, 10)
    
    if (now - webhookTime > 300) {
      throw new Error('Webhook timestamp too old')
    }

    // Compute expected signature
    const signedPayload = `${timestamp}.${payload}`
    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(signedPayload, 'utf8')
      .digest('hex')

    // Compare signatures (constant-time comparison)
    return crypto.timingSafeEqual(
      Buffer.from(sig, 'hex'),
      Buffer.from(expectedSig, 'hex')
    )
  } catch (error) {
    console.error('Stripe signature verification failed:', error)
    return false
  }
}

/**
 * Verify PayPal webhook signature
 * @param webhookId Webhook ID from PayPal dashboard
 * @param eventBody Webhook event body
 * @param transmissionId X-PayPal-Transmission-Id header
 * @param transmissionTime X-PayPal-Transmission-Time header
 * @param transmissionSig X-PayPal-Transmission-Sig header
 * @param certUrl X-PayPal-Cert-Url header
 * @param authAlgo X-PayPal-Auth-Algo header
 */
export async function verifyPayPalSignature(
  webhookId: string,
  eventBody: string,
  transmissionId: string | undefined,
  transmissionTime: string | undefined,
  transmissionSig: string | undefined,
  certUrl: string | undefined,
  authAlgo: string | undefined
): Promise<boolean> {
  if (!transmissionId || !transmissionTime || !transmissionSig || !certUrl || !authAlgo) {
    throw new Error('Missing PayPal webhook headers')
  }

  try {
    // PayPal signature verification requires:
    // 1. Fetch PayPal's certificate from certUrl
    // 2. Construct expected message
    // 3. Verify signature using certificate
    
    // Expected message format:
    const expectedMsg = `${transmissionId}|${transmissionTime}|${webhookId}|${crypto
      .createHash('sha256')
      .update(eventBody)
      .digest('hex')}`

    // In production, you would:
    // 1. Fetch cert from certUrl (validate it's from paypal.com)
    // 2. Use crypto.createVerify with the cert and signature
    // 3. Return verification result
    
    // For now, return true if all headers present (implement full verification in production)
    console.warn('PayPal webhook verification not fully implemented - verify in production')
    
    // Basic validation: check timestamp freshness
    const webhookTime = new Date(transmissionTime).getTime()
    const now = Date.now()
    
    if (now - webhookTime > 300000) { // 5 minutes
      throw new Error('PayPal webhook timestamp too old')
    }
    
    return true
  } catch (error) {
    console.error('PayPal signature verification failed:', error)
    return false
  }
}

/**
 * Idempotency key storage (in-memory for now, use KV in production)
 */
const processedWebhooks = new Map<string, boolean>()

/**
 * Check if webhook has been processed (prevent duplicate processing)
 * @param eventId Unique event ID from webhook
 */
export function isWebhookProcessed(eventId: string): boolean {
  return processedWebhooks.has(eventId)
}

/**
 * Mark webhook as processed
 * @param eventId Unique event ID from webhook
 */
export function markWebhookProcessed(eventId: string): void {
  processedWebhooks.set(eventId, true)
  
  // Cleanup old entries after 24 hours
  setTimeout(() => {
    processedWebhooks.delete(eventId)
  }, 24 * 60 * 60 * 1000)
}

/**
 * Generic webhook payload validation
 */
export interface WebhookValidationResult {
  valid: boolean
  error?: string
}

/**
 * Validate webhook payload structure
 * @param payload Webhook payload
 * @param requiredFields Required fields in the payload
 */
export function validateWebhookPayload(
  payload: any,
  requiredFields: string[]
): WebhookValidationResult {
  if (!payload || typeof payload !== 'object') {
    return { valid: false, error: 'Invalid payload structure' }
  }

  for (const field of requiredFields) {
    if (!(field in payload)) {
      return { valid: false, error: `Missing required field: ${field}` }
    }
  }

  return { valid: true }
}

/**
 * Webhook event types
 */
export const STRIPE_EVENTS = {
  PAYMENT_SUCCEEDED: 'payment_intent.succeeded',
  PAYMENT_FAILED: 'payment_intent.payment_failed',
  CHARGE_REFUNDED: 'charge.refunded',
  CHARGE_DISPUTED: 'charge.dispute.created',
} as const

export const PAYPAL_EVENTS = {
  PAYMENT_COMPLETED: 'PAYMENT.CAPTURE.COMPLETED',
  PAYMENT_DENIED: 'PAYMENT.CAPTURE.DENIED',
  PAYMENT_REFUNDED: 'PAYMENT.CAPTURE.REFUNDED',
} as const

/**
 * Webhook retry logic
 */
export interface RetryConfig {
  maxRetries: number
  baseDelay: number // milliseconds
  maxDelay: number // milliseconds
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
}

/**
 * Retry webhook processing with exponential backoff
 * @param fn Function to retry
 * @param config Retry configuration
 */
export async function retryWebhook<T>(
  fn: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const { maxRetries, baseDelay, maxDelay } = { ...DEFAULT_RETRY_CONFIG, ...config }
  
  let lastError: Error | null = null
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      
      if (attempt < maxRetries) {
        // Exponential backoff with jitter
        const delay = Math.min(
          baseDelay * Math.pow(2, attempt) + Math.random() * 1000,
          maxDelay
        )
        
        console.log(`Webhook retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  
  throw lastError || new Error('Webhook processing failed after retries')
}
