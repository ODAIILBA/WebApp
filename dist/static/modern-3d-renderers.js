// Modern 3D Section Renderers for E-Commerce Body
// Ultra-premium design for digital license keys

// Render 3D Hero Section
function render3DHeroSection() {
  return `
    <section class="hero-3d">
      <div class="container">
        <div class="hero-content">
          <h1>Instant Digital<br/>Software Licenses</h1>
          <p class="subtitle">Genuine licenses delivered instantly to your inbox. Secure checkout, lifetime support, and money-back guarantee.</p>
          
          <div class="hero-badges">
            <div class="hero-badge">
              <i class="fas fa-bolt"></i>
              Instant Delivery
            </div>
            <div class="hero-badge">
              <i class="fas fa-shield-alt"></i>
              100% Genuine
            </div>
            <div class="hero-badge">
              <i class="fas fa-lock"></i>
              Secure Checkout
            </div>
          </div>
          
          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <button class="btn-primary" style="font-size: 1.1rem; padding: 18px 40px;">
              <i class="fas fa-shopping-cart" style="margin-right: 8px;"></i>
              Shop Now
            </button>
            <button class="btn-secondary" style="font-size: 1.1rem; padding: 18px 40px;">
              <i class="fas fa-info-circle" style="margin-right: 8px;"></i>
              Learn More
            </button>
          </div>
        </div>
        
        <!-- 3D Floating License Cards -->
        <div class="floating-cards">
          <div class="license-card-3d">
            <div class="card-header">
              <div class="brand-logo"><i class="fab fa-windows"></i></div>
              <div class="instant-badge">INSTANT</div>
            </div>
            <h4>Windows 11 Pro</h4>
            <p>Lifetime License</p>
            <div class="price">€49.99</div>
          </div>
          
          <div class="license-card-3d">
            <div class="card-header">
              <div class="brand-logo"><i class="fab fa-microsoft"></i></div>
              <div class="instant-badge">INSTANT</div>
            </div>
            <h4>Office 2024</h4>
            <p>Professional Plus</p>
            <div class="price">€79.99</div>
          </div>
          
          <div class="license-card-3d">
            <div class="card-header">
              <div class="brand-logo"><i class="fas fa-server"></i></div>
              <div class="instant-badge">INSTANT</div>
            </div>
            <h4>Server 2022</h4>
            <p>Standard Edition</p>
            <div class="price">€199.99</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Render 3D Product Section
function render3DProductSection(title, subtitle, products) {
  return `
    <section class="product-section-3d">
      <div class="section-header-3d">
        <h2>${title}</h2>
        <p>${subtitle}</p>
      </div>
      
      <div class="product-grid-3d">
        ${products.map(product => `
          <div class="product-card-3d">
            <div class="product-icon-3d">
              <i class="${product.icon}"></i>
            </div>
            <h3>${product.name}</h3>
            <div class="product-meta">
              <span class="meta-tag">${product.version}</span>
              <span class="meta-tag">${product.type}</span>
            </div>
            <p class="description">${product.description}</p>
            <div class="product-footer">
              <div class="price-3d">
                <span class="currency">€</span>${product.price}
              </div>
              <button class="buy-btn-3d" onclick="alert('Add to cart: ${product.name}')">
                <i class="fas fa-shopping-cart" style="margin-right: 6px;"></i>
                Buy Now
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

// Render 3D Deals Section
function render3DDealsSection() {
  return `
    <section class="deals-section-3d">
      <div class="section-header-3d">
        <h2 style="color: white;">Limited Time Offers</h2>
        <p style="color: rgba(255,255,255,0.9);">Save up to 50% on bestselling licenses</p>
      </div>
      
      <div class="deals-grid">
        <div class="deal-card-3d">
          <div class="deal-badge">-40%</div>
          <h3>Windows 11 + Office Bundle</h3>
          <p>Get Windows 11 Pro and Office 2024 Professional Plus together and save big.</p>
          <div class="deal-price">
            <span class="old-price">€149.99</span>
            <span class="new-price">€89.99</span>
          </div>
          <button class="deal-cta">
            <i class="fas fa-shopping-cart" style="margin-right: 8px;"></i>
            Grab This Deal
          </button>
        </div>
        
        <div class="deal-card-3d">
          <div class="deal-badge">BESTSELLER</div>
          <h3>Office 2024 Home & Business</h3>
          <p>Perfect for professionals and small businesses. Lifetime license included.</p>
          <div class="deal-price">
            <span class="old-price">€99.99</span>
            <span class="new-price">€69.99</span>
          </div>
          <button class="deal-cta">
            <i class="fas fa-shopping-cart" style="margin-right: 8px;"></i>
            Buy Now
          </button>
        </div>
        
        <div class="deal-card-3d">
          <div class="deal-badge">-50%</div>
          <h3>Server 2022 Datacenter</h3>
          <p>Enterprise-grade server solution with unlimited virtualization rights.</p>
          <div class="deal-price">
            <span class="old-price">€599.99</span>
            <span class="new-price">€299.99</span>
          </div>
          <button class="deal-cta">
            <i class="fas fa-shopping-cart" style="margin-right: 8px;"></i>
            Claim Offer
          </button>
        </div>
      </div>
    </section>
  `;
}

// Render 3D Trust Section
function render3DTrustSection() {
  return `
    <section class="trust-section-3d">
      <div class="section-header-3d">
        <h2>Why Trust Us?</h2>
        <p>Your security and satisfaction are our top priorities</p>
      </div>
      
      <div class="trust-grid">
        <div class="trust-card-3d">
          <div class="trust-icon-3d">
            <i class="fas fa-lock"></i>
          </div>
          <h4>SSL Secured</h4>
          <p>256-bit encryption protects your payment and personal data throughout every transaction.</p>
        </div>
        
        <div class="trust-card-3d">
          <div class="trust-icon-3d">
            <i class="fas fa-certificate"></i>
          </div>
          <h4>Certified Licenses</h4>
          <p>100% genuine software licenses directly from authorized distributors. No grey market.</p>
        </div>
        
        <div class="trust-card-3d">
          <div class="trust-icon-3d">
            <i class="fas fa-bolt"></i>
          </div>
          <h4>Instant Delivery</h4>
          <p>Receive your license key via email within seconds of completing your purchase.</p>
        </div>
        
        <div class="trust-card-3d">
          <div class="trust-icon-3d">
            <i class="fas fa-undo"></i>
          </div>
          <h4>Money-Back Guarantee</h4>
          <p>Not satisfied? Get a full refund within 30 days, no questions asked.</p>
        </div>
      </div>
    </section>
  `;
}

// Render 3D How It Works Section
function render3DHowItWorksSection() {
  return `
    <section class="how-it-works-3d">
      <div class="section-header-3d">
        <h2>How It Works</h2>
        <p>Get your software license in 3 simple steps</p>
      </div>
      
      <div class="steps-container">
        <div class="step-card-3d">
          <div class="step-content">
            <div class="step-number-3d">1</div>
            <h3>Choose Your License</h3>
            <p>Browse our catalog of genuine software licenses. Select the product that fits your needs – whether it's Windows, Office, Server, or VMware.</p>
          </div>
          <div class="step-visual">
            <i class="fas fa-search"></i>
          </div>
        </div>
        
        <div class="step-card-3d">
          <div class="step-content">
            <div class="step-number-3d">2</div>
            <h3>Secure Checkout</h3>
            <p>Complete your purchase through our SSL-secured payment gateway. We accept all major credit cards, PayPal, and bank transfers.</p>
          </div>
          <div class="step-visual">
            <i class="fas fa-lock"></i>
          </div>
        </div>
        
        <div class="step-card-3d">
          <div class="step-content">
            <div class="step-number-3d">3</div>
            <h3>Instant Activation</h3>
            <p>Receive your license key immediately via email. Follow our simple activation guide to install your software in minutes.</p>
          </div>
          <div class="step-visual">
            <i class="fas fa-key"></i>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Render 3D Why Choose Us Section
function render3DWhyChooseSection() {
  return `
    <section class="why-choose-3d">
      <div class="section-header-3d">
        <h2>Why Choose Us?</h2>
        <p>The smart choice for digital software licenses</p>
      </div>
      
      <div class="features-grid-3d">
        <div class="feature-card-3d">
          <div class="feature-icon-animated">
            <i class="fas fa-rocket"></i>
          </div>
          <h4>Lightning Fast</h4>
          <p>No waiting. No shipping. Get your license key delivered to your inbox instantly after purchase.</p>
        </div>
        
        <div class="feature-card-3d">
          <div class="feature-icon-animated">
            <i class="fas fa-dollar-sign"></i>
          </div>
          <h4>Best Prices</h4>
          <p>We offer the most competitive prices on the market with regular discounts and bundle deals.</p>
        </div>
        
        <div class="feature-card-3d">
          <div class="feature-icon-animated">
            <i class="fas fa-headset"></i>
          </div>
          <h4>24/7 Support</h4>
          <p>Our expert support team is available around the clock to help with installation and activation.</p>
        </div>
        
        <div class="feature-card-3d">
          <div class="feature-icon-animated">
            <i class="fas fa-shield-alt"></i>
          </div>
          <h4>Lifetime Warranty</h4>
          <p>All our licenses come with a lifetime warranty. Your purchase is protected forever.</p>
        </div>
        
        <div class="feature-card-3d">
          <div class="feature-icon-animated">
            <i class="fas fa-sync"></i>
          </div>
          <h4>Free Updates</h4>
          <p>Receive all software updates and security patches at no additional cost.</p>
        </div>
        
        <div class="feature-card-3d">
          <div class="feature-icon-animated">
            <i class="fas fa-users"></i>
          </div>
          <h4>50,000+ Customers</h4>
          <p>Join thousands of satisfied customers who trust us for their software needs.</p>
        </div>
      </div>
    </section>
  `;
}

// Render 3D Enterprise Section
function render3DEnterpriseSection() {
  return `
    <section class="enterprise-section-3d">
      <div class="enterprise-content">
        <div class="enterprise-text">
          <h2>Enterprise & Business Solutions</h2>
          <p>Volume licensing and dedicated support for organizations of all sizes.</p>
          
          <ul class="enterprise-features">
            <li><i class="fas fa-check-circle"></i> Volume discounts for bulk orders</li>
            <li><i class="fas fa-check-circle"></i> Flexible payment terms</li>
            <li><i class="fas fa-check-circle"></i> Dedicated account manager</li>
            <li><i class="fas fa-check-circle"></i> Priority technical support</li>
            <li><i class="fas fa-check-circle"></i> Custom licensing solutions</li>
          </ul>
          
          <button class="enterprise-cta">
            <i class="fas fa-briefcase" style="margin-right: 8px;"></i>
            Contact Sales Team
          </button>
        </div>
        
        <div class="enterprise-visual">
          <i class="fas fa-building"></i>
        </div>
      </div>
    </section>
  `;
}

// Export functions for use
if (typeof window !== 'undefined') {
  window.render3DHeroSection = render3DHeroSection;
  window.render3DProductSection = render3DProductSection;
  window.render3DDealsSection = render3DDealsSection;
  window.render3DTrustSection = render3DTrustSection;
  window.render3DHowItWorksSection = render3DHowItWorksSection;
  window.render3DWhyChooseSection = render3DWhyChooseSection;
  window.render3DEnterpriseSection = render3DEnterpriseSection;
}
