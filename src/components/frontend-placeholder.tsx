// Universal Frontend Placeholder Component
// Professional "Coming Soon" page for unimplemented frontend routes

export function FrontendPlaceholder(routePath: string, pageTitle: string) {
  const isUserPanel = routePath.startsWith('/account') || routePath.startsWith('/my-');
  
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${pageTitle} - SOFTWAREKING24</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
      <style>
        :root {
          --navy-dark: #1a2a4e;
          --gold: #d4af37;
        }
        
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }
        
        .navbar {
          background: var(--navy-dark);
          color: white;
          padding: 1rem 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .navbar-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--gold);
          text-decoration: none;
        }
        
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        
        .nav-links a {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .nav-links a:hover {
          color: var(--gold);
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }
        
        .hero-card {
          background: white;
          border-radius: 24px;
          padding: 4rem 3rem;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }
        
        .icon-wrapper {
          width: 140px;
          height: 140px;
          margin: 0 auto 2rem;
          background: linear-gradient(135deg, rgba(26, 42, 78, 0.05), rgba(212, 175, 55, 0.15));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .icon-wrapper i {
          font-size: 4rem;
          background: linear-gradient(135deg, var(--navy-dark), var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .badge {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.2));
          color: var(--gold);
          border-radius: 25px;
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1.5rem;
        }
        
        h1 {
          font-size: 3rem;
          color: var(--navy-dark);
          margin: 0 0 1rem 0;
          font-weight: 800;
          line-height: 1.2;
        }
        
        .subtitle {
          font-size: 1.25rem;
          color: #6b7280;
          margin-bottom: 3rem;
          line-height: 1.6;
        }
        
        .status-bar {
          background: #fef3c7;
          border-left: 4px solid #fbbf24;
          padding: 1.5rem;
          border-radius: 12px;
          margin: 3rem 0;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .status-bar i {
          font-size: 2rem;
          color: #f59e0b;
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        .status-text {
          text-align: left;
          flex: 1;
        }
        
        .status-text h3 {
          margin: 0 0 0.5rem 0;
          color: #92400e;
          font-size: 1.125rem;
          font-weight: 700;
        }
        
        .status-text p {
          margin: 0;
          color: #78350f;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }
        
        .feature-card {
          background: #f9fafb;
          padding: 2rem;
          border-radius: 16px;
          text-align: left;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.08);
        }
        
        .feature-icon {
          width: 56px;
          height: 56px;
          background: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .feature-icon i {
          font-size: 1.75rem;
          color: var(--gold);
        }
        
        .feature-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--navy-dark);
          margin: 0 0 0.75rem 0;
        }
        
        .feature-card p {
          font-size: 0.9375rem;
          color: #6b7280;
          margin: 0;
          line-height: 1.6;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 3rem;
          flex-wrap: wrap;
        }
        
        .btn {
          padding: 1rem 2.5rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.0625rem;
          text-decoration: none;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, var(--navy-dark), #2a3b5e);
          color: white;
          box-shadow: 0 4px 14px rgba(26, 42, 78, 0.4);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(26, 42, 78, 0.5);
        }
        
        .btn-secondary {
          background: white;
          color: var(--navy-dark);
          border: 2px solid #e5e7eb;
        }
        
        .btn-secondary:hover {
          border-color: var(--gold);
          color: var(--gold);
          box-shadow: 0 4px 14px rgba(212, 175, 55, 0.2);
        }
        
        .footer-note {
          text-align: center;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #e5e7eb;
          color: #9ca3af;
          font-size: 0.875rem;
        }
        
        .footer-note code {
          background: #f3f4f6;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-family: 'Monaco', 'Courier New', monospace;
        }
        
        @media (max-width: 768px) {
          h1 { font-size: 2rem; }
          .subtitle { font-size: 1rem; }
          .hero-card { padding: 3rem 1.5rem; }
          .container { padding: 2rem 1rem; }
          .cta-buttons { flex-direction: column; }
          .btn { width: 100%; justify-content: center; }
        }
      </style>
    </head>
    <body>
      <!-- Navigation Bar -->
      <nav class="navbar">
        <div class="navbar-content">
          <a href="/" class="logo">SOFTWAREKING24</a>
          <div class="nav-links">
            <a href="/"><i class="fas fa-home"></i> Home</a>
            <a href="/products"><i class="fas fa-box-open"></i> Produkte</a>
            ${isUserPanel ? '<a href="/account"><i class="fas fa-user"></i> Mein Konto</a>' : '<a href="/cart"><i class="fas fa-shopping-cart"></i> Warenkorb</a>'}
            <a href="/admin"><i class="fas fa-cog"></i> Admin</a>
          </div>
        </div>
      </nav>
      
      <!-- Main Content -->
      <div class="container">
        <div class="hero-card">
          <!-- Icon -->
          <div class="icon-wrapper">
            <i class="fas fa-${isUserPanel ? 'user-circle' : 'rocket'}"></i>
          </div>
          
          <!-- Badge -->
          <div class="badge">
            ${isUserPanel ? 'USER PANEL' : 'FRONTEND'}
          </div>
          
          <!-- Title -->
          <h1>${pageTitle}</h1>
          
          <!-- Subtitle -->
          <p class="subtitle">
            ${isUserPanel 
              ? 'Ihr persönlicher Bereich für Bestellungen, Downloads und Lizenzverwaltung wird gerade eingerichtet.'
              : 'Diese Seite ist Teil unseres umfassenden E-Commerce-Systems und wird derzeit entwickelt.'}
          </p>
          
          <!-- Status Bar -->
          <div class="status-bar">
            <i class="fas fa-tools"></i>
            <div class="status-text">
              <h3>In aktiver Entwicklung</h3>
              <p>Alle Features werden gemäß Enterprise-Standard implementiert</p>
            </div>
          </div>
          
          <!-- Features Grid -->
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h3>Sichere Plattform</h3>
              <p>Höchste Sicherheitsstandards für Ihre Daten und Transaktionen</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-bolt"></i>
              </div>
              <h3>Schnell & Zuverlässig</h3>
              <p>Optimierte Performance auf Cloudflare Edge Network</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <h3>Vollständige Features</h3>
              <p>Alle angekündigten Funktionen werden komplett implementiert</p>
            </div>
          </div>
          
          <!-- CTA Buttons -->
          <div class="cta-buttons">
            <a href="/" class="btn btn-primary">
              <i class="fas fa-home"></i>
              Zur Startseite
            </a>
            ${isUserPanel 
              ? '<a href="/admin" class="btn btn-secondary"><i class="fas fa-cog"></i> Admin Panel</a>'
              : '<a href="/products" class="btn btn-secondary"><i class="fas fa-shopping-bag"></i> Produkte ansehen</a>'}
          </div>
          
          <!-- Footer Note -->
          <div class="footer-note">
            <p>
              <i class="fas fa-map-marker-alt"></i>
              Aktueller Pfad: <code>${routePath}</code>
            </p>
            <p style="margin-top: 0.5rem;">
              Diese Seite wird automatisch bereitgestellt und ist Teil des vollständigen Systems.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
