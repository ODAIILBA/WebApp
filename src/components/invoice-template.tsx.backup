export const InvoiceTemplate = (invoice: any) => {
  const formatDate = (date: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatCurrency = (cents: number) => {
    return (cents / 100).toFixed(2) + ' €';
  };

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rechnung ${invoice.invoice_number}</title>
  <style>
    @page {
      size: A4;
      margin: 0;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 10pt;
      line-height: 1.4;
      color: #000;
      background: white;
    }
    
    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 20mm 25mm;
      margin: 0 auto;
      background: white;
      position: relative;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 40px;
    }
    
    .logo {
      width: 180px;
    }
    
    .invoice-info {
      text-align: right;
    }
    
    .invoice-info h2 {
      font-size: 11pt;
      font-weight: bold;
      margin-bottom: 2px;
      color: #000;
    }
    
    .invoice-info p {
      font-size: 9pt;
      margin: 2px 0;
    }
    
    .divider {
      border: none;
      border-top: 2px solid #f7b500;
      margin: 15px 0 20px 0;
    }
    
    .section {
      margin-bottom: 20px;
    }
    
    .section-header {
      font-size: 9pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 8px;
      color: #000;
    }
    
    .two-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 25px;
    }
    
    .customer-info p {
      margin: 2px 0;
      font-size: 9pt;
    }
    
    .payment-info {
      text-align: left;
    }
    
    .payment-info p {
      margin: 3px 0;
      font-size: 9pt;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 9pt;
    }
    
    table thead {
      background: #1a2b5e;
      color: white;
    }
    
    table th {
      padding: 8px 10px;
      text-align: left;
      font-weight: bold;
      font-size: 9pt;
    }
    
    table th.right {
      text-align: right;
    }
    
    table td {
      padding: 10px 10px;
      border-bottom: 1px solid #e0e0e0;
      font-size: 9pt;
    }
    
    table td.right {
      text-align: right;
    }
    
    table td.center {
      text-align: center;
    }
    
    .product-sku {
      font-size: 8pt;
      color: #666;
      display: block;
      margin-top: 2px;
    }
    
    .totals {
      margin-top: 10px;
      border-top: 1px solid #ddd;
    }
    
    .totals table {
      margin: 0;
      width: auto;
      margin-left: auto;
    }
    
    .totals td {
      border: none;
      padding: 6px 20px 6px 0;
      font-size: 9pt;
    }
    
    .totals tr.subtotal td {
      font-weight: normal;
    }
    
    .totals tr.tax td {
      font-weight: normal;
    }
    
    .totals tr.total {
      background: #1a2b5e;
      color: white;
      font-weight: bold;
      font-size: 10pt;
    }
    
    .totals tr.total td {
      padding: 10px 20px 10px 10px;
    }
    
    .digital-notice {
      background: #f5f5f5;
      padding: 12px;
      margin: 20px 0;
      border-left: 3px solid #f7b500;
      font-size: 9pt;
    }
    
    .digital-notice strong {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    
    .footer-info {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #f7b500;
      font-size: 8pt;
    }
    
    .footer-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 15px;
    }
    
    .footer-section h4 {
      font-size: 8pt;
      font-weight: bold;
      margin-bottom: 5px;
      text-transform: uppercase;
    }
    
    .footer-section p {
      margin: 2px 0;
      font-size: 8pt;
      line-height: 1.4;
    }
    
    .footer-note {
      margin-top: 15px;
      text-align: center;
      font-size: 8pt;
      font-style: italic;
      color: #666;
    }
    
    .thank-you {
      text-align: center;
      margin: 30px 0 20px 0;
      font-size: 11pt;
      font-weight: bold;
      color: #1a2b5e;
    }
    
    @media print {
      body {
        background: white;
      }
      .page {
        margin: 0;
        padding: 15mm 20mm;
        page-break-after: always;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <!-- Header -->
    <div class="header">
      <div>
        <img src="/static/logo.png" alt="SoftwareKing24" class="logo" style="max-width: 180px; height: auto;">
      </div>
      <div class="invoice-info">
        <h2>Rechnungs-Nr:</h2>
        <p><strong>${invoice.invoice_number}</strong></p>
        <p>${formatDate(invoice.invoice_date)}</p>
      </div>
    </div>

    <hr class="divider">

    <!-- Customer & Payment Info -->
    <div class="two-column">
      <div class="section">
        <div class="section-header">Kunde</div>
        <div class="customer-info">
          <p><strong>${invoice.customer_name}</strong></p>
          ${invoice.customer_company ? `<p>${invoice.customer_company}</p>` : ''}
          <p>${invoice.billing_address}</p>
          <p>${invoice.billing_postal_code} ${invoice.billing_city}</p>
          <p>${invoice.customer_email}</p>
          <p>Tel: ${invoice.customer_phone || '01-7144889642'}</p>
        </div>
      </div>

      <div class="section">
        <div class="section-header">Zahlungsart</div>
        <div class="payment-info">
          <p><strong>${invoice.payment_method || 'Kauf auf Rechnung'}</strong></p>
          <p><strong>Liefer-/Leistungsdatum</strong></p>
          <p>${formatDate(invoice.invoice_date)}</p>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <table>
      <thead>
        <tr>
          <th style="width: 10%"></th>
          <th style="width: 40%">ARTIKEL</th>
          <th class="right" style="width: 15%">PREIS</th>
          <th class="right" style="width: 10%">STEUER</th>
          <th class="center" style="width: 10%">MENGE</th>
          <th class="right" style="width: 15%">ZEILENSUMME</th>
        </tr>
      </thead>
      <tbody>
        ${(invoice.items || []).map((item: any, index: number) => `
          <tr>
            <td style="text-align: center; vertical-align: middle;">
              <div style="width: 40px; height: 40px; background: #f5f5f5; border: 1px solid #ddd; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1a2b5e">
                  <rect x="4" y="4" width="16" height="16" rx="2"/>
                </svg>
              </div>
            </td>
            <td>
              <strong>${item.description}</strong>
              <span class="product-sku">SKU: ${item.product_sku || 'SK24-' + String(index + 1).padStart(6, '0')}</span>
              ${item.certificate ? `
                <br/>
                <span style="display: inline-block; margin-top: 4px; padding: 2px 8px; background: #10b981; color: white; border-radius: 4px; font-size: 11px;">
                  <strong>✓ Zertifikat:</strong> ${item.certificate.certificate_number}
                </span>
              ` : ''}
            </td>
            <td class="right">${formatCurrency(item.unit_price)}</td>
            <td class="right">${item.tax_rate}%</td>
            <td class="center">${item.quantity}</td>
            <td class="right">${formatCurrency(item.line_total)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- Digital Delivery Notice -->
    <div class="digital-notice">
      <strong>DIGITAL</strong>
      Bereitstellung per E-Mail/Download am: ${formatDate(invoice.invoice_date)}
    </div>

    <!-- Totals -->
    <div class="totals">
      <table>
        <tr class="subtotal">
          <td>Zwischensumme</td>
          <td class="right">${formatCurrency(invoice.subtotal)}</td>
        </tr>
        <tr class="tax">
          <td>Summe (netto)</td>
          <td class="right">${formatCurrency(invoice.subtotal)}</td>
        </tr>
        <tr class="tax">
          <td>inkl. ${invoice.tax_rate}% MwSt</td>
          <td class="right">${formatCurrency(invoice.tax_amount)}</td>
        </tr>
        <tr class="total">
          <td><strong>GESAMTSUMME (EUR)</strong></td>
          <td class="right"><strong>${formatCurrency(invoice.total_amount)}</strong></td>
        </tr>
      </table>
    </div>

    <!-- Thank You Message -->
    <div class="thank-you">
      Vielen Dank für Ihren Einkauf bei SoftwareKing24!
    </div>

    <!-- Footer Info -->
    <div class="footer-info">
      <div class="footer-grid">
        <div class="footer-section">
          <h4>Unternehmensangaben</h4>
          <p><strong>SoftwareKing24.de</strong></p>
          <p>Baumschulenweg 17, D-04838 Roppitzau</p>
          <p>Umsatzsteuer-ID: DE4530454724</p>
          <p>Steuernummer: 11G239038328</p>
        </div>
        <div class="footer-section">
          <h4>Kontakt</h4>
          <p>support@softwareking24.de</p>
          <p>softwareking24.de</p>
        </div>
        <div class="footer-section">
          <h4>Zahlungs-/Bankverbindung</h4>
          <p>Inhaber: <strong>Julia Kühn</strong></p>
          <p>IBAN: DE39 1207 0024 0123 0403 23</p>
          <p>BIC: <strong>NOLADE21DES</strong></p>
          <p>Verwendungszweck: <strong>${invoice.invoice_number}</strong></p>
        </div>
      </div>
      <p class="footer-note">Diese Rechnung wurde elektronisch erstellt und ist ohne Unterschrift gültig.</p>
    </div>
  </div>
</body>
</html>
  `;
};
