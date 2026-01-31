// Modern 3D E-Commerce Body Component
// Premium design for digital license keys webshop

export function ModernEcommerceBody() {
  return `
    <style>
      /* ============================================
         MODERN 3D E-COMMERCE DESIGN SYSTEM
         ============================================ */
      
      /* 3D Variables */
      :root {
        --card-shadow: 0 20px 60px rgba(0, 31, 63, 0.12);
        --card-shadow-hover: 0 30px 80px rgba(0, 31, 63, 0.18);
        --card-lift: translateY(-8px);
        --glass-bg: rgba(255, 255, 255, 0.7);
        --glass-border: rgba(255, 255, 255, 0.18);
      }
      
      /* Smooth Animations */
      * {
        transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
                    box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
                    background 0.3s ease;
      }
      
      /* ============================================
         1. 3D HERO SECTION
         ============================================ */
      
      .hero-3d {
        position: relative;
        min-height: 700px;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        overflow: hidden;
        display: flex;
        align-items: center;
        padding: 80px 0;
      }
      
      .hero-3d::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -20%;
        width: 800px;
        height: 800px;
        background: radial-gradient(circle, rgba(255, 193, 7, 0.08) 0%, transparent 70%);
        border-radius: 50%;
        animation: float 20s ease-in-out infinite;
      }
      
      .hero-content {
        position: relative;
        z-index: 2;
        max-width: 600px;
      }
      
      .hero-3d h1 {
        font-size: 4rem;
        font-weight: 800;
        line-height: 1.1;
        color: var(--navy);
        margin-bottom: 24px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.05);
      }
      
      .hero-3d .subtitle {
        font-size: 1.3rem;
        color: #6c757d;
        margin-bottom: 40px;
        line-height: 1.6;
      }
      
      .hero-badges {
        display: flex;
        gap: 20px;
        margin-bottom: 40px;
        flex-wrap: wrap;
      }
      
      .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        background: white;
        border-radius: 50px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        font-weight: 600;
        color: var(--navy);
        font-size: 0.95rem;
      }
      
      .hero-badge i {
        color: var(--gold);
        font-size: 1.1rem;
      }
      
      /* 3D Floating License Cards */
      .floating-cards {
        position: absolute;
        right: 10%;
        top: 50%;
        transform: translateY(-50%);
        width: 450px;
        height: 500px;
      }
      
      .license-card-3d {
        position: absolute;
        width: 320px;
        height: 180px;
        background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        border-radius: 20px;
        box-shadow: var(--card-shadow);
        padding: 24px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.5);
      }
      
      .license-card-3d:nth-child(1) {
        top: 0;
        left: 0;
        animation: float-card-1 6s ease-in-out infinite;
        z-index: 3;
      }
      
      .license-card-3d:nth-child(2) {
        top: 80px;
        left: 80px;
        animation: float-card-2 6s ease-in-out infinite 2s;
        z-index: 2;
      }
      
      .license-card-3d:nth-child(3) {
        top: 160px;
        left: 40px;
        animation: float-card-3 6s ease-in-out infinite 4s;
        z-index: 1;
      }
      
      .license-card-3d .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
      }
      
      .license-card-3d .brand-logo {
        font-size: 2rem;
        color: var(--navy);
      }
      
      .license-card-3d .instant-badge {
        background: var(--gold);
        color: var(--navy);
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 700;
      }
      
      .license-card-3d h4 {
        font-size: 1.2rem;
        color: var(--navy);
        margin-bottom: 8px;
        font-weight: 700;
      }
      
      .license-card-3d p {
        color: #6c757d;
        font-size: 0.9rem;
        margin-bottom: 16px;
      }
      
      .license-card-3d .price {
        font-size: 1.8rem;
        color: var(--gold);
        font-weight: 800;
      }
      
      @keyframes float {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(-30px, -30px); }
      }
      
      @keyframes float-card-1 {
        0%, 100% { transform: translateY(0) rotate(-2deg); }
        50% { transform: translateY(-20px) rotate(2deg); }
      }
      
      @keyframes float-card-2 {
        0%, 100% { transform: translateY(0) rotate(1deg); }
        50% { transform: translateY(-15px) rotate(-1deg); }
      }
      
      @keyframes float-card-3 {
        0%, 100% { transform: translateY(0) rotate(-1deg); }
        50% { transform: translateY(-10px) rotate(1deg); }
      }
      
      /* ============================================
         2. 3D PRODUCT SLIDER SECTIONS
         ============================================ */
      
      .product-section-3d {
        padding: 100px 0;
        background: white;
        position: relative;
      }
      
      .product-section-3d:nth-child(even) {
        background: #f8f9fa;
      }
      
      .section-header-3d {
        text-align: center;
        margin-bottom: 60px;
      }
      
      .section-header-3d h2 {
        font-size: 3rem;
        font-weight: 800;
        color: var(--navy);
        margin-bottom: 16px;
        position: relative;
        display: inline-block;
      }
      
      .section-header-3d h2::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 4px;
        background: linear-gradient(90deg, transparent, var(--gold), transparent);
      }
      
      .section-header-3d p {
        font-size: 1.2rem;
        color: #6c757d;
        margin-top: 24px;
      }
      
      .product-grid-3d {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 40px;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 20px;
      }
      
      /* 3D Product Card */
      .product-card-3d {
        background: white;
        border-radius: 24px;
        padding: 32px;
        box-shadow: var(--card-shadow);
        position: relative;
        overflow: hidden;
        cursor: pointer;
        border: 1px solid rgba(0,0,0,0.05);
      }
      
      .product-card-3d::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 6px;
        background: linear-gradient(90deg, var(--gold), #FFD54F);
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      .product-card-3d:hover {
        transform: var(--card-lift);
        box-shadow: var(--card-shadow-hover);
      }
      
      .product-card-3d:hover::before {
        opacity: 1;
      }
      
      .product-icon-3d {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, var(--navy) 0%, #003d7a 100%);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;
        box-shadow: 0 10px 30px rgba(0, 31, 63, 0.2);
      }
      
      .product-icon-3d i {
        font-size: 2.5rem;
        color: var(--gold);
      }
      
      .product-card-3d h3 {
        font-size: 1.5rem;
        color: var(--navy);
        margin-bottom: 12px;
        font-weight: 700;
      }
      
      .product-meta {
        display: flex;
        gap: 12px;
        margin-bottom: 16px;
        flex-wrap: wrap;
      }
      
      .meta-tag {
        background: rgba(255, 193, 7, 0.1);
        color: var(--navy);
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 600;
      }
      
      .product-card-3d .description {
        color: #6c757d;
        margin-bottom: 24px;
        line-height: 1.6;
        font-size: 0.95rem;
      }
      
      .product-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: auto;
      }
      
      .price-3d {
        font-size: 2rem;
        color: var(--navy);
        font-weight: 800;
      }
      
      .price-3d .currency {
        font-size: 1.2rem;
        font-weight: 600;
      }
      
      .buy-btn-3d {
        background: var(--gold);
        color: var(--navy);
        padding: 14px 28px;
        border-radius: 12px;
        border: none;
        font-weight: 700;
        cursor: pointer;
        font-size: 0.95rem;
        box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
      }
      
      .buy-btn-3d:hover {
        background: #FFD54F;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 193, 7, 0.4);
      }
      
      /* ============================================
         3. OFFERS & DEALS SECTION (3D GRADIENT)
         ============================================ */
      
      .deals-section-3d {
        padding: 100px 0;
        background: linear-gradient(135deg, var(--navy) 0%, #003d7a 100%);
        position: relative;
        overflow: hidden;
      }
      
      .deals-section-3d::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -20%;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(255, 193, 7, 0.1) 0%, transparent 70%);
        border-radius: 50%;
      }
      
      .deals-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 40px;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 20px;
        position: relative;
        z-index: 2;
      }
      
      .deal-card-3d {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 24px;
        padding: 40px;
        position: relative;
        overflow: hidden;
      }
      
      .deal-card-3d::after {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255, 193, 7, 0.15) 0%, transparent 50%);
        animation: pulse 4s ease-in-out infinite;
      }
      
      .deal-badge {
        position: absolute;
        top: 20px;
        right: 20px;
        background: var(--gold);
        color: var(--navy);
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: 700;
        font-size: 0.9rem;
        box-shadow: 0 4px 15px rgba(255, 193, 7, 0.4);
      }
      
      .deal-card-3d h3 {
        color: white;
        font-size: 2rem;
        margin-bottom: 16px;
        font-weight: 700;
        position: relative;
        z-index: 2;
      }
      
      .deal-card-3d p {
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: 24px;
        line-height: 1.6;
        position: relative;
        z-index: 2;
      }
      
      .deal-price {
        display: flex;
        align-items: baseline;
        gap: 16px;
        margin-bottom: 24px;
        position: relative;
        z-index: 2;
      }
      
      .deal-price .old-price {
        font-size: 1.5rem;
        color: rgba(255, 255, 255, 0.5);
        text-decoration: line-through;
      }
      
      .deal-price .new-price {
        font-size: 2.5rem;
        color: var(--gold);
        font-weight: 800;
      }
      
      .deal-cta {
        background: white;
        color: var(--navy);
        padding: 16px 32px;
        border-radius: 12px;
        border: none;
        font-weight: 700;
        cursor: pointer;
        width: 100%;
        font-size: 1.1rem;
        position: relative;
        z-index: 2;
      }
      
      .deal-cta:hover {
        background: var(--gold);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 193, 7, 0.4);
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      /* ============================================
         4. TRUST & SECURITY SECTION (3D BADGES)
         ============================================ */
      
      .trust-section-3d {
        padding: 100px 0;
        background: white;
      }
      
      .trust-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 40px;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }
      
      .trust-card-3d {
        text-align: center;
        padding: 40px 20px;
        background: white;
        border-radius: 20px;
        box-shadow: var(--card-shadow);
        position: relative;
        overflow: hidden;
      }
      
      .trust-card-3d::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, var(--gold), #FFD54F);
      }
      
      .trust-icon-3d {
        width: 100px;
        height: 100px;
        margin: 0 auto 24px;
        background: linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      
      .trust-icon-3d::after {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        border: 2px solid rgba(255, 193, 7, 0.2);
        border-radius: 50%;
      }
      
      .trust-icon-3d i {
        font-size: 3rem;
        color: var(--gold);
      }
      
      .trust-card-3d h4 {
        font-size: 1.3rem;
        color: var(--navy);
        margin-bottom: 12px;
        font-weight: 700;
      }
      
      .trust-card-3d p {
        color: #6c757d;
        line-height: 1.6;
      }
      
      .trust-card-3d:hover {
        transform: var(--card-lift);
        box-shadow: var(--card-shadow-hover);
      }
      
      /* ============================================
         5. HOW IT WORKS (3D STEP CARDS)
         ============================================ */
      
      .how-it-works-3d {
        padding: 100px 0;
        background: #f8f9fa;
        position: relative;
      }
      
      .steps-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        position: relative;
      }
      
      .step-card-3d {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px;
        align-items: center;
        margin-bottom: 80px;
        position: relative;
      }
      
      .step-card-3d:nth-child(even) {
        direction: rtl;
      }
      
      .step-card-3d:nth-child(even) > * {
        direction: ltr;
      }
      
      .step-number-3d {
        width: 120px;
        height: 120px;
        background: linear-gradient(135deg, var(--gold) 0%, #FFD54F 100%);
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4rem;
        font-weight: 800;
        color: var(--navy);
        box-shadow: 0 20px 60px rgba(255, 193, 7, 0.3);
        margin-bottom: 24px;
        transform: rotate(-5deg);
      }
      
      .step-content h3 {
        font-size: 2rem;
        color: var(--navy);
        margin-bottom: 16px;
        font-weight: 700;
      }
      
      .step-content p {
        font-size: 1.1rem;
        color: #6c757d;
        line-height: 1.8;
      }
      
      .step-visual {
        background: white;
        border-radius: 24px;
        padding: 40px;
        box-shadow: var(--card-shadow);
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .step-visual i {
        font-size: 8rem;
        color: var(--gold);
        opacity: 0.2;
      }
      
      /* ============================================
         6. WHY CHOOSE US (3D ANIMATED ICONS)
         ============================================ */
      
      .why-choose-3d {
        padding: 100px 0;
        background: white;
      }
      
      .features-grid-3d {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 40px;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 20px;
      }
      
      .feature-card-3d {
        padding: 40px;
        background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        border-radius: 24px;
        box-shadow: var(--card-shadow);
        text-align: center;
        border: 1px solid rgba(0,0,0,0.05);
        position: relative;
        overflow: hidden;
      }
      
      .feature-card-3d::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(255, 193, 7, 0.05) 0%, transparent 100%);
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      .feature-card-3d:hover::after {
        opacity: 1;
      }
      
      .feature-icon-animated {
        width: 100px;
        height: 100px;
        margin: 0 auto 24px;
        background: var(--navy);
        border-radius: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 15px 40px rgba(0, 31, 63, 0.2);
        transform-style: preserve-3d;
      }
      
      .feature-card-3d:hover .feature-icon-animated {
        animation: rotate-3d 0.6s ease;
      }
      
      .feature-icon-animated i {
        font-size: 3rem;
        color: var(--gold);
      }
      
      .feature-card-3d h4 {
        font-size: 1.5rem;
        color: var(--navy);
        margin-bottom: 16px;
        font-weight: 700;
      }
      
      .feature-card-3d p {
        color: #6c757d;
        line-height: 1.6;
      }
      
      @keyframes rotate-3d {
        0% { transform: rotateY(0deg); }
        50% { transform: rotateY(180deg); }
        100% { transform: rotateY(360deg); }
      }
      
      .feature-card-3d:hover {
        transform: var(--card-lift);
        box-shadow: var(--card-shadow-hover);
      }
      
      /* ============================================
         7. ENTERPRISE SOLUTIONS (3D PANEL)
         ============================================ */
      
      .enterprise-section-3d {
        padding: 100px 0;
        background: linear-gradient(135deg, #001f3f 0%, #003d7a 100%);
        position: relative;
        overflow: hidden;
      }
      
      .enterprise-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 80px;
        align-items: center;
      }
      
      .enterprise-text h2 {
        font-size: 3rem;
        color: white;
        margin-bottom: 24px;
        font-weight: 800;
      }
      
      .enterprise-text p {
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: 32px;
        line-height: 1.8;
      }
      
      .enterprise-features {
        list-style: none;
        padding: 0;
        margin: 0 0 40px 0;
      }
      
      .enterprise-features li {
        padding: 16px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .enterprise-features li i {
        color: var(--gold);
        font-size: 1.2rem;
      }
      
      .enterprise-cta {
        background: var(--gold);
        color: var(--navy);
        padding: 18px 40px;
        border-radius: 12px;
        border: none;
        font-weight: 700;
        font-size: 1.1rem;
        cursor: pointer;
        box-shadow: 0 10px 30px rgba(255, 193, 7, 0.3);
      }
      
      .enterprise-cta:hover {
        background: #FFD54F;
        transform: translateY(-2px);
        box-shadow: 0 15px 40px rgba(255, 193, 7, 0.4);
      }
      
      .enterprise-visual {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 24px;
        padding: 60px;
        position: relative;
        min-height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .enterprise-visual i {
        font-size: 12rem;
        color: var(--gold);
        opacity: 0.2;
      }
      
      /* ============================================
         RESPONSIVE DESIGN
         ============================================ */
      
      @media (max-width: 1200px) {
        .floating-cards {
          display: none;
        }
        
        .hero-3d h1 {
          font-size: 3rem;
        }
      }
      
      @media (max-width: 992px) {
        .step-card-3d,
        .enterprise-content {
          grid-template-columns: 1fr;
          gap: 40px;
        }
        
        .section-header-3d h2 {
          font-size: 2.5rem;
        }
        
        .hero-3d h1 {
          font-size: 2.5rem;
        }
      }
      
      @media (max-width: 768px) {
        .hero-3d {
          min-height: 500px;
          padding: 60px 0;
        }
        
        .product-grid-3d,
        .deals-grid,
        .trust-grid,
        .features-grid-3d {
          grid-template-columns: 1fr;
        }
        
        .section-header-3d h2 {
          font-size: 2rem;
        }
      }
    </style>
  `;
}
