// EU VAT Calculation and Validation Module
// Implements EU VAT rules including reverse charge mechanism

export interface VATCalculationResult {
  vatRate: number
  vatAmount: number
  netAmount: number
  grossAmount: number
  isReverseCharge: boolean
  country: string
  reason: string
}

export interface VATValidationResult {
  valid: boolean
  countryCode?: string
  vatNumber?: string
  name?: string
  address?: string
  error?: string
}

// ============================================
// EU VAT RATES (2026)
// ============================================

export const EU_VAT_RATES: Record<string, number> = {
  'AT': 20.00, // Austria
  'BE': 21.00, // Belgium
  'BG': 20.00, // Bulgaria
  'HR': 25.00, // Croatia
  'CY': 19.00, // Cyprus
  'CZ': 21.00, // Czech Republic
  'DK': 25.00, // Denmark
  'EE': 22.00, // Estonia
  'FI': 25.50, // Finland
  'FR': 20.00, // France
  'DE': 19.00, // Germany
  'GR': 24.00, // Greece
  'HU': 27.00, // Hungary
  'IE': 23.00, // Ireland
  'IT': 22.00, // Italy
  'LV': 21.00, // Latvia
  'LT': 21.00, // Lithuania
  'LU': 17.00, // Luxembourg
  'MT': 18.00, // Malta
  'NL': 21.00, // Netherlands
  'PL': 23.00, // Poland
  'PT': 23.00, // Portugal
  'RO': 19.00, // Romania
  'SK': 20.00, // Slovakia
  'SI': 22.00, // Slovenia
  'ES': 21.00, // Spain
  'SE': 25.00, // Sweden
}

export const SELLER_COUNTRY = 'DE' // Germany
export const SELLER_VAT_NUMBER = 'DE123456789' // Configure in production

// ============================================
// VAT NUMBER VALIDATION
// ============================================

export class VATValidator {
  /**
   * Validate VAT number format
   */
  static validateFormat(vatNumber: string): boolean {
    if (!vatNumber || vatNumber.length < 4) return false

    const countryCode = vatNumber.substring(0, 2).toUpperCase()
    const number = vatNumber.substring(2)

    // Check if country is in EU
    if (!EU_VAT_RATES[countryCode]) return false

    // Basic format validation per country
    const patterns: Record<string, RegExp> = {
      'AT': /^U\d{8}$/,
      'BE': /^\d{10}$/,
      'BG': /^\d{9,10}$/,
      'HR': /^\d{11}$/,
      'CY': /^\d{8}[A-Z]$/,
      'CZ': /^\d{8,10}$/,
      'DK': /^\d{8}$/,
      'EE': /^\d{9}$/,
      'FI': /^\d{8}$/,
      'FR': /^[A-Z0-9]{2}\d{9}$/,
      'DE': /^\d{9}$/,
      'GR': /^\d{9}$/,
      'HU': /^\d{8}$/,
      'IE': /^[\dA-Z]{7}[A-Z]{1,2}$/,
      'IT': /^\d{11}$/,
      'LV': /^\d{11}$/,
      'LT': /^\d{9,12}$/,
      'LU': /^\d{8}$/,
      'MT': /^\d{8}$/,
      'NL': /^\d{9}B\d{2}$/,
      'PL': /^\d{10}$/,
      'PT': /^\d{9}$/,
      'RO': /^\d{2,10}$/,
      'SK': /^\d{10}$/,
      'SI': /^\d{8}$/,
      'ES': /^[A-Z0-9]\d{7}[A-Z0-9]$/,
      'SE': /^\d{12}$/,
    }

    const pattern = patterns[countryCode]
    return pattern ? pattern.test(number) : false
  }

  /**
   * Validate VAT number with VIES (EU VAT Information Exchange System)
   * In production, this should call the actual VIES API
   * For now, we'll do format validation only
   */
  static async validateWithVIES(vatNumber: string): Promise<VATValidationResult> {
    // Format validation first
    if (!this.validateFormat(vatNumber)) {
      return {
        valid: false,
        error: 'Invalid VAT number format'
      }
    }

    const countryCode = vatNumber.substring(0, 2).toUpperCase()
    const number = vatNumber.substring(2)

    // In production, call VIES API:
    // https://ec.europa.eu/taxation_customs/vies/rest-api/check-vat-number
    
    try {
      /* Production implementation:
      const response = await fetch(
        `https://ec.europa.eu/taxation_customs/vies/rest-api/check-vat-number`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            countryCode,
            vatNumber: number
          })
        }
      )
      
      const result = await response.json()
      
      if (result.valid) {
        return {
          valid: true,
          countryCode,
          vatNumber,
          name: result.name,
          address: result.address
        }
      }
      */

      // Mock validation for development
      console.log(`[VAT Validation] Validating ${countryCode}${number} (MOCK)`)
      
      return {
        valid: true,
        countryCode,
        vatNumber,
        name: 'Mock Company Name',
        address: 'Mock Address'
      }
    } catch (error) {
      return {
        valid: false,
        error: 'VIES service unavailable'
      }
    }
  }

  /**
   * Check if VAT number belongs to the same country as seller
   */
  static isSameCountry(vatNumber: string): boolean {
    const countryCode = vatNumber.substring(0, 2).toUpperCase()
    return countryCode === SELLER_COUNTRY
  }

  /**
   * Check if country is in EU
   */
  static isEUCountry(countryCode: string): boolean {
    return countryCode.toUpperCase() in EU_VAT_RATES
  }
}

// ============================================
// VAT CALCULATION
// ============================================

export class VATCalculator {
  /**
   * Calculate VAT for an order
   * Implements EU VAT rules including reverse charge
   */
  static async calculate(
    netAmount: number,
    country: string,
    vatNumber?: string,
    isCompany: boolean = false
  ): Promise<VATCalculationResult> {
    const countryCode = country.toUpperCase()

    // Check if country is in EU
    if (!VATValidator.isEUCountry(countryCode)) {
      // Non-EU: No VAT
      return {
        vatRate: 0,
        vatAmount: 0,
        netAmount,
        grossAmount: netAmount,
        isReverseCharge: false,
        country: countryCode,
        reason: 'Non-EU country - no VAT applicable'
      }
    }

    // B2C (Business to Consumer) - Apply VAT
    if (!isCompany || !vatNumber) {
      const vatRate = EU_VAT_RATES[countryCode] || 0
      const vatAmount = (netAmount * vatRate) / 100
      
      return {
        vatRate,
        vatAmount,
        netAmount,
        grossAmount: netAmount + vatAmount,
        isReverseCharge: false,
        country: countryCode,
        reason: `B2C - ${countryCode} VAT rate ${vatRate}% applied`
      }
    }

    // B2B (Business to Business) with VAT number
    // Validate VAT number format
    if (!VATValidator.validateFormat(vatNumber)) {
      // Invalid VAT number - treat as B2C
      const vatRate = EU_VAT_RATES[countryCode] || 0
      const vatAmount = (netAmount * vatRate) / 100
      
      return {
        vatRate,
        vatAmount,
        netAmount,
        grossAmount: netAmount + vatAmount,
        isReverseCharge: false,
        country: countryCode,
        reason: 'Invalid VAT number - treated as B2C'
      }
    }

    // Same country B2B - Apply VAT
    if (VATValidator.isSameCountry(vatNumber)) {
      const vatRate = EU_VAT_RATES[SELLER_COUNTRY] || 0
      const vatAmount = (netAmount * vatRate) / 100
      
      return {
        vatRate,
        vatAmount,
        netAmount,
        grossAmount: netAmount + vatAmount,
        isReverseCharge: false,
        country: countryCode,
        reason: `Same country B2B - ${SELLER_COUNTRY} VAT rate ${vatRate}% applied`
      }
    }

    // Different EU country B2B - Reverse Charge (0% VAT)
    return {
      vatRate: 0,
      vatAmount: 0,
      netAmount,
      grossAmount: netAmount,
      isReverseCharge: true,
      country: countryCode,
      reason: 'B2B Reverse Charge - VAT 0% (buyer must self-assess VAT)'
    }
  }

  /**
   * Calculate VAT for cart items
   */
  static async calculateForCart(
    items: Array<{ product_id: number; quantity: number; unit_price: number }>,
    country: string,
    vatNumber?: string,
    isCompany: boolean = false
  ): Promise<{
    subtotal: number
    vatAmount: number
    total: number
    vatBreakdown: VATCalculationResult
  }> {
    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => {
      return sum + (item.unit_price * item.quantity)
    }, 0)

    // Calculate VAT
    const vatBreakdown = await this.calculate(subtotal, country, vatNumber, isCompany)

    return {
      subtotal,
      vatAmount: vatBreakdown.vatAmount,
      total: vatBreakdown.grossAmount,
      vatBreakdown
    }
  }

  /**
   * Get VAT rate for a country (for display purposes)
   */
  static getVATRate(country: string): number {
    return EU_VAT_RATES[country.toUpperCase()] || 0
  }

  /**
   * Check if transaction qualifies for reverse charge
   */
  static async isReverseCharge(
    country: string,
    vatNumber?: string
  ): Promise<boolean> {
    if (!vatNumber) return false
    
    const countryCode = country.toUpperCase()
    
    // Must be EU country
    if (!VATValidator.isEUCountry(countryCode)) return false
    
    // Must be different country than seller
    if (VATValidator.isSameCountry(vatNumber)) return false
    
    // Must have valid VAT number format
    if (!VATValidator.validateFormat(vatNumber)) return false
    
    return true
  }
}

// ============================================
// VAT INVOICE GENERATION
// ============================================

export interface VATInvoice {
  invoiceNumber: string
  invoiceDate: string
  sellerName: string
  sellerVATNumber: string
  sellerAddress: string
  buyerName: string
  buyerVATNumber?: string
  buyerAddress: string
  items: Array<{
    description: string
    quantity: number
    unitPrice: number
    netAmount: number
    vatRate: number
    vatAmount: number
    grossAmount: number
  }>
  subtotal: number
  totalVAT: number
  total: number
  isReverseCharge: boolean
  reverseChargeNote?: string
}

export class VATInvoiceGenerator {
  /**
   * Generate sequential invoice number
   */
  static generateInvoiceNumber(year: number, sequence: number): string {
    return `INV-${year}-${String(sequence).padStart(6, '0')}`
  }

  /**
   * Create VAT compliant invoice
   */
  static createInvoice(
    order: any,
    vatCalculation: VATCalculationResult
  ): VATInvoice {
    const invoice: VATInvoice = {
      invoiceNumber: order.invoice_number || this.generateInvoiceNumber(
        new Date().getFullYear(),
        order.id
      ),
      invoiceDate: new Date().toISOString(),
      sellerName: 'Premium Software Store GmbH',
      sellerVATNumber: SELLER_VAT_NUMBER,
      sellerAddress: 'Musterstraße 123, 12345 Musterstadt, Germany',
      buyerName: `${order.first_name} ${order.last_name}`,
      buyerVATNumber: order.vat_number || undefined,
      buyerAddress: `${order.country}`,
      items: [], // Populated from order items
      subtotal: order.subtotal,
      totalVAT: vatCalculation.vatAmount,
      total: vatCalculation.grossAmount,
      isReverseCharge: vatCalculation.isReverseCharge
    }

    if (vatCalculation.isReverseCharge) {
      invoice.reverseChargeNote = 
        'Reverse charge: VAT is payable by the recipient pursuant to Article 196 of ' +
        'Directive 2006/112/EC. Customer must self-assess and pay VAT in their country.'
    }

    return invoice
  }

  /**
   * Format invoice as HTML
   */
  static formatAsHTML(invoice: VATInvoice): string {
    // Implementation would generate full HTML invoice
    // This is a simplified version
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${invoice.invoiceNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; }
          .invoice { max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { border-bottom: 2px solid #1a2a4e; padding-bottom: 20px; }
          .reverse-charge { background: #fef3c7; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="invoice">
          <div class="header">
            <h1>INVOICE ${invoice.invoiceNumber}</h1>
            <p>Date: ${new Date(invoice.invoiceDate).toLocaleDateString()}</p>
          </div>
          
          <h3>Seller:</h3>
          <p>
            ${invoice.sellerName}<br>
            VAT: ${invoice.sellerVATNumber}<br>
            ${invoice.sellerAddress}
          </p>
          
          <h3>Buyer:</h3>
          <p>
            ${invoice.buyerName}<br>
            ${invoice.buyerVATNumber ? `VAT: ${invoice.buyerVATNumber}<br>` : ''}
            ${invoice.buyerAddress}
          </p>
          
          ${invoice.isReverseCharge ? `
            <div class="reverse-charge">
              <strong>REVERSE CHARGE:</strong><br>
              ${invoice.reverseChargeNote}
            </div>
          ` : ''}
          
          <table>
            <tr>
              <td>Subtotal:</td>
              <td>€${invoice.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td>VAT:</td>
              <td>€${invoice.totalVAT.toFixed(2)}</td>
            </tr>
            <tr>
              <td><strong>Total:</strong></td>
              <td><strong>€${invoice.total.toFixed(2)}</strong></td>
            </tr>
          </table>
        </div>
      </body>
      </html>
    `
  }
}

// Export convenience functions
export const calculateVAT = VATCalculator.calculate
export const validateVATNumber = VATValidator.validateWithVIES
export const isReverseCharge = VATCalculator.isReverseCharge
