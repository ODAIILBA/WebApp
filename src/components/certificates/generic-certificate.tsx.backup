export const GenericCertificate = (certificate: any) => {
  const formatDate = (date: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Software Lizenz - ${certificate.product_name}</title>
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
      background: white;
    }
    
    .page {
      width: 210mm;
      height: 297mm;
      padding: 25mm;
      margin: 0 auto;
      background: white;
      position: relative;
      border: 1px solid #e0e0e0;
    }
    
    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 120pt;
      color: rgba(26, 43, 94, 0.03);
      font-weight: bold;
      z-index: 0;
      pointer-events: none;
    }
    
    .content {
      position: relative;
      z-index: 1;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 3px solid #f7b500;
    }
    
    .logo-section {
      flex: 1;
    }
    
    .certificate-badge {
      text-align: right;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 2px solid #1a2b5e;
    }
    
    .badge-info {
      font-size: 8pt;
      color: #333;
      line-height: 1.4;
    }
    
    .badge-info strong {
      display: block;
      font-size: 11pt;
      color: #1a2b5e;
      margin-bottom: 5px;
    }
    
    .certificate-title {
      text-align: center;
      margin: 40px 0 30px 0;
    }
    
    .certificate-title h1 {
      font-size: 28pt;
      font-weight: bold;
      color: #1a2b5e;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    
    .certificate-title p {
      font-size: 12pt;
      color: #666;
    }
    
    .customer-section {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin: 30px 0;
      border-left: 4px solid #f7b500;
    }
    
    .customer-section h2 {
      font-size: 11pt;
      color: #1a2b5e;
      margin-bottom: 10px;
      font-weight: bold;
    }
    
    .customer-section p {
      font-size: 10pt;
      margin: 5px 0;
      color: #333;
    }
    
    .license-details {
      margin: 30px 0;
      padding: 25px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 12px;
      border: 2px solid #1a2b5e;
    }
    
    .product-header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #ddd;
    }
    
    .product-icon {
      width: 60px;
      height: 60px;
      background: #1a2b5e;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: white;
      font-size: 32pt;
    }
    
    .product-info h3 {
      font-size: 14pt;
      color: #1a2b5e;
      margin-bottom: 5px;
      font-weight: bold;
    }
    
    .product-info p {
      font-size: 9pt;
      color: #666;
    }
    
    .license-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-top: 20px;
    }
    
    .license-field {
      background: white;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #ddd;
    }
    
    .license-field label {
      display: block;
      font-size: 9pt;
      color: #666;
      margin-bottom: 5px;
      font-weight: bold;
      text-transform: uppercase;
    }
    
    .license-field .value {
      font-size: 11pt;
      color: #1a2b5e;
      font-weight: bold;
      font-family: 'Courier New', monospace;
    }
    
    .license-key-box {
      grid-column: 1 / -1;
      background: #fff3cd;
      border: 2px dashed #f7b500;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }
    
    .license-key-box label {
      display: block;
      font-size: 10pt;
      color: #856404;
      margin-bottom: 10px;
      font-weight: bold;
    }
    
    .license-key-box .value {
      font-size: 18pt;
      color: #1a2b5e;
      font-weight: bold;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
    }
    
    .support-section {
      margin: 30px 0;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #f7b500;
    }
    
    .support-section h3 {
      font-size: 11pt;
      color: #1a2b5e;
      margin-bottom: 10px;
      font-weight: bold;
    }
    
    .support-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin-top: 15px;
    }
    
    .support-item p {
      font-size: 9pt;
      margin: 3px 0;
    }
    
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #f7b500;
      text-align: center;
    }
    
    .footer-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 20px;
      text-align: left;
    }
    
    .footer-section h4 {
      font-size: 9pt;
      font-weight: bold;
      margin-bottom: 8px;
      color: #1a2b5e;
    }
    
    .footer-section p {
      font-size: 8pt;
      margin: 3px 0;
      color: #666;
    }
    
    .footer-note {
      font-size: 8pt;
      color: #999;
      font-style: italic;
      margin-top: 15px;
    }
    
    @media print {
      body {
        background: white;
      }
      .page {
        border: none;
        margin: 0;
        padding: 20mm;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="watermark">ORIGINAL</div>
    
    <div class="content">
      <!-- Header -->
      <div class="header">
        <div class="logo-section">
          <img src="/static/logo.png" alt="SoftwareKing24" style="max-width: 180px; height: auto;">
        </div>
        <div class="certificate-badge">
          <div class="badge-info">
            <strong>LIZENZ-ZERTIFIKAT</strong>
            <p>Offizielles Lizenzdokument</p>
            <p>USt-IdNr: DE4530454724</p>
            <p>Steuernummer: 11G239038328</p>
          </div>
        </div>
      </div>

      <!-- Certificate Title -->
      <div class="certificate-title">
        <h1>Software Lizenz</h1>
        <p>Offizielles Lizenzdokument</p>
      </div>

      <!-- Customer Info -->
      <div class="customer-section">
        <h2>Lizenzinhaber</h2>
        <p><strong>${certificate.customer_name || 'Kunde'}</strong></p>
        ${certificate.customer_company ? `<p>${certificate.customer_company}</p>` : ''}
        <p>${certificate.customer_address || ''}</p>
        <p>${certificate.customer_postal || ''} ${certificate.customer_city || ''}</p>
        <p>E-Mail: ${certificate.customer_email || ''}</p>
        ${certificate.customer_phone ? `<p>Tel: ${certificate.customer_phone}</p>` : ''}
      </div>

      <!-- License Details -->
      <div class="license-details">
        <div class="product-header">
          <div class="product-icon">
            📦
          </div>
          <div class="product-info">
            <h3>${certificate.product_name || 'Software Product'}</h3>
            <p>Lizenzgeber: <strong>${certificate.brand || 'Software Hersteller'}</strong> | Händler: SoftwareKing24</p>
          </div>
        </div>

        <div class="license-grid">
          <div class="license-field">
            <label>Produkt</label>
            <div class="value">${certificate.product_name || 'Software Product'}</div>
          </div>

          <div class="license-field">
            <label>Zertifikat-Nr.</label>
            <div class="value">${certificate.certificate_number || 'CERT-2026-0001'}</div>
          </div>

          <div class="license-field">
            <label>Rechnungsnummer</label>
            <div class="value">${certificate.invoice_number || ''}</div>
          </div>

          <div class="license-field">
            <label>Ausstellungsdatum</label>
            <div class="value">${formatDate(certificate.generated_at || new Date().toISOString())}</div>
          </div>

          <div class="license-field">
            <label>Bestellnummer</label>
            <div class="value">${certificate.order_number || ''}</div>
          </div>

          <div class="license-field">
            <label>Lizenztyp</label>
            <div class="value">${certificate.license_type || 'Vollversion'}</div>
          </div>

          <div class="license-key-box">
            <label>🔑 PRODUKT-LIZENZSCHLÜSSEL</label>
            <div class="value">${certificate.license_key || 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX'}</div>
          </div>
        </div>
      </div>

      <!-- Support Section -->
      <div class="support-section">
        <h3>📞 Produkt-Support</h3>
        <div class="support-grid">
          <div class="support-item">
            <p><strong>Hersteller-Support:</strong></p>
            <p>Siehe Produkt-Dokumentation</p>
          </div>
          <div class="support-item">
            <p><strong>SoftwareKing24 Support:</strong></p>
            <p>📧 support@softwareking24.de</p>
          </div>
          <div class="support-item">
            <p><strong>Telefon-Support:</strong></p>
            <p>📞 01-7144889642</p>
          </div>
          <div class="support-item">
            <p><strong>Online-Portal:</strong></p>
            <p>🌐 softwareking24.de</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="footer-grid">
          <div class="footer-section">
            <h4>HÄNDLER</h4>
            <p><strong>SoftwareKing24.de</strong></p>
            <p>Baumschulenweg 17</p>
            <p>D-04838 Roppitzau</p>
            <p>Deutschland</p>
          </div>
          <div class="footer-section">
            <h4>KONTAKT</h4>
            <p>E-Mail: support@softwareking24.de</p>
            <p>Web: softwareking24.de</p>
            <p>Tel: 01-7144889642</p>
          </div>
          <div class="footer-section">
            <h4>STEUERINFORMATIONEN</h4>
            <p>Umsatzsteuer-ID: DE4530454724</p>
            <p>Steuernummer: 11G239038328</p>
            <p>Handelsregister: Amtsgericht Leipzig</p>
          </div>
        </div>
        <p class="footer-note">Dieses Zertifikat wurde elektronisch erstellt und ist ohne Unterschrift gültig. © ${new Date().getFullYear()} SoftwareKing24. Alle Rechte vorbehalten.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};
