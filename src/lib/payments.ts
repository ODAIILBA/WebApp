// Payment Integration Module
// Supports Stripe and PayPal payment processing

export interface PaymentConfig {
  stripe?: {
    publishableKey: string
    secretKey: string // Server-side only
  }
  paypal?: {
    clientId: string
    clientSecret: string // Server-side only
    mode: 'sandbox' | 'live'
  }
}

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  orderId: string
  customerId?: string
  paymentMethod: 'stripe' | 'paypal' | 'bank_transfer'
  metadata?: Record<string, any>
}

// Stripe Payment Processing
export class StripePaymentProcessor {
  private publishableKey: string

  constructor(publishableKey: string) {
    this.publishableKey = publishableKey
  }

  // Initialize Stripe on client-side
  async initializeClient(): Promise<void> {
    if (typeof window === 'undefined') return

    // Load Stripe.js dynamically
    if (!(window as any).Stripe) {
      const script = document.createElement('script')
      script.src = 'https://js.stripe.com/v3/'
      script.async = true
      document.head.appendChild(script)
      
      await new Promise((resolve) => {
        script.onload = resolve
      })
    }
  }

  // Create payment intent on server
  static async createPaymentIntent(
    amount: number,
    currency: string,
    orderId: string,
    metadata?: Record<string, any>
  ): Promise<{ clientSecret: string; intentId: string }> {
    const response = await fetch('/api/payments/stripe/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents
        currency: currency.toLowerCase(),
        order_id: orderId,
        metadata
      })
    })

    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to create payment intent')
    }

    return {
      clientSecret: result.data.client_secret,
      intentId: result.data.id
    }
  }

  // Process payment on client-side
  async processPayment(
    clientSecret: string,
    cardElement: any
  ): Promise<{ success: boolean; error?: string }> {
    const stripe = (window as any).Stripe(this.publishableKey)
    
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement
      }
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  }
}

// PayPal Payment Processing
export class PayPalPaymentProcessor {
  private clientId: string
  private mode: 'sandbox' | 'live'

  constructor(clientId: string, mode: 'sandbox' | 'live' = 'sandbox') {
    this.clientId = clientId
    this.mode = mode
  }

  // Initialize PayPal on client-side
  async initializeClient(): Promise<void> {
    if (typeof window === 'undefined') return

    // Load PayPal SDK dynamically
    if (!(window as any).paypal) {
      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${this.clientId}&currency=EUR`
      script.async = true
      document.head.appendChild(script)
      
      await new Promise((resolve) => {
        script.onload = resolve
      })
    }
  }

  // Create order on server
  static async createOrder(
    amount: number,
    currency: string,
    orderId: string
  ): Promise<{ orderId: string }> {
    const response = await fetch('/api/payments/paypal/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        currency,
        order_id: orderId
      })
    })

    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to create PayPal order')
    }

    return { orderId: result.data.id }
  }

  // Capture payment on server
  static async capturePayment(paypalOrderId: string): Promise<{ success: boolean }> {
    const response = await fetch('/api/payments/paypal/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paypal_order_id: paypalOrderId })
    })

    const result = await response.json()
    return { success: result.success }
  }
}

// Unified Payment Interface
export class PaymentManager {
  private stripeProcessor?: StripePaymentProcessor
  private paypalProcessor?: PayPalPaymentProcessor

  constructor(config: PaymentConfig) {
    if (config.stripe) {
      this.stripeProcessor = new StripePaymentProcessor(config.stripe.publishableKey)
    }
    if (config.paypal) {
      this.paypalProcessor = new PayPalPaymentProcessor(
        config.paypal.clientId,
        config.paypal.mode
      )
    }
  }

  async initializePaymentMethod(method: 'stripe' | 'paypal'): Promise<void> {
    if (method === 'stripe' && this.stripeProcessor) {
      await this.stripeProcessor.initializeClient()
    } else if (method === 'paypal' && this.paypalProcessor) {
      await this.paypalProcessor.initializeClient()
    }
  }

  getStripeProcessor(): StripePaymentProcessor | undefined {
    return this.stripeProcessor
  }

  getPayPalProcessor(): PayPalPaymentProcessor | undefined {
    return this.paypalProcessor
  }
}

// Server-side payment verification
export async function verifyPayment(
  paymentMethod: 'stripe' | 'paypal' | 'bank_transfer',
  paymentId: string,
  orderId: string
): Promise<{ verified: boolean; error?: string }> {
  try {
    const response = await fetch('/api/payments/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payment_method: paymentMethod,
        payment_id: paymentId,
        order_id: orderId
      })
    })

    const result = await response.json()
    return { verified: result.success, error: result.error }
  } catch (error) {
    return { verified: false, error: String(error) }
  }
}
