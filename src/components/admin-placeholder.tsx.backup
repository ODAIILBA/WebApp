// Universal Admin Placeholder Page
// Handles all unimplemented admin routes with a professional "Coming Soon" interface

import { AdminSidebarAdvanced } from './admin-sidebar-advanced'

export function AdminPlaceholder(routePath: string, pageTitle: string) {
  // Extract category and feature from path
  const pathParts = routePath.split('/').filter(Boolean);
  const category = pathParts[1] || 'admin';
  const feature = pathParts.slice(2).join(' / ') || 'Overview';
  
  // Determine icon based on category
  const categoryIcons: Record<string, string> = {
    'dashboard': 'tachometer-alt',
    'products': 'box-open',
    'orders': 'shopping-cart',
    'licenses': 'key',
    'customers': 'users',
    'design': 'palette',
    'marketing': 'bullhorn',
    'analytics': 'chart-bar',
    'payments': 'credit-card',
    'cookies': 'cookie-bite',
    'security': 'shield-alt',
    'users': 'users-cog',
    'support': 'headset',
    'settings': 'cog',
    'default': 'wrench'
  };
  
  const icon = categoryIcons[category] || categoryIcons['default'];
  
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${pageTitle} - Admin - SOFTWAREKING24</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
      <style>
        :root {
          --navy-dark: #1a2a4e;
          --gold: #d4af37;
        }
        
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: #f5f7fa;
        }
        
        .admin-content {
          margin-left: 280px;
          min-height: 100vh;
          padding: 2rem;
        }
        
        body.sidebar-collapsed .admin-content {
          margin-left: 60px;
        }
        
        .placeholder-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 0;
        }
        
        .placeholder-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.07);
          padding: 4rem 2rem;
          text-align: center;
        }
        
        .icon-circle {
          width: 120px;
          height: 120px;
          margin: 0 auto 2rem;
          background: linear-gradient(135deg, rgba(26, 42, 78, 0.05), rgba(212, 175, 55, 0.1));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        
        .icon-circle i {
          font-size: 3rem;
          color: var(--navy-dark);
        }
        
        .category-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: rgba(212, 175, 55, 0.1);
          color: var(--gold);
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }
        
        h1 {
          font-size: 2.5rem;
          color: var(--navy-dark);
          margin: 1rem 0;
          font-weight: 700;
        }
        
        .subtitle {
          font-size: 1.125rem;
          color: #6b7280;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #fef3c7;
          color: #92400e;
          border-radius: 9999px;
          font-weight: 600;
          margin: 2rem 0;
        }
        
        .status-pill i {
          animation: spin 2s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin: 3rem 0;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .info-card {
          background: #f9fafb;
          padding: 1.5rem;
          border-radius: 12px;
          text-align: left;
        }
        
        .info-card-icon {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          color: var(--gold);
        }
        
        .info-card h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--navy-dark);
          margin: 0 0 0.5rem 0;
        }
        
        .info-card p {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
          line-height: 1.6;
        }
        
        .action-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 3rem;
        }
        
        .btn {
          padding: 0.875rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-primary {
          background: var(--navy-dark);
          color: white;
        }
        
        .btn-primary:hover {
          background: #2a3b5e;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(26, 42, 78, 0.3);
        }
        
        .btn-secondary {
          background: white;
          color: var(--navy-dark);
          border: 2px solid #e5e7eb;
        }
        
        .btn-secondary:hover {
          border-color: var(--gold);
          color: var(--gold);
        }
        
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6b7280;
          font-size: 0.875rem;
          margin-bottom: 2rem;
        }
        
        .breadcrumb a {
          color: var(--navy-dark);
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .breadcrumb a:hover {
          color: var(--gold);
        }
        
        @media (max-width: 768px) {
          .admin-content {
            margin-left: 0;
            padding: 1rem;
          }
          
          h1 {
            font-size: 1.875rem;
          }
          
          .info-grid {
            grid-template-columns: 1fr;
          }
          
          .action-buttons {
            flex-direction: column;
          }
        }
      </style>
    </head>
    <body>
      ${AdminSidebarAdvanced(routePath)}
      
      <div class="admin-content">
        <div class="placeholder-container">
          <!-- Breadcrumb -->
          <div class="breadcrumb">
            <a href="/admin"><i class="fas fa-home"></i> Admin</a>
            <i class="fas fa-chevron-right"></i>
            <span>${category.charAt(0).toUpperCase() + category.slice(1)}</span>
            ${feature ? `<i class="fas fa-chevron-right"></i><span>${feature.charAt(0).toUpperCase() + feature.slice(1)}</span>` : ''}
          </div>
          
          <div class="placeholder-card">
            <!-- Icon -->
            <div class="icon-circle">
              <i class="fas fa-${icon}"></i>
            </div>
            
            <!-- Category Badge -->
            <div class="category-badge">
              <i class="fas fa-${icon} mr-2"></i>${category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
            
            <!-- Title -->
            <h1>${pageTitle}</h1>
            
            <!-- Subtitle -->
            <p class="subtitle">
              Diese Funktion wird derzeit entwickelt und steht in Kürze zur Verfügung.
              Alle geplanten Features sind in Vorbereitung.
            </p>
            
            <!-- Status -->
            <div class="status-pill">
              <i class="fas fa-cog"></i>
              <span>In Entwicklung</span>
            </div>
            
            <!-- Info Cards -->
            <div class="info-grid">
              <div class="info-card">
                <div class="info-card-icon">
                  <i class="fas fa-check-circle"></i>
                </div>
                <h3>Geplante Features</h3>
                <p>Alle Funktionen aus der Spezifikation werden implementiert</p>
              </div>
              
              <div class="info-card">
                <div class="info-card-icon">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <h3>Enterprise-Ready</h3>
                <p>Professionelle Lösung mit höchsten Sicherheitsstandards</p>
              </div>
              
              <div class="info-card">
                <div class="info-card-icon">
                  <i class="fas fa-bolt"></i>
                </div>
                <h3>Performance</h3>
                <p>Optimiert für hohe Geschwindigkeit und Skalierbarkeit</p>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="action-buttons">
              <a href="/admin" class="btn btn-primary">
                <i class="fas fa-arrow-left"></i>
                Zurück zum Dashboard
              </a>
              <a href="/admin/v2" class="btn btn-secondary">
                <i class="fas fa-th-large"></i>
                Alle Features anzeigen
              </a>
            </div>
          </div>
          
          <!-- Additional Info -->
          <div style="text-align: center; margin-top: 2rem; color: #9ca3af; font-size: 0.875rem;">
            <p>
              <i class="fas fa-info-circle"></i>
              Route: <code style="background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 4px;">${routePath}</code>
            </p>
            <p style="margin-top: 0.5rem;">
              Diese Seite wird automatisch durch das Admin-System bereitgestellt.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
