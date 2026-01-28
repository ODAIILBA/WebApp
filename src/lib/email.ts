/**
 * Email Service
 * Supports SendGrid for production and console logging for development
 */

export interface EmailTemplate {
  subject: string
  htmlBody: string
  textBody: string
}

export interface EmailOptions {
  to: string
  from?: string
  subject: string
  html: string
  text: string
}

/**
 * Email Templates
 */
export class EmailTemplates {
  private siteName: string
  private baseUrl: string
  
  constructor(siteName: string = 'SoftwareKing24', baseUrl: string = 'https://softwareking24.de') {
    this.siteName = siteName
    this.baseUrl = baseUrl
  }
  
  /**
   * Welcome email after registration
   */
  welcomeEmail(firstName: string, verificationToken: string): EmailTemplate {
    const verificationLink = `${this.baseUrl}/verify-email?token=${verificationToken}`
    
    return {
      subject: `Welcome to ${this.siteName}!`,
      htmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Welcome to ${this.siteName}!</h1>
          <p>Hi ${firstName},</p>
          <p>Thank you for creating an account with us. To get started, please verify your email address:</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" style="background-color: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Verify Email Address
            </a>
          </p>
          <p>Or copy and paste this link into your browser:</p>
          <p style="color: #666; font-size: 12px;">${verificationLink}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="color: #999; font-size: 12px;">
            If you didn't create this account, please ignore this email.
          </p>
        </div>
      `,
      textBody: `
Welcome to ${this.siteName}!

Hi ${firstName},

Thank you for creating an account with us. To get started, please verify your email address by clicking the link below:

${verificationLink}

If you didn't create this account, please ignore this email.

Best regards,
The ${this.siteName} Team
      `.trim()
    }
  }
  
  /**
   * Password reset email
   */
  passwordResetEmail(firstName: string, resetToken: string): EmailTemplate {
    const resetLink = `${this.baseUrl}/reset-password?token=${resetToken}`
    
    return {
      subject: 'Reset Your Password',
      htmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Reset Your Password</h1>
          <p>Hi ${firstName},</p>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Reset Password
            </a>
          </p>
          <p>Or copy and paste this link into your browser:</p>
          <p style="color: #666; font-size: 12px;">${resetLink}</p>
          <p><strong>This link will expire in 1 hour.</strong></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="color: #999; font-size: 12px;">
            If you didn't request a password reset, please ignore this email or contact support if you're concerned.
          </p>
        </div>
      `,
      textBody: `
Reset Your Password

Hi ${firstName},

We received a request to reset your password. Click the link below to create a new password:

${resetLink}

This link will expire in 1 hour.

If you didn't request a password reset, please ignore this email or contact support if you're concerned.

Best regards,
The ${this.siteName} Team
      `.trim()
    }
  }
  
  /**
   * License delivery email
   */
  licenseDeliveryEmail(
    firstName: string,
    orderNumber: string,
    productName: string,
    licenseKey: string,
    downloadLink?: string
  ): EmailTemplate {
    return {
      subject: `Your License Key for ${productName}`,
      htmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Your License Key</h1>
          <p>Hi ${firstName},</p>
          <p>Thank you for your purchase! Here are your license details:</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold;">Order Number:</p>
            <p style="margin: 5px 0 15px 0;">${orderNumber}</p>
            
            <p style="margin: 0; font-weight: bold;">Product:</p>
            <p style="margin: 5px 0 15px 0;">${productName}</p>
            
            <p style="margin: 0; font-weight: bold;">License Key:</p>
            <p style="margin: 5px 0; font-family: monospace; font-size: 18px; color: #0066cc; font-weight: bold;">
              ${licenseKey}
            </p>
          </div>
          
          ${downloadLink ? `
            <p style="text-align: center; margin: 30px 0;">
              <a href="${downloadLink}" style="background-color: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Download Software
              </a>
            </p>
          ` : ''}
          
          <h3>Installation Instructions:</h3>
          <ol>
            <li>Download and install the software${downloadLink ? ' using the link above' : ''}</li>
            <li>Launch the application</li>
            <li>When prompted, enter your license key</li>
            <li>Enjoy your software!</li>
          </ol>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="color: #999; font-size: 12px;">
            Keep this email safe. You'll need your license key to activate the software.
            If you have any questions, please contact our support team.
          </p>
        </div>
      `,
      textBody: `
Your License Key

Hi ${firstName},

Thank you for your purchase! Here are your license details:

Order Number: ${orderNumber}
Product: ${productName}

License Key: ${licenseKey}

${downloadLink ? `Download: ${downloadLink}\n\n` : ''}
Installation Instructions:
1. Download and install the software${downloadLink ? ' using the link above' : ''}
2. Launch the application
3. When prompted, enter your license key
4. Enjoy your software!

Keep this email safe. You'll need your license key to activate the software.
If you have any questions, please contact our support team.

Best regards,
The ${this.siteName} Team
      `.trim()
    }
  }
  
  /**
   * Order confirmation email
   */
  orderConfirmationEmail(
    firstName: string,
    orderNumber: string,
    items: Array<{ name: string; price: string }>,
    total: string
  ): EmailTemplate {
    const itemsHtml = items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.price}</td>
      </tr>
    `).join('')
    
    const itemsText = items.map(item => `${item.name}: ${item.price}`).join('\n')
    
    return {
      subject: `Order Confirmation - ${orderNumber}`,
      htmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Order Confirmation</h1>
          <p>Hi ${firstName},</p>
          <p>Thank you for your order! We've received your payment and are processing your order.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold;">Order Number:</p>
            <p style="margin: 5px 0;">${orderNumber}</p>
          </div>
          
          <h3>Order Summary:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${itemsHtml}
            <tr>
              <td style="padding: 10px; font-weight: bold;">Total:</td>
              <td style="padding: 10px; text-align: right; font-weight: bold;">${total}</td>
            </tr>
          </table>
          
          <p style="margin-top: 30px;">
            Your license keys will be sent to you in a separate email within a few minutes.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="color: #999; font-size: 12px;">
            If you have any questions about your order, please contact our support team.
          </p>
        </div>
      `,
      textBody: `
Order Confirmation

Hi ${firstName},

Thank you for your order! We've received your payment and are processing your order.

Order Number: ${orderNumber}

Order Summary:
${itemsText}
Total: ${total}

Your license keys will be sent to you in a separate email within a few minutes.

If you have any questions about your order, please contact our support team.

Best regards,
The ${this.siteName} Team
      `.trim()
    }
  }
}

/**
 * Email Service
 */
export class EmailService {
  private apiKey: string
  private fromEmail: string
  private fromName: string
  private isDevelopment: boolean
  private templates: EmailTemplates
  
  constructor(
    apiKey: string,
    fromEmail: string,
    fromName: string = 'SoftwareKing24',
    isDevelopment: boolean = false
  ) {
    this.apiKey = apiKey
    this.fromEmail = fromEmail
    this.fromName = fromName
    this.isDevelopment = isDevelopment
    this.templates = new EmailTemplates(fromName)
  }
  
  /**
   * Send email via SendGrid
   */
  private async sendViaSendGrid(options: EmailOptions): Promise<boolean> {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: options.to }]
          }],
          from: {
            email: options.from || this.fromEmail,
            name: this.fromName
          },
          subject: options.subject,
          content: [
            {
              type: 'text/plain',
              value: options.text
            },
            {
              type: 'text/html',
              value: options.html
            }
          ]
        })
      })
      
      return response.ok
    } catch (error) {
      console.error('SendGrid error:', error)
      return false
    }
  }
  
  /**
   * Send email (console log in development)
   */
  async send(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
    try {
      if (this.isDevelopment || !this.apiKey || this.apiKey.includes('placeholder')) {
        // Development mode - log to console
        console.log('📧 Email (DEV MODE):')
        console.log(`To: ${options.to}`)
        console.log(`From: ${options.from || this.fromEmail}`)
        console.log(`Subject: ${options.subject}`)
        console.log(`\nText Body:\n${options.text}`)
        console.log('\n---\n')
        return { success: true }
      }
      
      // Production mode - send via SendGrid
      const sent = await this.sendViaSendGrid(options)
      
      if (!sent) {
        return { success: false, error: 'Failed to send email' }
      }
      
      return { success: true }
    } catch (error) {
      console.error('Email send error:', error)
      return { success: false, error: 'Failed to send email' }
    }
  }
  
  /**
   * Send welcome email
   */
  async sendWelcomeEmail(email: string, firstName: string, verificationToken: string) {
    const template = this.templates.welcomeEmail(firstName, verificationToken)
    return this.send({
      to: email,
      subject: template.subject,
      html: template.htmlBody,
      text: template.textBody
    })
  }
  
  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email: string, firstName: string, resetToken: string) {
    const template = this.templates.passwordResetEmail(firstName, resetToken)
    return this.send({
      to: email,
      subject: template.subject,
      html: template.htmlBody,
      text: template.textBody
    })
  }
  
  /**
   * Send license delivery email
   */
  async sendLicenseEmail(
    email: string,
    firstName: string,
    orderNumber: string,
    productName: string,
    licenseKey: string,
    downloadLink?: string
  ) {
    const template = this.templates.licenseDeliveryEmail(
      firstName,
      orderNumber,
      productName,
      licenseKey,
      downloadLink
    )
    return this.send({
      to: email,
      subject: template.subject,
      html: template.htmlBody,
      text: template.textBody
    })
  }
  
  /**
   * Send order confirmation email
   */
  async sendOrderConfirmationEmail(
    email: string,
    firstName: string,
    orderNumber: string,
    items: Array<{ name: string; price: string }>,
    total: string
  ) {
    const template = this.templates.orderConfirmationEmail(firstName, orderNumber, items, total)
    return this.send({
      to: email,
      subject: template.subject,
      html: template.htmlBody,
      text: template.textBody
    })
  }
}
