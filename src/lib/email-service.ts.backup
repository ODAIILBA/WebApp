// Email service integration
// Supports SendGrid and Resend APIs

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export interface EmailData {
  to: string
  from?: string
  subject: string
  html?: string
  text?: string
  templateId?: string
  dynamicData?: Record<string, any>
}

export class EmailService {
  private apiKey: string
  private fromEmail: string
  private fromName: string
  private provider: 'sendgrid' | 'resend'

  constructor(config: {
    provider: 'sendgrid' | 'resend'
    apiKey: string
    fromEmail: string
    fromName: string
  }) {
    this.provider = config.provider
    this.apiKey = config.apiKey
    this.fromEmail = config.fromEmail
    this.fromName = config.fromName
  }

  /**
   * Send email via SendGrid
   */
  private async sendViaSendGrid(data: EmailData): Promise<boolean> {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: data.to }],
            dynamic_template_data: data.dynamicData || {}
          }],
          from: {
            email: data.from || this.fromEmail,
            name: this.fromName
          },
          subject: data.subject,
          content: [
            {
              type: 'text/html',
              value: data.html || ''
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
   * Send email via Resend
   */
  private async sendViaResend(data: EmailData): Promise<boolean> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: `${this.fromName} <${data.from || this.fromEmail}>`,
          to: [data.to],
          subject: data.subject,
          html: data.html,
          text: data.text
        })
      })

      return response.ok
    } catch (error) {
      console.error('Resend error:', error)
      return false
    }
  }

  /**
   * Send email
   */
  async send(data: EmailData): Promise<boolean> {
    if (this.provider === 'sendgrid') {
      return this.sendViaSendGrid(data)
    } else {
      return this.sendViaResend(data)
    }
  }

  /**
   * Generate order confirmation email
   */
  static generateOrderConfirmation(data: {
    orderNumber: string
    customerName: string
    items: Array<{ name: string; quantity: number; price: number }>
    subtotal: number
    vat: number
    total: number
    licenses: Array<{ productName: string; key: string }>
  }): EmailTemplate {
    const itemsHtml = data.items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">€${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('')

    const licensesHtml = data.licenses.map(license => `
      <div style="background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #2563eb;">
        <strong style="color: #2563eb;">${license.productName}</strong><br/>
        <code style="font-size: 16px; background: white; padding: 5px 10px; display: inline-block; margin-top: 5px; border-radius: 4px; font-family: monospace;">${license.key}</code>
      </div>
    `).join('')

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">SoftwareKing24</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Vielen Dank für Ihre Bestellung!</p>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hallo ${data.customerName},</p>
          
          <p>Ihre Bestellung wurde erfolgreich aufgegeben und wird sofort bearbeitet.</p>
          
          <div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Bestellnummer:</strong> ${data.orderNumber}</p>
            <p style="margin: 10px 0 0 0;"><strong>Bestelldatum:</strong> ${new Date().toLocaleDateString('de-DE')}</p>
          </div>

          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-top: 30px;">Bestellübersicht</h2>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #f3f4f6;">
                <th style="padding: 10px; text-align: left;">Produkt</th>
                <th style="padding: 10px; text-align: center;">Menge</th>
                <th style="padding: 10px; text-align: right;">Preis</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right;"><strong>Zwischensumme:</strong></td>
                <td style="padding: 10px; text-align: right;">€${data.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right;"><strong>MwSt. (19%):</strong></td>
                <td style="padding: 10px; text-align: right;">€${data.vat.toFixed(2)}</td>
              </tr>
              <tr style="background: #f3f4f6;">
                <td colspan="2" style="padding: 10px; text-align: right;"><strong>Gesamt:</strong></td>
                <td style="padding: 10px; text-align: right; font-size: 18px; color: #2563eb;"><strong>€${data.total.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>

          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-top: 30px;">🔑 Ihre Lizenzschlüssel</h2>
          <p>Hier sind Ihre Lizenzschlüssel für die erworbenen Produkte:</p>
          ${licensesHtml}

          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 30px 0; border-radius: 4px;">
            <p style="margin: 0;"><strong>⚠️ Wichtig:</strong> Bitte bewahren Sie diese E-Mail und Ihre Lizenzschlüssel sicher auf. Sie benötigen sie für die Installation und Aktivierung Ihrer Software.</p>
          </div>

          <h3 style="color: #333; margin-top: 30px;">Nächste Schritte:</h3>
          <ol style="padding-left: 20px;">
            <li style="margin: 10px 0;">Laden Sie Ihre Software vom Hersteller herunter</li>
            <li style="margin: 10px 0;">Installieren Sie die Software auf Ihrem Computer</li>
            <li style="margin: 10px 0;">Verwenden Sie den oben angegebenen Lizenzschlüssel zur Aktivierung</li>
          </ol>

          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 30px; text-align: center;">
            <p style="margin: 0 0 15px 0;">Sie können Ihre Bestellung jederzeit in Ihrem Konto einsehen:</p>
            <a href="https://softwareking24.de/konto/bestellungen" style="display: inline-block; background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">Meine Bestellungen</a>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />

          <p style="font-size: 14px; color: #6b7280; margin: 20px 0 0 0;">
            Bei Fragen oder Problemen stehen wir Ihnen gerne zur Verfügung:<br/>
            <strong>E-Mail:</strong> [email protected]<br/>
            <strong>Telefon:</strong> +49 123 456789<br/>
            <strong>Mo-Fr:</strong> 9:00 - 18:00 Uhr
          </p>

          <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
            Mit freundlichen Grüßen,<br/>
            <strong>Ihr SoftwareKing24 Team</strong>
          </p>
        </div>

        <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
          <p style="margin: 0;">© 2026 SoftwareKing24. Alle Rechte vorbehalten.</p>
          <p style="margin: 10px 0 0 0;">
            <a href="https://softwareking24.de/agb" style="color: #2563eb; text-decoration: none;">AGB</a> | 
            <a href="https://softwareking24.de/datenschutz" style="color: #2563eb; text-decoration: none;">Datenschutz</a> | 
            <a href="https://softwareking24.de/impressum" style="color: #2563eb; text-decoration: none;">Impressum</a>
          </p>
        </div>
      </body>
      </html>
    `

    const text = `
SoftwareKing24 - Bestellbestätigung

Hallo ${data.customerName},

Vielen Dank für Ihre Bestellung!

Bestellnummer: ${data.orderNumber}
Bestelldatum: ${new Date().toLocaleDateString('de-DE')}

Bestellübersicht:
${data.items.map(item => `- ${item.name} x${item.quantity}: €${(item.price * item.quantity).toFixed(2)}`).join('\n')}

Zwischensumme: €${data.subtotal.toFixed(2)}
MwSt. (19%): €${data.vat.toFixed(2)}
Gesamt: €${data.total.toFixed(2)}

Ihre Lizenzschlüssel:
${data.licenses.map(license => `${license.productName}: ${license.key}`).join('\n')}

Bitte bewahren Sie diese E-Mail sicher auf.

Mit freundlichen Grüßen,
Ihr SoftwareKing24 Team

E-Mail: [email protected]
Telefon: +49 123 456789
    `.trim()

    return {
      subject: `Bestellbestätigung #${data.orderNumber} - SoftwareKing24`,
      html,
      text
    }
  }

  /**
   * Generate welcome email
   */
  static generateWelcomeEmail(data: {
    name: string
    email: string
  }): EmailTemplate {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Willkommen bei SoftwareKing24!</h1>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb;">
          <p>Hallo ${data.name},</p>
          <p>herzlich willkommen bei SoftwareKing24! Ihr Konto wurde erfolgreich erstellt.</p>
          <p>Sie können jetzt Original-Software zu unschlagbaren Preisen kaufen.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://softwareking24.de/produkte" style="display: inline-block; background: #2563eb; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold;">Jetzt einkaufen</a>
          </div>

          <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p>
          <p>Viele Grüße,<br/>Ihr SoftwareKing24 Team</p>
        </div>
      </body>
      </html>
    `

    const text = `Willkommen bei SoftwareKing24!\n\nHallo ${data.name},\n\nherzlich willkommen! Ihr Konto wurde erfolgreich erstellt.\n\nViele Grüße,\nIhr SoftwareKing24 Team`

    return {
      subject: 'Willkommen bei SoftwareKing24',
      html,
      text
    }
  }
}

export default EmailService
