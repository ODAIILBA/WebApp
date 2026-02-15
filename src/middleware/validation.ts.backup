// Input Validation Module
// Comprehensive validation schemas for all API inputs

export interface ValidationResult {
  success: boolean
  data?: any
  errors?: string[]
}

// ============================================
// UTILITY VALIDATORS
// ============================================

export const Validators = {
  email: (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  },

  phone: (value: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10
  },

  url: (value: string): boolean => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  },

  vatNumber: (value: string): boolean => {
    // EU VAT number format: 2 letters + 8-12 digits
    const vatRegex = /^[A-Z]{2}[0-9A-Z]{8,12}$/
    return vatRegex.test(value.toUpperCase())
  },

  uuid: (value: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    return uuidRegex.test(value)
  },

  slug: (value: string): boolean => {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    return slugRegex.test(value)
  },

  alphanumeric: (value: string): boolean => {
    return /^[a-zA-Z0-9]+$/.test(value)
  },

  decimal: (value: string | number, decimals: number = 2): boolean => {
    const regex = new RegExp(`^\\d+(\\.\\d{1,${decimals}})?$`)
    return regex.test(String(value))
  },

  dateTime: (value: string): boolean => {
    const date = new Date(value)
    return !isNaN(date.getTime())
  },

  licenseKey: (value: string): boolean => {
    // Format: XXXXX-XXXXX-XXXXX-XXXXX (5 groups of 5 alphanumeric)
    const licenseRegex = /^[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}$/
    return licenseRegex.test(value.toUpperCase())
  }
}

// ============================================
// SANITIZERS
// ============================================

export const Sanitizers = {
  html: (value: string): string => {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  },

  sql: (value: string): string => {
    // Remove SQL injection patterns
    return value
      .replace(/'/g, "''")
      .replace(/;/g, '')
      .replace(/--/g, '')
      .replace(/\/\*/g, '')
      .replace(/\*\//g, '')
  },

  trim: (value: string): string => {
    return value.trim()
  },

  lowercase: (value: string): string => {
    return value.toLowerCase()
  },

  uppercase: (value: string): string => {
    return value.toUpperCase()
  },

  stripTags: (value: string): string => {
    return value.replace(/<[^>]*>/g, '')
  },

  normalizeWhitespace: (value: string): string => {
    return value.replace(/\s+/g, ' ').trim()
  }
}

// ============================================
// VALIDATION SCHEMAS
// ============================================

export class ValidationSchema {
  private rules: Map<string, any>

  constructor() {
    this.rules = new Map()
  }

  field(name: string) {
    const field = new FieldValidator(name)
    this.rules.set(name, field)
    return field
  }

  validate(data: any): ValidationResult {
    const errors: string[] = []
    const sanitizedData: any = {}

    for (const [fieldName, validator] of this.rules.entries()) {
      const value = data[fieldName]
      const result = validator.validate(value)

      if (!result.valid) {
        errors.push(...result.errors)
      } else {
        sanitizedData[fieldName] = result.value
      }
    }

    if (errors.length > 0) {
      return { success: false, errors }
    }

    return { success: true, data: sanitizedData }
  }
}

class FieldValidator {
  private fieldName: string
  private _required: boolean = false
  private _type: string = 'string'
  private _min?: number
  private _max?: number
  private _pattern?: RegExp
  private _enum?: any[]
  private _custom?: (value: any) => boolean
  private _sanitize: ((value: any) => any)[] = []
  private _default?: any

  constructor(fieldName: string) {
    this.fieldName = fieldName
  }

  required() {
    this._required = true
    return this
  }

  optional() {
    this._required = false
    return this
  }

  type(type: 'string' | 'number' | 'boolean' | 'array' | 'object') {
    this._type = type
    return this
  }

  min(value: number) {
    this._min = value
    return this
  }

  max(value: number) {
    this._max = value
    return this
  }

  pattern(regex: RegExp) {
    this._pattern = regex
    return this
  }

  enum(values: any[]) {
    this._enum = values
    return this
  }

  email() {
    this._custom = Validators.email
    return this
  }

  url() {
    this._custom = Validators.url
    return this
  }

  vatNumber() {
    this._custom = Validators.vatNumber
    return this
  }

  licenseKey() {
    this._custom = Validators.licenseKey
    return this
  }

  slug() {
    this._custom = Validators.slug
    return this
  }

  custom(validator: (value: any) => boolean) {
    this._custom = validator
    return this
  }

  sanitize(fn: (value: any) => any) {
    this._sanitize.push(fn)
    return this
  }

  default(value: any) {
    this._default = value
    return this
  }

  validate(value: any): { valid: boolean; value?: any; errors: string[] } {
    const errors: string[] = []

    // Handle undefined/null
    if (value === undefined || value === null) {
      if (this._required) {
        errors.push(`${this.fieldName} is required`)
        return { valid: false, errors }
      }
      return { valid: true, value: this._default }
    }

    // Type validation
    if (this._type === 'number' && typeof value !== 'number') {
      const num = Number(value)
      if (isNaN(num)) {
        errors.push(`${this.fieldName} must be a number`)
        return { valid: false, errors }
      }
      value = num
    }

    if (this._type === 'boolean' && typeof value !== 'boolean') {
      value = value === 'true' || value === '1' || value === 1
    }

    if (this._type === 'array' && !Array.isArray(value)) {
      errors.push(`${this.fieldName} must be an array`)
      return { valid: false, errors }
    }

    if (this._type === 'object' && typeof value !== 'object') {
      errors.push(`${this.fieldName} must be an object`)
      return { valid: false, errors }
    }

    // String-specific validations
    if (this._type === 'string') {
      value = String(value)

      // Min/max length
      if (this._min !== undefined && value.length < this._min) {
        errors.push(`${this.fieldName} must be at least ${this._min} characters`)
      }
      if (this._max !== undefined && value.length > this._max) {
        errors.push(`${this.fieldName} must be at most ${this._max} characters`)
      }

      // Pattern
      if (this._pattern && !this._pattern.test(value)) {
        errors.push(`${this.fieldName} has invalid format`)
      }
    }

    // Number-specific validations
    if (this._type === 'number') {
      if (this._min !== undefined && value < this._min) {
        errors.push(`${this.fieldName} must be at least ${this._min}`)
      }
      if (this._max !== undefined && value > this._max) {
        errors.push(`${this.fieldName} must be at most ${this._max}`)
      }
    }

    // Enum validation
    if (this._enum && !this._enum.includes(value)) {
      errors.push(`${this.fieldName} must be one of: ${this._enum.join(', ')}`)
    }

    // Custom validation
    if (this._custom && !this._custom(value)) {
      errors.push(`${this.fieldName} has invalid format`)
    }

    // Apply sanitization
    for (const sanitizer of this._sanitize) {
      value = sanitizer(value)
    }

    if (errors.length > 0) {
      return { valid: false, errors }
    }

    return { valid: true, value }
  }
}

// ============================================
// PRE-BUILT SCHEMAS
// ============================================

export const AdminSchemas = {
  licenseImport: () => {
    const schema = new ValidationSchema()
    schema.field('product_id').required().type('number').min(1)
    schema.field('licenses').required().type('array')
    return schema
  },

  productCreate: () => {
    const schema = new ValidationSchema()
    schema.field('sku').required().type('string').min(3).max(50).sanitize(Sanitizers.uppercase)
    schema.field('category_id').required().type('number').min(1)
    schema.field('brand_id').optional().type('number').min(1)
    schema.field('slug').required().slug().sanitize(Sanitizers.lowercase)
    schema.field('base_price').required().type('number').min(0)
    schema.field('discount_price').optional().type('number').min(0)
    schema.field('vat_rate').optional().type('number').min(0).max(100).default(19)
    schema.field('stock_type').optional().enum(['unlimited', 'limited', 'out_of_stock']).default('unlimited')
    schema.field('license_type').optional().enum(['perpetual', 'subscription', 'trial'])
    schema.field('activation_limit').optional().type('number').min(1).default(1)
    return schema
  }
}

export const UserSchemas = {
  register: () => {
    const schema = new ValidationSchema()
    schema.field('email').required().email().sanitize(Sanitizers.lowercase)
    schema.field('password').required().type('string').min(8).max(100)
    schema.field('first_name').required().type('string').min(1).max(50).sanitize(Sanitizers.trim)
    schema.field('last_name').required().type('string').min(1).max(50).sanitize(Sanitizers.trim)
    schema.field('company').optional().type('string').max(100).sanitize(Sanitizers.trim)
    schema.field('vat_number').optional().vatNumber().sanitize(Sanitizers.uppercase)
    return schema
  },

  login: () => {
    const schema = new ValidationSchema()
    schema.field('email').required().email().sanitize(Sanitizers.lowercase)
    schema.field('password').required().type('string')
    return schema
  }
}

export const OrderSchemas = {
  create: () => {
    const schema = new ValidationSchema()
    schema.field('email').required().email().sanitize(Sanitizers.lowercase)
    schema.field('first_name').required().type('string').min(1).max(50).sanitize(Sanitizers.trim)
    schema.field('last_name').required().type('string').min(1).max(50).sanitize(Sanitizers.trim)
    schema.field('company').optional().type('string').max(100).sanitize(Sanitizers.trim)
    schema.field('vat_number').optional().vatNumber().sanitize(Sanitizers.uppercase)
    schema.field('country').required().type('string').pattern(/^[A-Z]{2}$/)
    schema.field('payment_method').required().enum(['stripe', 'paypal', 'bank_transfer'])
    schema.field('cart_items').required().type('array')
    return schema
  }
}

export const ContactSchemas = {
  submit: () => {
    const schema = new ValidationSchema()
    schema.field('name').required().type('string').min(2).max(100).sanitize(Sanitizers.trim)
    schema.field('email').required().email().sanitize(Sanitizers.lowercase)
    schema.field('phone').optional().type('string').max(20).sanitize(Sanitizers.trim)
    schema.field('subject').required().type('string').min(3).max(200).sanitize(Sanitizers.trim)
    schema.field('message').required().type('string').min(10).max(5000).sanitize(Sanitizers.trim)
    schema.field('orderNumber').optional().type('string').max(50).sanitize(Sanitizers.trim)
    return schema
  }
}
