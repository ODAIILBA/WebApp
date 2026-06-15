// SOFTWAREKING24 - Promotional Popup
// Shows after 5 seconds on homepage

class PromoPopup {
  constructor() {
    this.hasShown = sessionStorage.getItem('promo_popup_shown');
    this.init();
  }

  init() {
    // Only show once per session
    if (this.hasShown) return;

    // Show after 5 seconds
    setTimeout(() => {
      this.showPopup();
      sessionStorage.setItem('promo_popup_shown', 'true');
    }, 5000);
  }

  showPopup() {
    const popup = this.createPopup();
    document.body.appendChild(popup);
    
    // Animate in
    setTimeout(() => {
      popup.style.opacity = '1';
      const modal = popup.querySelector('.promo-modal');
      if (modal) {
        modal.style.transform = 'scale(1)';
      }
    }, 10);
  }

  createPopup() {
    const overlay = document.createElement('div');
    overlay.id = 'promo-popup';
    overlay.innerHTML = `
      <style>
        #promo-popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .promo-modal {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          max-width: 500px;
          width: 90%;
          position: relative;
          transform: scale(0.8);
          transition: transform 0.3s ease;
          overflow: hidden;
        }

        .promo-header {
          background: linear-gradient(135deg, #1a2a4e 0%, #0f1936 100%);
          color: white;
          text-align: center;
          padding: 2rem 2rem 1rem 2rem;
          position: relative;
        }

        .promo-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid white;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
          transition: all 0.2s;
          z-index: 10;
        }

        .promo-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .promo-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .promo-subtitle {
          font-size: 1.125rem;
          opacity: 0.9;
          margin-bottom: 1rem;
        }

        .promo-discount {
          font-size: 4.5rem;
          font-weight: bold;
          color: #d4af37;
          line-height: 1;
          margin: 0.5rem 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .promo-body {
          padding: 2rem;
          text-align: center;
        }

        .promo-description {
          color: #475569;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .promo-code {
          background: linear-gradient(135deg, #1a2a4e 0%, #0f1936 100%);
          color: white;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1.5rem;
          font-weight: bold;
          letter-spacing: 3px;
          margin-bottom: 1.5rem;
          display: inline-block;
          border: 2px dashed #d4af37;
          font-family: 'Courier New', monospace;
        }

        .promo-details {
          color: #64748b;
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .promo-button {
          background: #d4af37;
          color: #1a2a4e;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-size: 1.125rem;
          font-weight: bold;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
          text-decoration: none;
          display: inline-block;
        }

        .promo-button:hover {
          background: #c19b2e;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
        }

        .promo-tag {
          position: absolute;
          top: 20px;
          right: -35px;
          background: #dc2626;
          color: white;
          padding: 8px 50px;
          transform: rotate(45deg);
          font-weight: bold;
          font-size: 0.875rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          z-index: 5;
        }

        @media (max-width: 640px) {
          .promo-modal {
            width: 95%;
          }

          .promo-discount {
            font-size: 3.5rem;
          }

          .promo-code {
            font-size: 1.25rem;
            padding: 0.75rem 1.5rem;
          }

          .promo-button {
            width: 100%;
            padding: 1rem;
          }
        }
      </style>

      <div class="promo-modal">
        <div class="promo-tag">NEU</div>
        
        <div class="promo-header">
          <button class="promo-close" onclick="window.promoPopup.closePopup()">✕</button>
          
          <div class="promo-title">
            Bestellung fortsetzen und<br/>Geld sparen!
          </div>
          
          <div class="promo-discount">20%</div>
          
          <div class="promo-subtitle">
            Rabatt auf alle Produkte
          </div>
        </div>

        <div class="promo-body">
          <p class="promo-description">
            <strong>20% Rabatt jetzt direkt im Warenkorb</strong> - nur für Microsoft Produkte (Dauerhafte Versionen)
          </p>

          <div class="promo-code">NEWYEAR2026</div>

          <p class="promo-details">
            Gib diesen Gutscheincode im Bestellprozess ein, um dir den <strong>z.B. Rabatt</strong> zu sichern.
          </p>

          <a href="/produkte" class="promo-button">
            🛍️ Jetzt einkaufen
          </a>
        </div>
      </div>
    `;

    return overlay;
  }

  closePopup() {
    const popup = document.getElementById('promo-popup');
    if (popup) {
      popup.style.opacity = '0';
      setTimeout(() => popup.remove(), 300);
    }
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.promoPopup = new PromoPopup();
  });
} else {
  window.promoPopup = new PromoPopup();
}
