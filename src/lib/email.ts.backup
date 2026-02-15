// Email Service for sending notifications
// This is a simple implementation that queues emails for sending
// In production, integrate with services like SendGrid, Mailgun, or Resend

export class EmailService {
  private db: any

  constructor(db: any) {
    this.db = db
  }

  /**
   * Queue an email for sending
   */
  async queueEmail(params: {
    to_email: string
    to_name?: string
    subject: string
    body_html: string
    body_text?: string
    template_name?: string
    template_data?: any
    priority?: number
  }) {
    try {
      const result = await this.db.prepare(`
        INSERT INTO email_queue (
          to_email, to_name, subject, body_html, body_text,
          template_name, template_data, priority, status, scheduled_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', datetime('now'))
      `).bind(
        params.to_email,
        params.to_name || '',
        params.subject,
        params.body_html,
        params.body_text || '',
        params.template_name || '',
        params.template_data ? JSON.stringify(params.template_data) : '',
        params.priority || 5
      ).run()

      console.log(`Email queued for ${params.to_email}: ${params.subject}`)
      return result.meta.last_row_id
    } catch (error) {
      console.error('Error queuing email:', error)
      throw error
    }
  }

  /**
   * Send order confirmation email
   */
  async sendOrderConfirmation(order: any, customer: any) {
    const template = await this.getTemplate('order_confirmation')
    if (!template) {
      console.error('Order confirmation template not found')
      return
    }

    const subject = template.subject
      .replace('{{order_number}}', order.order_number)
    
    const body = template.body_html
      .replace(/{{customer_name}}/g, customer.first_name || customer.email)
      .replace(/{{order_number}}/g, order.order_number)
      .replace(/{{order_date}}/g, new Date(order.created_at).toLocaleDateString('de-DE'))
      .replace(/{{order_total}}/g, `€${order.total_amount}`)

    await this.queueEmail({
      to_email: customer.email,
      to_name: customer.first_name ? `${customer.first_name} ${customer.last_name || ''}` : undefined,
      subject,
      body_html: body,
      template_name: 'order_confirmation',
      template_data: { order, customer },
      priority: 8
    })

    // Log the email
    await this.logEmail({
      user_id: customer.id,
      order_id: order.id,
      email: customer.email,
      subject,
      status: 'queued'
    })
  }

  /**
   * Send license keys email
   */
  async sendLicenseKeys(order: any, customer: any, licenses: any[]) {
    const template = await this.getTemplate('license_delivery')
    if (!template) {
      console.error('License delivery template not found')
      return
    }

    const licenseHtml = licenses.map(l => `
      <div style="margin: 10px 0; padding: 10px; background: white; border-radius: 3px;">
        <strong>${l.product_name}</strong><br/>
        <code style="font-size: 14px; color: #1e40af;">${l.license_key}</code>
      </div>
    `).join('')

    const subject = template.subject
      .replace('{{order_number}}', order.order_number)
    
    const body = template.body_html
      .replace(/{{customer_name}}/g, customer.first_name || customer.email)
      .replace(/{{order_number}}/g, order.order_number)
      .replace(/{{license_keys}}/g, licenseHtml)

    await this.queueEmail({
      to_email: customer.email,
      to_name: customer.first_name ? `${customer.first_name} ${customer.last_name || ''}` : undefined,
      subject,
      body_html: body,
      template_name: 'license_delivery',
      template_data: { order, customer, licenses },
      priority: 9 // High priority
    })

    await this.logEmail({
      user_id: customer.id,
      order_id: order.id,
      email: customer.email,
      subject,
      status: 'queued'
    })
  }

  /**
   * Send welcome email
   */
  async sendWelcomeEmail(user: any, shopUrl: string) {
    const template = await this.getTemplate('welcome')
    if (!template) {
      console.error('Welcome template not found')
      return
    }

    const subject = template.subject
    
    const body = template.body_html
      .replace(/{{customer_name}}/g, user.first_name || user.email)
      .replace(/{{shop_url}}/g, shopUrl)

    await this.queueEmail({
      to_email: user.email,
      to_name: user.first_name ? `${user.first_name} ${user.last_name || ''}` : undefined,
      subject,
      body_html: body,
      template_name: 'welcome',
      template_data: { user, shopUrl },
      priority: 5
    })

    await this.logEmail({
      user_id: user.id,
      email: user.email,
      subject,
      status: 'queued'
    })
  }

  /**
   * Send password reset email
   */
  async sendPasswordReset(user: any, resetLink: string) {
    const template = await this.getTemplate('password_reset')
    if (!template) {
      console.error('Password reset template not found')
      return
    }

    const subject = template.subject
    
    const body = template.body_html
      .replace(/{{customer_name}}/g, user.first_name || user.email)
      .replace(/{{reset_link}}/g, resetLink)

    await this.queueEmail({
      to_email: user.email,
      to_name: user.first_name ? `${user.first_name} ${user.last_name || ''}` : undefined,
      subject,
      body_html: body,
      template_name: 'password_reset',
      template_data: { user, resetLink },
      priority: 10 // Highest priority
    })

    await this.logEmail({
      user_id: user.id,
      email: user.email,
      subject,
      status: 'queued'
    })
  }

  /**
   * Get email template
   */
  private async getTemplate(name: string) {
    try {
      return await this.db.prepare(`
        SELECT * FROM email_templates 
        WHERE name = ? AND is_active = 1
      `).bind(name).first()
    } catch (error) {
      console.error('Error fetching template:', error)
      return null
    }
  }

  /**
   * Log email
   */
  private async logEmail(params: {
    user_id?: number
    order_id?: number
    email: string
    subject: string
    status: string
    error_message?: string
  }) {
    try {
      await this.db.prepare(`
        INSERT INTO email_logs (
          user_id, order_id, email, subject, status, error_message, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
      `).bind(
        params.user_id || null,
        params.order_id || null,
        params.email,
        params.subject,
        params.status,
        params.error_message || null
      ).run()
    } catch (error) {
      console.error('Error logging email:', error)
    }
  }

  /**
   * Process email queue (call this periodically or trigger-based)
   */
  async processQueue(limit = 10) {
    try {
      const pending = await this.db.prepare(`
        SELECT * FROM email_queue 
        WHERE status = 'pending' 
        AND attempts < max_attempts
        AND (scheduled_at IS NULL OR scheduled_at <= datetime('now'))
        ORDER BY priority DESC, created_at ASC
        LIMIT ?
      `).bind(limit).all()

      for (const email of pending.results || []) {
        await this.sendEmail(email)
      }
    } catch (error) {
      console.error('Error processing email queue:', error)
    }
  }

  /**
   * Actually send email (integrate with email service here)
   */
  private async sendEmail(email: any) {
    try {
      // Mark as sending
      await this.db.prepare(`
        UPDATE email_queue 
        SET status = 'sending', attempts = attempts + 1, updated_at = datetime('now')
        WHERE id = ?
      `).bind(email.id).run()

      // TODO: Integrate with actual email service (SendGrid, Mailgun, Resend, etc.)
      // For now, just log it
      console.log(`\n📧 EMAIL WOULD BE SENT:`)
      console.log(`   To: ${email.to_email}`)
      console.log(`   Subject: ${email.subject}`)
      console.log(`   Priority: ${email.priority}`)

      // Mark as sent
      await this.db.prepare(`
        UPDATE email_queue 
        SET status = 'sent', sent_at = datetime('now'), updated_at = datetime('now')
        WHERE id = ?
      `).bind(email.id).run()

      console.log(`   ✅ Marked as sent\n`)
    } catch (error: any) {
      console.error('Error sending email:', error)
      
      // Mark as failed
      await this.db.prepare(`
        UPDATE email_queue 
        SET status = 'failed', error_message = ?, updated_at = datetime('now')
        WHERE id = ?
      `).bind(error.message, email.id).run()
    }
  }
}
