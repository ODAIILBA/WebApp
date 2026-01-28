import type { FC } from 'hono/jsx'

export const AdminCertificates: FC = () => {
  return (
    <div class="admin-certificates">
      <div class="admin-header">
        <h2><i class="fas fa-certificate"></i> License Certificate Management</h2>
        <button class="btn-primary" onclick="generateCertificate()">
          <i class="fas fa-plus"></i> Generate Certificate
        </button>
      </div>

      {/* Certificate Templates */}
      <div class="admin-card" style="margin-bottom: 20px;">
        <h3>Certificate Templates</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px;">
          <div class="template-card" onclick="selectTemplate('professional')">
            <div class="template-preview" style="background: linear-gradient(135deg, #1a2a4e 0%, #2a4a7e 100%);">
              <i class="fas fa-award" style="font-size: 48px; color: #d4af37;"></i>
              <h4 style="color: white; margin-top: 10px;">Professional</h4>
            </div>
            <p>Professional certificate with company branding</p>
          </div>
          <div class="template-card" onclick="selectTemplate('modern')">
            <div class="template-preview" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
              <i class="fas fa-certificate" style="font-size: 48px; color: white;"></i>
              <h4 style="color: white; margin-top: 10px;">Modern</h4>
            </div>
            <p>Modern design with gradient background</p>
          </div>
          <div class="template-card" onclick="selectTemplate('classic')">
            <div class="template-preview" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
              <i class="fas fa-scroll" style="font-size: 48px; color: white;"></i>
              <h4 style="color: white; margin-top: 10px;">Classic</h4>
            </div>
            <p>Classic certificate with border design</p>
          </div>
          <div class="template-card" onclick="openTemplateEditor()">
            <div class="template-preview" style="background: #f8f9fa; border: 2px dashed #ddd;">
              <i class="fas fa-code" style="font-size: 48px; color: #6c757d;"></i>
              <h4 style="color: #6c757d; margin-top: 10px;">Custom</h4>
            </div>
            <p>Create custom HTML template</p>
          </div>
        </div>
      </div>

      {/* Recent Certificates */}
      <div class="admin-card">
        <h3>Recent Certificates</h3>
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Certificate ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>License Key</th>
                <th>Generated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="certificates-tbody"></tbody>
          </table>
        </div>
      </div>

      {/* Certificate Generator Modal */}
      <div id="certificate-modal" class="modal">
        <div class="modal-content" style="max-width: 1200px;">
          <div class="modal-header">
            <h3><i class="fas fa-certificate"></i> Generate License Certificate</h3>
            <button class="modal-close" onclick="closeCertificateModal()">&times;</button>
          </div>
          <div class="modal-body">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
              {/* Left: Certificate Form */}
              <div>
                <h4>Certificate Details</h4>
                <div class="form-group">
                  <label>Template</label>
                  <select id="cert-template" class="form-control" onchange="updateCertificatePreview()">
                    <option value="professional">Professional</option>
                    <option value="modern">Modern</option>
                    <option value="classic">Classic</option>
                    <option value="custom">Custom HTML</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Customer Name</label>
                  <input type="text" id="cert-customer" class="form-control" placeholder="Max Mustermann" onchange="updateCertificatePreview()" />
                </div>
                <div class="form-group">
                  <label>Customer Email</label>
                  <input type="email" id="cert-email" class="form-control" placeholder="max@example.com" onchange="updateCertificatePreview()" />
                </div>
                <div class="form-group">
                  <label>Product Name</label>
                  <input type="text" id="cert-product" class="form-control" placeholder="Microsoft Office 2021 Professional" onchange="updateCertificatePreview()" />
                </div>
                <div class="form-group">
                  <label>License Key</label>
                  <input type="text" id="cert-license" class="form-control" placeholder="XXXXX-XXXXX-XXXXX-XXXXX" onchange="updateCertificatePreview()" />
                </div>
                <div class="form-group">
                  <label>Issue Date</label>
                  <input type="date" id="cert-date" class="form-control" onchange="updateCertificatePreview()" />
                </div>
                <div class="form-group">
                  <label>Expiry Date (optional)</label>
                  <input type="date" id="cert-expiry" class="form-control" onchange="updateCertificatePreview()" />
                </div>
                <div class="form-group">
                  <label>Certificate Number</label>
                  <input type="text" id="cert-number" class="form-control" placeholder="CERT-2024-001" onchange="updateCertificatePreview()" />
                </div>
                
                <div style="margin-top: 20px;">
                  <button class="btn-primary" onclick="downloadCertificate()">
                    <i class="fas fa-download"></i> Download PDF
                  </button>
                  <button class="btn-success" onclick="emailCertificate()">
                    <i class="fas fa-envelope"></i> Email to Customer
                  </button>
                </div>
              </div>

              {/* Right: Preview */}
              <div>
                <h4>Certificate Preview</h4>
                <div id="certificate-preview" style="border: 1px solid #ddd; background: white; min-height: 600px; overflow-y: auto;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HTML Template Editor Modal */}
      <div id="template-editor-modal" class="modal">
        <div class="modal-content" style="max-width: 1400px;">
          <div class="modal-header">
            <h3><i class="fas fa-code"></i> Certificate Template Editor</h3>
            <button class="modal-close" onclick="closeTemplateEditor()">&times;</button>
          </div>
          <div class="modal-body">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              {/* HTML Editor */}
              <div>
                <h4>HTML Template</h4>
                <p style="font-size: 12px; color: #666; margin-bottom: 10px;">
                  Available variables: {'{'}{'{'} customerName {'}'}{'}'},  {'{'}{'{'} customerEmail {'}'}{'}'},  {'{'}{'{'} productName {'}'}{'}'},  {'{'}{'{'} licenseKey {'}'}{'}'},  {'{'}{'{'} issueDate {'}'}{'}'},  {'{'}{'{'} expiryDate {'}'}{'}'},  {'{'}{'{'} certificateNumber {'}'}{'}'} 
                </p>
                <textarea 
                  id="template-html" 
                  class="code-editor"
                  rows="25"
                  spellcheck="false"
                ></textarea>
                <div style="margin-top: 10px;">
                  <button class="btn-primary" onclick="previewCustomTemplate()">
                    <i class="fas fa-eye"></i> Preview Template
                  </button>
                  <button class="btn-success" onclick="saveCustomTemplate()">
                    <i class="fas fa-save"></i> Save Template
                  </button>
                  <button class="btn-secondary" onclick="loadTemplateExample('professional')">
                    <i class="fas fa-file-code"></i> Load Example
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div>
                <h4>Template Preview</h4>
                <div id="template-preview" style="border: 1px solid #ddd; background: white; min-height: 600px; overflow-y: auto;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-certificates {
          padding: 20px;
        }
        .template-card {
          border: 2px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .template-card:hover {
          border-color: #d4af37;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
        .template-preview {
          height: 150px;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }
        .certificate-preview-container {
          background: white;
          padding: 40px;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        let certificatesData = [];
        let customTemplate = '';
        
        // Certificate Templates
        const certificateTemplates = {
          professional: \`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; padding: 0; font-family: 'Georgia', serif; }
    .certificate {
      width: 800px;
      height: 600px;
      margin: 0 auto;
      padding: 60px;
      background: linear-gradient(135deg, #1a2a4e 0%, #2a4a7e 100%);
      border: 15px solid #d4af37;
      box-sizing: border-box;
      position: relative;
    }
    .certificate::before {
      content: '';
      position: absolute;
      top: 30px;
      left: 30px;
      right: 30px;
      bottom: 30px;
      border: 2px solid rgba(212, 175, 55, 0.5);
    }
    .header {
      text-align: center;
      color: #d4af37;
      margin-bottom: 40px;
      position: relative;
      z-index: 1;
    }
    .header h1 {
      margin: 0;
      font-size: 42px;
      font-weight: bold;
      letter-spacing: 2px;
    }
    .header .subtitle {
      font-size: 18px;
      margin-top: 10px;
      letter-spacing: 4px;
    }
    .content {
      text-align: center;
      color: white;
      position: relative;
      z-index: 1;
    }
    .content .label {
      font-size: 14px;
      color: #d4af37;
      margin-top: 30px;
      margin-bottom: 5px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .content .value {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .license-key {
      font-size: 24px !important;
      color: #d4af37 !important;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
      padding: 15px;
      background: rgba(255,255,255,0.1);
      border-radius: 5px;
      margin: 20px 0;
    }
    .footer {
      position: absolute;
      bottom: 60px;
      left: 60px;
      right: 60px;
      display: flex;
      justify-content: space-between;
      color: white;
      font-size: 12px;
    }
    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 120px;
      color: rgba(212, 175, 55, 0.1);
      z-index: 0;
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="watermark">★</div>
    <div class="header">
      <h1>LIZENZ-ZERTIFIKAT</h1>
      <div class="subtitle">PREMIUM SOFTWARE STORE</div>
    </div>
    <div class="content">
      <div class="label">Dieses Zertifikat wird ausgestellt für</div>
      <div class="value">{{customerName}}</div>
      <div class="value" style="font-size: 16px; color: #d4af37;">{{customerEmail}}</div>
      
      <div class="label" style="margin-top: 30px;">Produkt</div>
      <div class="value">{{productName}}</div>
      
      <div class="label">Lizenzschlüssel</div>
      <div class="license-key">{{licenseKey}}</div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
        <div>
          <div class="label">Ausstellungsdatum</div>
          <div class="value">{{issueDate}}</div>
        </div>
        {{#if expiryDate}}
        <div>
          <div class="label">Gültig bis</div>
          <div class="value">{{expiryDate}}</div>
        </div>
        {{/if}}
      </div>
    </div>
    <div class="footer">
      <div>Zertifikat Nr: {{certificateNumber}}</div>
      <div>Premium Software Store GmbH</div>
    </div>
  </div>
</body>
</html>
\`,
          modern: \`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; padding: 0; font-family: 'Arial', sans-serif; background: #f5f5f5; }
    .certificate {
      width: 800px;
      height: 600px;
      margin: 0 auto;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
      overflow: hidden;
    }
    .bg-pattern {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.1;
      background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.5) 10px, rgba(255,255,255,.5) 20px);
    }
    .content-wrapper {
      position: relative;
      z-index: 1;
      padding: 60px;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .header {
      text-align: center;
      color: white;
      margin-bottom: 50px;
    }
    .header h1 {
      font-size: 48px;
      margin: 0;
      font-weight: 300;
      letter-spacing: 8px;
    }
    .main-content {
      background: white;
      border-radius: 15px;
      padding: 40px;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    }
    .badge {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 36px;
    }
    .customer-name {
      font-size: 32px;
      color: #333;
      margin: 20px 0;
      font-weight: bold;
    }
    .product-name {
      font-size: 20px;
      color: #764ba2;
      margin: 15px 0;
    }
    .license-box {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      font-family: 'Courier New', monospace;
      font-size: 18px;
      color: #333;
      letter-spacing: 2px;
    }
    .meta-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-top: 20px;
      font-size: 14px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="bg-pattern"></div>
    <div class="content-wrapper">
      <div class="header">
        <h1>CERTIFICATE</h1>
      </div>
      <div class="main-content">
        <div class="badge">★</div>
        <div style="font-size: 14px; color: #999; text-transform: uppercase; letter-spacing: 2px;">Dieses Zertifikat wird verliehen an</div>
        <div class="customer-name">{{customerName}}</div>
        <div style="font-size: 14px; color: #999;">{{customerEmail}}</div>
        <div class="product-name">{{productName}}</div>
        <div class="license-box">{{licenseKey}}</div>
        <div class="meta-info">
          <div><strong>Ausgestellt:</strong> {{issueDate}}</div>
          {{#if expiryDate}}
          <div><strong>Gültig bis:</strong> {{expiryDate}}</div>
          {{/if}}
          <div><strong>Zertifikat:</strong> {{certificateNumber}}</div>
          <div><strong>Aussteller:</strong> Premium Software Store</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
\`,
          classic: \`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; padding: 0; font-family: 'Times New Roman', serif; background: #fff; }
    .certificate {
      width: 800px;
      height: 600px;
      margin: 0 auto;
      padding: 40px;
      background: linear-gradient(to bottom, #fff9e6 0%, #ffffff 100%);
      border: 20px solid;
      border-image: repeating-linear-gradient(45deg, #f093fb, #f093fb 10px, #f5576c 10px, #f5576c 20px) 20;
      box-sizing: border-box;
      position: relative;
    }
    .inner-border {
      border: 3px double #f5576c;
      height: 100%;
      padding: 30px;
      box-sizing: border-box;
    }
    .ornament {
      text-align: center;
      color: #f5576c;
      font-size: 48px;
      margin: 20px 0;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      font-size: 42px;
      color: #f5576c;
      margin: 10px 0;
      text-transform: uppercase;
      letter-spacing: 4px;
    }
    .content {
      text-align: center;
      line-height: 1.8;
    }
    .fancy-text {
      font-size: 18px;
      color: #333;
      margin: 15px 0;
    }
    .customer-name {
      font-size: 36px;
      color: #f093fb;
      font-weight: bold;
      margin: 20px 0;
      text-decoration: underline;
      text-decoration-color: #f5576c;
    }
    .product-name {
      font-size: 24px;
      color: #333;
      font-style: italic;
      margin: 20px 0;
    }
    .license-frame {
      border: 2px solid #f5576c;
      background: rgba(240, 147, 251, 0.1);
      padding: 15px;
      margin: 20px auto;
      display: inline-block;
      font-family: 'Courier New', monospace;
      font-size: 20px;
      letter-spacing: 3px;
    }
    .footer {
      margin-top: 30px;
      display: flex;
      justify-content: space-around;
      font-size: 14px;
      color: #666;
    }
    .signature-line {
      border-top: 2px solid #333;
      width: 200px;
      margin-top: 40px;
      padding-top: 10px;
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="inner-border">
      <div class="ornament">❧</div>
      <div class="header">
        <h1>Lizenz-Zertifikat</h1>
        <div style="font-size: 16px; color: #666; letter-spacing: 2px;">PREMIUM SOFTWARE STORE</div>
      </div>
      <div class="content">
        <div class="fancy-text">Hiermit wird bescheinigt, dass</div>
        <div class="customer-name">{{customerName}}</div>
        <div class="fancy-text">berechtigt ist zur Nutzung von</div>
        <div class="product-name">{{productName}}</div>
        <div style="margin: 30px 0;">
          <div style="font-size: 14px; color: #666; margin-bottom: 10px;">LIZENZSCHLÜSSEL</div>
          <div class="license-frame">{{licenseKey}}</div>
        </div>
        <div class="footer">
          <div>
            <div style="font-weight: bold;">Ausgestellt am</div>
            <div>{{issueDate}}</div>
          </div>
          {{#if expiryDate}}
          <div>
            <div style="font-weight: bold;">Gültig bis</div>
            <div>{{expiryDate}}</div>
          </div>
          {{/if}}
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <div class="signature-line">
            <div style="font-size: 12px; color: #999;">Premium Software Store GmbH</div>
            <div style="font-size: 10px; color: #999;">Zertifikat: {{certificateNumber}}</div>
          </div>
        </div>
      </div>
      <div class="ornament">❧</div>
    </div>
  </div>
</body>
</html>
\`
        };
        
        function loadCertificates() {
          // Demo certificates
          certificatesData = [
            {
              id: 1,
              certificateNumber: 'CERT-2024-001',
              customer: 'Max Mustermann',
              product: 'Microsoft Office 2021 Professional',
              licenseKey: 'XXXXX-XXXXX-XXXXX-XXXXX',
              generated: '2024-01-15'
            },
            {
              id: 2,
              certificateNumber: 'CERT-2024-002',
              customer: 'Anna Schmidt',
              product: 'Windows 11 Pro',
              licenseKey: 'YYYYY-YYYYY-YYYYY-YYYYY',
              generated: '2024-01-20'
            }
          ];
          
          renderCertificates(certificatesData);
          customTemplate = localStorage.getItem('customCertificateTemplate') || certificateTemplates.professional;
        }
        
        function renderCertificates(certs) {
          const tbody = document.getElementById('certificates-tbody');
          tbody.innerHTML = certs.map(cert => \`
            <tr>
              <td><strong>\${cert.certificateNumber}</strong></td>
              <td>\${cert.customer}</td>
              <td>\${cert.product}</td>
              <td><code>\${cert.licenseKey}</code></td>
              <td>\${new Date(cert.generated).toLocaleDateString('de-DE')}</td>
              <td>
                <button class="action-btn btn-view" onclick="viewCertificate(\${cert.id})">
                  <i class="fas fa-eye"></i> View
                </button>
                <button class="action-btn" style="background: #17a2b8; color: white;" onclick="downloadCert(\${cert.id})">
                  <i class="fas fa-download"></i> PDF
                </button>
              </td>
            </tr>
          \`).join('');
        }
        
        function selectTemplate(templateName) {
          document.getElementById('cert-template').value = templateName;
          generateCertificate();
        }
        
        function generateCertificate() {
          // Set default values
          document.getElementById('cert-customer').value = 'Max Mustermann';
          document.getElementById('cert-email').value = 'max@example.com';
          document.getElementById('cert-product').value = 'Microsoft Office 2021 Professional';
          document.getElementById('cert-license').value = 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX';
          document.getElementById('cert-date').value = new Date().toISOString().split('T')[0];
          document.getElementById('cert-number').value = 'CERT-' + new Date().getFullYear() + '-' + String(certificatesData.length + 1).padStart(3, '0');
          
          document.getElementById('certificate-modal').style.display = 'block';
          updateCertificatePreview();
        }
        
        function updateCertificatePreview() {
          const templateName = document.getElementById('cert-template').value;
          const template = templateName === 'custom' ? customTemplate : certificateTemplates[templateName];
          
          const data = {
            customerName: document.getElementById('cert-customer').value || 'Customer Name',
            customerEmail: document.getElementById('cert-email').value || 'email@example.com',
            productName: document.getElementById('cert-product').value || 'Product Name',
            licenseKey: document.getElementById('cert-license').value || 'XXXXX-XXXXX-XXXXX-XXXXX',
            issueDate: document.getElementById('cert-date').value ? new Date(document.getElementById('cert-date').value).toLocaleDateString('de-DE') : new Date().toLocaleDateString('de-DE'),
            expiryDate: document.getElementById('cert-expiry').value ? new Date(document.getElementById('cert-expiry').value).toLocaleDateString('de-DE') : '',
            certificateNumber: document.getElementById('cert-number').value || 'CERT-2024-001'
          };
          
          const html = renderCertificateTemplate(template, data);
          document.getElementById('certificate-preview').innerHTML = html;
        }
        
        function renderCertificateTemplate(template, data) {
          let html = template;
          
          // Replace variables
          html = html.replace(/{{customerName}}/g, data.customerName);
          html = html.replace(/{{customerEmail}}/g, data.customerEmail);
          html = html.replace(/{{productName}}/g, data.productName);
          html = html.replace(/{{licenseKey}}/g, data.licenseKey);
          html = html.replace(/{{issueDate}}/g, data.issueDate);
          html = html.replace(/{{certificateNumber}}/g, data.certificateNumber);
          
          // Handle conditional expiry date
          if (data.expiryDate) {
            html = html.replace(/{{#if expiryDate}}([\\s\\S]*?){{\/if}}/g, '$1');
            html = html.replace(/{{expiryDate}}/g, data.expiryDate);
          } else {
            html = html.replace(/{{#if expiryDate}}[\\s\\S]*?{{\/if}}/g, '');
          }
          
          return html;
        }
        
        function closeCertificateModal() {
          document.getElementById('certificate-modal').style.display = 'none';
        }
        
        function downloadCertificate() {
          alert('Download certificate as PDF - Feature requires PDF generation library');
        }
        
        function emailCertificate() {
          const email = document.getElementById('cert-email').value;
          alert('Email certificate to: ' + email + '\\n\\nThis feature will send the certificate via email.');
        }
        
        function viewCertificate(id) {
          alert('View certificate #' + id);
        }
        
        function downloadCert(id) {
          alert('Download certificate #' + id + ' as PDF');
        }
        
        // Template Editor Functions
        function openTemplateEditor() {
          document.getElementById('template-html').value = customTemplate;
          document.getElementById('template-editor-modal').style.display = 'block';
          previewCustomTemplate();
        }
        
        function closeTemplateEditor() {
          document.getElementById('template-editor-modal').style.display = 'none';
        }
        
        function previewCustomTemplate() {
          const templateHtml = document.getElementById('template-html').value;
          const sampleData = {
            customerName: 'Max Mustermann',
            customerEmail: 'max@example.com',
            productName: 'Microsoft Office 2021 Professional',
            licenseKey: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
            issueDate: new Date().toLocaleDateString('de-DE'),
            expiryDate: new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString('de-DE'),
            certificateNumber: 'CERT-2024-001'
          };
          
          const html = renderCertificateTemplate(templateHtml, sampleData);
          document.getElementById('template-preview').innerHTML = html;
        }
        
        function saveCustomTemplate() {
          const templateHtml = document.getElementById('template-html').value;
          customTemplate = templateHtml;
          localStorage.setItem('customCertificateTemplate', templateHtml);
          alert('Custom template saved successfully!');
          closeTemplateEditor();
        }
        
        function loadTemplateExample(templateName) {
          const template = certificateTemplates[templateName] || certificateTemplates.professional;
          document.getElementById('template-html').value = template;
          previewCustomTemplate();
        }
        
        // Initialize
        loadCertificates();
      ` }} ></script>
    </div>
  )
}
