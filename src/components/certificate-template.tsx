export const CertificateTemplate = (certificate: any) => {
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
  <title>Microsoft Partner Lizenz - ${certificate.product_name}</title>
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
      font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
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
      color: rgba(0, 0, 0, 0.03);
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
    
    .microsoft-partner {
      text-align: right;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 2px solid #00a4ef;
    }
    
    .microsoft-logo {
      width: 120px;
      margin-bottom: 8px;
    }
    
    .partner-info {
      font-size: 8pt;
      color: #333;
      line-height: 1.4;
    }
    
    .partner-info strong {
      display: block;
      font-size: 9pt;
      color: #00a4ef;
      margin-bottom: 3px;
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
      background: #e7f3ff;
      border-radius: 8px;
      border-left: 4px solid #00a4ef;
    }
    
    .support-section h3 {
      font-size: 11pt;
      color: #00a4ef;
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
          <svg width="180" height="50" viewBox="0 0 180 50">
            <text x="10" y="20" font-family="Arial" font-size="18" font-weight="bold" fill="#1a2b5e">SOFTWARE</text>
            <text x="10" y="35" font-family="Arial" font-size="8" fill="#666">Das Original. Direkt. Günstig. Gut.</text>
            <text x="125" y="25" font-family="Arial" font-size="22" font-weight="bold" fill="#f7b500">KING24</text>
            <path d="M 120 10 L 128 2 L 136 10 L 128 18 Z" fill="#f7b500"/>
          </svg>
        </div>
        <div class="microsoft-partner">
          <svg width="120" height="28" viewBox="0 0 120 28">
            <rect x="0" y="0" width="13" height="13" fill="#f25022"/>
            <rect x="14" y="0" width="13" height="13" fill="#7fba00"/>
            <rect x="0" y="14" width="13" height="13" fill="#00a4ef"/>
            <rect x="14" y="14" width="13" height="13" fill="#ffb900"/>
            <text x="32" y="20" font-family="Segoe UI" font-size="14" font-weight="600" fill="#5e5e5e">Microsoft</text>
          </svg>
          <div class="partner-info">
            <strong>MICROSOFT PARTNER LIZENZ</strong>
            <p>Partner-ID: 7027901 | PartnerGlobal</p>
            <p>Partner-ID: 7027901 | PartnerLocation</p>
            <p>USt-IdNr: DE4530454724 | Steuernummer: 11G239038328</p>
          </div>
        </div>
      </div>

      <!-- Certificate Title -->
      <div class="certificate-title">
        <h1>Lizenz-Zertifikat</h1>
        <p>Offizielles Microsoft Partner Lizenzdokument</p>
      </div>

      <!-- Customer Info -->
      <div class="customer-section">
        <h2>Kunde</h2>
        <p><strong>${certificate.customer_name}</strong></p>
        ${certificate.customer_company ? `<p>${certificate.customer_company}</p>` : ''}
        <p>${certificate.customer_address || 'Jakob-Borchers-Str. 3'}</p>
        <p>${certificate.customer_postal || '1-OG'}, ${certificate.customer_city || '20140 Zetel'}</p>
        <p>${certificate.customer_email}</p>
        <p>Tel: ${certificate.customer_phone || '01-7144889642'}</p>
      </div>

      <!-- License Details -->
      <div class="license-details">
        <div class="product-header">
          <div class="product-icon">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <rect x="5" y="5" width="13" height="13" fill="#f25022"/>
              <rect x="22" y="5" width="13" height="13" fill="#7fba00"/>
              <rect x="5" y="22" width="13" height="13" fill="#00a4ef"/>
              <rect x="22" y="22" width="13" height="13" fill="#ffb900"/>
            </svg>
          </div>
          <div class="product-info">
            <h3>${certificate.product_name || 'Microsoft Office 2024 Professional Plus'}</h3>
            <p>MPN ID ${certificate.mpn_id || '7027901'} | Lizenzgeber: <strong>Microsoft</strong></p>
          </div>
        </div>

        <div class="license-grid">
          <div class="license-field">
            <label>Produkt</label>
            <div class="value">${certificate.product_name || 'Microsoft Office 2024 Professional Plus'}</div>
          </div>

          <div class="license-field">
            <label>Vertrag</label>
            <div class="value">MPN ID ${certificate.mpn_id || '7027901'}</div>
          </div>

          <div class="license-field">
            <label>Rechnungsnummer</label>
            <div class="value">${certificate.invoice_number || '793178978149'}</div>
          </div>

          <div class="license-field">
            <label>Rechnungsdatum</label>
            <div class="value">${formatDate(certificate.invoice_date || new Date().toISOString())}</div>
          </div>

          <div class="license-field">
            <label>Bestellnummer</label>
            <div class="value">${certificate.order_number || '793178978149'}</div>
          </div>

          <div class="license-field">
            <label>Bestelldatum</label>
            <div class="value">${formatDate(certificate.order_date || new Date().toISOString())}</div>
          </div>

          <div class="license-key-box">
            <label>⭐ LIZENZSCHLÜSSEL / PRODUCT KEY ⭐</label>
            <div class="value">${certificate.license_key || 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX'}</div>
          </div>
        </div>
      </div>

      <!-- Support Section -->
      <div class="support-section">
        <h3>SUPPORT & LIZENZAKTIVIERUNG</h3>
        <div class="support-grid">
          <div class="support-item">
            <p><strong>Bei Fragen zur Lizenzaktivierung oder technischen Problemen kontaktieren Sie bitte:</strong></p>
            <p>📧 support@softwareking24.de</p>
            <p>🌐 softwareking24.de</p>
            <p>📞 PartnerGlobal</p>
            <p>🆔 Partner-ID: 7027901 | PartnerLocation</p>
          </div>
          <div class="support-item">
            <p><strong>Verwendungszweck:</strong> ${certificate.invoice_number || '793178978149'}</p>
            <p><strong>Gültigkeit:</strong> Diese Lizenz ist dauerhaft gültig.</p>
            <p><strong>Hinweis:</strong> Bewahren Sie dieses Dokument sicher auf. Es dient als Nachweis Ihrer legitimen Softwarelizenz.</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="footer-grid">
          <div class="footer-section">
            <h4>Unternehmensangaben</h4>
            <p><strong>SoftwareKing24.de</strong></p>
            <p>Baumschulenweg 17</p>
            <p>D-04838 Roppitzau</p>
            <p>Umsatzsteuer-ID: DE4530454724</p>
            <p>Steuernummer: 11G239038328</p>
          </div>
          <div class="footer-section">
            <h4>Kontakt</h4>
            <p>support@softwareking24.de</p>
            <p>softwareking24.de</p>
            <p>PartnerGlobal</p>
            <p>Partner-ID: 7027901 | PartnerLocation</p>
          </div>
          <div class="footer-section">
            <h4>Support & Lizenzaktivierung</h4>
            <p>Bei Fragen zur Lizenzaktivierung oder</p>
            <p>technischen Problemen kontaktieren Sie</p>
            <p>unsere Hotline oder den Support.</p>
            <p><strong>Verwendungszweck: ${certificate.invoice_number || '793178978149'}</strong></p>
          </div>
        </div>
        <p class="footer-note">Dieses Lizenzdokument wurde elektronisch erstellt und ist ohne Unterschrift gültig.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};
