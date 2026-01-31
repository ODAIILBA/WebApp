// Section Rendering Functions for Dynamic Homepage
// This file contains all the rendering functions for the 24 homepage sections

function renderHeroSlider(section, config) {
  // Default slides if none provided
  const defaultSlides = [
    {
      title: 'Original Software-Lizenzen',
      description: 'Günstige Windows, Office & mehr – Sofort per E-Mail',
      background_color: '#001f3f',
      text_color: 'white',
      cta_link: '/produkte',
      cta_text: 'Jetzt kaufen'
    },
    {
      title: 'Bis zu 70% sparen',
      description: 'Top-Marken zum besten Preis – 100% legal',
      background_color: '#003366',
      text_color: 'white',
      cta_link: '/angebote',
      cta_text: 'Angebote ansehen'
    },
    {
      title: '24/7 Sofort-Lieferung',
      description: 'Alle Lizenzen auf Lager – Per E-Mail in Minuten',
      background_color: '#001f3f',
      text_color: 'white',
      cta_link: '/kontakt',
      cta_text: 'Mehr erfahren'
    }
  ];
  
  const slides = config.slides || defaultSlides;
  if (slides.length === 0) return '';
  
  return `
    <section class="hero-slider" data-section-id="${section.id}" style="position:relative; height:600px; overflow:hidden;">
      <div class="slides-container" style="position:relative; height:100%; width:100%;">
        ${slides.map((slide, i) => `
          <div class="slide ${i === 0 ? 'active' : ''}" 
               style="position:absolute; top:0; left:0; width:100%; height:100%; 
                      background: linear-gradient(135deg, ${slide.background_color || '#001f3f'} 0%, #003366 100%);
                      color: ${slide.text_color || 'white'};
                      display: ${i === 0 ? 'flex' : 'none'};
                      align-items: center; justify-content: center; text-align: center; padding: 40px;">
            <div style="max-width: 800px;">
              <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 20px;">${slide.title}</h1>
              <p style="font-size: 1.5rem; margin-bottom: 30px;">${slide.description || ''}</p>
              ${slide.cta_link ? `<a href="${slide.cta_link}" class="cta-button" style="display:inline-block; background:#FFC107; color:#001f3f; padding:15px 40px; border-radius:25px; text-decoration:none; font-weight:bold;">${slide.cta_text || 'Mehr erfahren'}</a>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
      
      ${slides.length > 1 ? `
        <div class="slider-dots" style="position:absolute; bottom:20px; left:50%; transform:translateX(-50%); display:flex; gap:10px;">
          ${slides.map((_, i) => `
            <button class="slider-dot ${i === 0 ? 'active' : ''}" 
                    onclick="goToSlide(${i})"
                    style="width:12px; height:12px; border-radius:50%; background:${i === 0 ? '#FFC107' : 'rgba(255,255,255,0.5)'}; border:none; cursor:pointer;"></button>
          `).join('')}
        </div>
        
        <button class="slider-prev" onclick="prevSlide()" style="position:absolute; left:20px; top:50%; transform:translateY(-50%); background:rgba(0,0,0,0.5); color:white; border:none; padding:15px 20px; cursor:pointer; border-radius:5px;">&#10094;</button>
        <button class="slider-next" onclick="nextSlide()" style="position:absolute; right:20px; top:50%; transform:translateY(-50%); background:rgba(0,0,0,0.5); color:white; border:none; padding:15px 20px; cursor:pointer; border-radius:5px;">&#10095;</button>
      ` : ''}
    </section>
  `;
}

function renderTrustBar(section, config) {
  const badges = config.badges || [
    { icon: 'shield-alt', title: 'Sichere Zahlung', description: 'SSL verschlüsselt' },
    { icon: 'shipping-fast', title: 'Sofortversand', description: 'Per E-Mail' },
    { icon: 'undo', title: '14 Tage Rückgabe', description: 'Geld-zurück-Garantie' },
    { icon: 'headset', title: 'Support', description: 'Mo-Fr 9-18 Uhr' }
  ];
  
  return `
    <section class="trust-bar" data-section-id="${section.id}" style="background:linear-gradient(135deg, #001f3f 0%, #003366 100%); color:white; padding:30px 20px;">
      <div style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:30px;">
        ${badges.map(badge => `
          <div style="text-align:center;">
            <i class="fas fa-${badge.icon}" style="font-size:32px; color:#FFC107; margin-bottom:10px;"></i>
            <h4 style="font-weight:bold; margin-bottom:5px;">${badge.title}</h4>
            <p style="font-size:14px; opacity:0.9;">${badge.description}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderProductSlider(section, config) {
  const containerId = `product-slider-${section.id}`;
  
  // Start loading products immediately after rendering
  setTimeout(() => loadProductsForSection(containerId, section, config), 100);
  
  return `
    <section class="product-slider" data-section-id="${section.id}" style="padding:60px 20px; background:#f8f9fa;">
      <div style="max-width:1200px; margin:0 auto;">
        <h2 style="text-align:center; font-size:2.5rem; color:#001f3f; margin-bottom:10px;">${section.title || '📦 Unsere Produkte'}</h2>
        ${section.subtitle ? `<p style="text-align:center; font-size:1.1rem; color:#666; margin-bottom:40px;">${section.subtitle}</p>` : ''}
        <div id="${containerId}" class="product-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:30px;">
          ${renderProductSkeletons(4)}
        </div>
      </div>
    </section>
  `;
}

// Skeleton loader for products
function renderProductSkeletons(count) {
  return Array(count).fill(0).map(() => `
    <div class="product-skeleton" style="background:white; border-radius:15px; padding:20px; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
      <div style="width:100%; height:200px; background:linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size:200% 100%; animation:shimmer 1.5s infinite; border-radius:10px; margin-bottom:15px;"></div>
      <div style="width:70%; height:20px; background:linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size:200% 100%; animation:shimmer 1.5s infinite; border-radius:5px; margin-bottom:10px;"></div>
      <div style="width:50%; height:16px; background:linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size:200% 100%; animation:shimmer 1.5s infinite; border-radius:5px; margin-bottom:15px;"></div>
      <div style="width:40%; height:24px; background:linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size:200% 100%; animation:shimmer 1.5s infinite; border-radius:5px; margin-bottom:15px;"></div>
      <div style="width:100%; height:40px; background:linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size:200% 100%; animation:shimmer 1.5s infinite; border-radius:25px;"></div>
    </div>
  `).join('');
}

// Load products for a specific section
async function loadProductsForSection(containerId, section, config) {
  try {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Determine category from section key
    let category = '';
    if (section.section_key.includes('windows')) category = 'windows';
    else if (section.section_key.includes('office')) category = 'office';
    else if (section.section_key.includes('server')) category = 'server';
    else if (section.section_key.includes('antivirus')) category = 'antivirus';
    
    // Build API URL
    const params = new URLSearchParams({
      limit: config.limit || '8',
      sort: config.sort || 'bestseller'
    });
    
    if (category) params.append('category', category);
    if (config.featured) params.append('featured', 'true');
    if (config.onSale) params.append('onSale', 'true');
    
    const response = await fetch(`/api/products?${params.toString()}`);
    const data = await response.json();
    
    if (data.success && data.data && data.data.length > 0) {
      container.innerHTML = data.data.map(product => renderProductCard(product)).join('');
    } else {
      container.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:40px; color:#666;">
          <i class="fas fa-box-open" style="font-size:48px; margin-bottom:20px; opacity:0.5;"></i>
          <p style="font-size:1.1rem;">Keine Produkte gefunden</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error loading products:', error);
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:40px; color:#dc3545;">
          <i class="fas fa-exclamation-triangle" style="font-size:48px; margin-bottom:20px;"></i>
          <p style="font-size:1.1rem;">Fehler beim Laden der Produkte</p>
        </div>
      `;
    }
  }
}

// Render individual product card
function renderProductCard(product) {
  const finalPrice = product.discount_price || product.base_price;
  const hasDiscount = product.discount_price && product.discount_price < product.base_price;
  const savings = hasDiscount ? Math.round(((product.base_price - product.discount_price) / product.base_price) * 100) : 0;
  const imageUrl = product.image_url || getDefaultProductImage(product.category_name, product.brand_name);
  
  return `
    <div class="product-card" data-product-id="${product.id}" style="background:white; border-radius:15px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.1); transition:all 0.3s; cursor:pointer; position:relative;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 10px rgba(0,0,0,0.1)'" onclick="window.location.href='/produkt/${product.slug}'">
      
      ${hasDiscount ? `<div class="discount-badge" style="position:absolute; top:10px; right:10px; background:#dc3545; color:white; padding:5px 15px; border-radius:20px; font-weight:bold; font-size:14px; z-index:10;">-${savings}%</div>` : ''}
      
      ${product.is_new ? `<div class="new-badge" style="position:absolute; top:10px; left:10px; background:#28a745; color:white; padding:5px 15px; border-radius:20px; font-weight:bold; font-size:12px; z-index:10;">NEU</div>` : ''}
      
      <div class="product-image" style="width:100%; height:200px; background:#f8f9fa; display:flex; align-items:center; justify-content:center; padding:20px; position:relative; overflow:hidden;">
        ${imageUrl.startsWith('http') ? 
          `<img src="${imageUrl}" alt="${product.name}" style="max-width:100%; max-height:100%; object-fit:contain;">` :
          `<div style="text-align:center;">
            <i class="${imageUrl}" style="font-size:80px; color:#001f3f; opacity:0.3;"></i>
            <p style="font-size:14px; color:#999; margin-top:10px;">${product.brand_name || 'Software'}</p>
          </div>`
        }
        <div class="stock-badge" style="position:absolute; bottom:10px; right:10px; background:rgba(40, 167, 69, 0.9); color:white; padding:5px 10px; border-radius:15px; font-size:11px; font-weight:bold;">
          <i class="fas fa-check-circle"></i> Auf Lager
        </div>
      </div>
      
      <div class="product-info" style="padding:20px;">
        ${product.brand_name ? `<div class="brand" style="font-size:12px; color:#666; text-transform:uppercase; margin-bottom:5px; font-weight:600;">${product.brand_name}</div>` : ''}
        
        <h3 class="product-name" style="font-size:16px; font-weight:600; color:#001f3f; margin-bottom:10px; min-height:40px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${product.name}</h3>
        
        ${product.category_name ? `<div class="category" style="font-size:12px; color:#999; margin-bottom:15px;"><i class="fas fa-tag"></i> ${product.category_name}</div>` : ''}
        
        ${product.rating > 0 ? `
          <div class="rating" style="margin-bottom:15px;">
            ${renderStars(product.rating)}
            <span style="font-size:12px; color:#666; margin-left:5px;">(${product.review_count || 0})</span>
          </div>
        ` : ''}
        
        <div class="price-section" style="margin-bottom:15px;">
          ${hasDiscount ? `
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="old-price" style="font-size:16px; color:#999; text-decoration:line-through;">€${product.base_price.toFixed(2)}</span>
              <span class="new-price" style="font-size:24px; font-weight:bold; color:#dc3545;">€${finalPrice.toFixed(2)}</span>
            </div>
            <div style="font-size:12px; color:#28a745; font-weight:600; margin-top:5px;">Sie sparen €${(product.base_price - finalPrice).toFixed(2)}</div>
          ` : `
            <span class="price" style="font-size:24px; font-weight:bold; color:#001f3f;">€${finalPrice.toFixed(2)}</span>
          `}
        </div>
        
        <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id}, '${product.name}', ${finalPrice})" style="width:100%; background:linear-gradient(135deg, #FFC107 0%, #FFD54F 100%); color:#001f3f; border:none; padding:12px 20px; border-radius:25px; font-weight:bold; font-size:14px; cursor:pointer; transition:all 0.3s;" onmouseover="this.style.background='linear-gradient(135deg, #FFD54F 0%, #FFC107 100%)'; this.style.transform='scale(1.05)'" onmouseout="this.style.background='linear-gradient(135deg, #FFC107 0%, #FFD54F 100%)'; this.style.transform='scale(1)'">
          <i class="fas fa-shopping-cart"></i> In den Warenkorb
        </button>
        
        <div style="text-align:center; margin-top:10px; font-size:12px; color:#28a745; font-weight:600;">
          <i class="fas fa-shipping-fast"></i> Sofort per E-Mail
        </div>
      </div>
    </div>
  `;
}

// Render star rating
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  let stars = '';
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star" style="color:#FFC107; font-size:14px;"></i>';
  }
  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt" style="color:#FFC107; font-size:14px;"></i>';
  }
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star" style="color:#FFC107; font-size:14px;"></i>';
  }
  return stars;
}

// Get default product image based on category/brand
function getDefaultProductImage(category, brand) {
  // Return Font Awesome icon classes
  if (brand) {
    if (brand.toLowerCase().includes('microsoft')) return 'fab fa-windows';
    if (brand.toLowerCase().includes('adobe')) return 'fas fa-file-pdf';
    if (brand.toLowerCase().includes('kaspersky')) return 'fas fa-shield-alt';
    if (brand.toLowerCase().includes('autodesk')) return 'fas fa-drafting-compass';
  }
  
  if (category) {
    const cat = category.toLowerCase();
    if (cat.includes('windows')) return 'fab fa-windows';
    if (cat.includes('office')) return 'fas fa-file-alt';
    if (cat.includes('server')) return 'fas fa-server';
    if (cat.includes('antivirus') || cat.includes('sicherheit')) return 'fas fa-shield-alt';
    if (cat.includes('cad') || cat.includes('design')) return 'fas fa-drafting-compass';
  }
  
  return 'fas fa-box';
}

// Add to cart function
function addToCart(productId, productName, price) {
  try {
    // Get existing cart
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already in cart
    const existingIndex = cart.findIndex(item => item.id === productId);
    
    if (existingIndex >= 0) {
      // Increase quantity
      cart[existingIndex].quantity += 1;
      showNotification('Menge erhöht', `${productName} Menge wurde erhöht`, 'success');
    } else {
      // Add new item
      cart.push({
        id: productId,
        name: productName,
        price: price,
        quantity: 1,
        addedAt: Date.now()
      });
      showNotification('Zum Warenkorb hinzugefügt', `${productName} wurde hinzugefügt`, 'success');
    }
    
    // Save cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Trigger storage event for other tabs
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'cart',
      newValue: JSON.stringify(cart)
    }));
    
  } catch (error) {
    console.error('Error adding to cart:', error);
    showNotification('Fehler', 'Produkt konnte nicht hinzugefügt werden', 'error');
  }
}

// Update cart count in header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const countElement = document.getElementById('cart-count');
  if (countElement) {
    countElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}

// Show notification
function showNotification(title, message, type) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#001f3f' : '#003366'};
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
  `;
  notification.innerHTML = `
    <div style="font-weight: bold; margin-bottom: 5px;">${title}</div>
    <div style="font-size: 14px;">${message}</div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function renderLicenseAvailability(section, config) {
  return `
    <section class="feature-section license-availability" data-section-id="${section.id}" style="background:linear-gradient(135deg, #001f3f 0%, #003366 100%); color:white; padding:60px 20px;">
      <div style="max-width:1200px; margin:0 auto; text-align:center;">
        <h2 style="font-size:2.5rem; margin-bottom:10px;">${section.title || '🔑 Lizenzen sofort verfügbar'}</h2>
        <p style="font-size:1.2rem; margin-bottom:40px; opacity:0.9;">${section.subtitle || 'Alle Produkte auf Lager - Sofortige Lieferung'}</p>
        
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:30px; max-width:1000px; margin:0 auto;">
          <div class="license-card" style="background:rgba(255, 193, 7, 0.1); padding:30px; border-radius:15px; border:2px solid #FFC107; backdrop-filter:blur(10px);">
            <div class="counter" data-target="5000" style="font-size:3rem; font-weight:bold; color:#FFC107;">0</div>
            <div style="margin-top:10px; font-size:1.1rem;">Windows Lizenzen</div>
          </div>
          <div class="license-card" style="background:rgba(255, 193, 7, 0.1); padding:30px; border-radius:15px; border:2px solid #FFC107; backdrop-filter:blur(10px);">
            <div class="counter" data-target="3500" style="font-size:3rem; font-weight:bold; color:#FFC107;">0</div>
            <div style="margin-top:10px; font-size:1.1rem;">Office Lizenzen</div>
          </div>
          <div class="license-card" style="background:rgba(255, 193, 7, 0.1); padding:30px; border-radius:15px; border:2px solid #FFC107; backdrop-filter:blur(10px);">
            <div class="counter" data-target="2000" style="font-size:3rem; font-weight:bold; color:#FFC107;">0</div>
            <div style="margin-top:10px; font-size:1.1rem;">Server Lizenzen</div>
          </div>
          <div class="license-card" style="background:rgba(255, 193, 7, 0.1); padding:30px; border-radius:15px; border:2px solid #FFC107; backdrop-filter:blur(10px);">
            <div class="counter" data-target="1500" style="font-size:3rem; font-weight:bold; color:#FFC107;">0</div>
            <div style="margin-top:10px; font-size:1.1rem;">Antivirus Lizenzen</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderPriceComparison(section, config) {
  return `
    <section class="feature-section price-comparison" data-section-id="${section.id}" style="padding:60px 20px; background:white;">
      <div style="max-width:1000px; margin:0 auto;">
        <h2 style="text-align:center; font-size:2.5rem; color:#001f3f; margin-bottom:40px;">${section.title || '💰 Preisvergleich - Bis zu 70% sparen'}</h2>
        
        <table style="width:100%; border-collapse:collapse; background:white; box-shadow:0 2px 10px rgba(0,0,0,0.1); border-radius:10px; overflow:hidden;">
          <thead>
            <tr style="background:#001f3f; color:white;">
              <th style="padding:20px; text-align:left;">Produkt</th>
              <th style="padding:20px; text-align:right;">Anderer Anbieter</th>
              <th style="padding:20px; text-align:right; color:#FFC107;">Unser Preis</th>
              <th style="padding:20px; text-align:right;">Ersparnis</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #eee;">
              <td style="padding:20px;">Windows 11 Pro</td>
              <td style="padding:20px; text-align:right; text-decoration:line-through; color:#999;">€259.00</td>
              <td style="padding:20px; text-align:right; font-weight:bold; color:#001f3f; font-size:1.3rem;">€39.90</td>
              <td style="padding:20px; text-align:right; color:#00A859; font-weight:bold;">85%</td>
            </tr>
            <tr style="border-bottom:1px solid #eee;">
              <td style="padding:20px;">Office 2024 Pro Plus</td>
              <td style="padding:20px; text-align:right; text-decoration:line-through; color:#999;">€439.00</td>
              <td style="padding:20px; text-align:right; font-weight:bold; color:#001f3f; font-size:1.3rem;">€59.90</td>
              <td style="padding:20px; text-align:right; color:#00A859; font-weight:bold;">86%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

// Flash Deals / Countdown Deals Section
function renderCountdownDeals(section, config) {
  const endTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours from now
  
  return `
    <section class="countdown-deals" data-section-id="${section.id}" style="background:linear-gradient(135deg, #001f3f 0%, #003366 100%); color:white; padding:60px 20px;">
      <div style="max-width:1200px; margin:0 auto; text-align:center;">
        <h2 style="font-size:2.5rem; margin-bottom:10px;">⚡ ${section.title || 'Flash Deals'}</h2>
        <p style="font-size:1.2rem; margin-bottom:30px; opacity:0.9;">${section.subtitle || 'Zeitlich begrenzte Angebote - Nur heute!'}</p>
        
        <div class="countdown-timer" data-end-time="${endTime}" style="display:flex; justify-content:center; gap:20px; margin-bottom:40px;">
          <div style="background:rgba(255,255,255,0.2); padding:20px; border-radius:10px; min-width:80px;">
            <div class="hours" style="font-size:2rem; font-weight:bold;">00</div>
            <div style="font-size:0.9rem; opacity:0.9;">Stunden</div>
          </div>
          <div style="background:rgba(255,255,255,0.2); padding:20px; border-radius:10px; min-width:80px;">
            <div class="minutes" style="font-size:2rem; font-weight:bold;">00</div>
            <div style="font-size:0.9rem; opacity:0.9;">Minuten</div>
          </div>
          <div style="background:rgba(255,255,255,0.2); padding:20px; border-radius:10px; min-width:80px;">
            <div class="seconds" style="font-size:2rem; font-weight:bold;">00</div>
            <div style="font-size:0.9rem; opacity:0.9;">Sekunden</div>
          </div>
        </div>
        
        <a href="/produkte?sale=true" style="display:inline-block; background:#FFC107; color:#001f3f; padding:15px 40px; border-radius:25px; text-decoration:none; font-weight:bold; font-size:1.1rem;">
          <i class="fas fa-bolt"></i> Jetzt zugreifen
        </a>
      </div>
    </section>
  `;
}

// License Comparison Section
function renderLicenseComparison(section, config) {
  return `
    <section class="license-comparison" data-section-id="${section.id}" style="padding:60px 20px; background:#f8f9fa;">
      <div style="max-width:1200px; margin:0 auto;">
        <h2 style="text-align:center; font-size:2.5rem; color:#001f3f; margin-bottom:40px;">${section.title || '📊 Lizenzvergleich'}</h2>
        
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:30px;">
          <div style="background:white; padding:30px; border-radius:15px; box-shadow:0 2px 10px rgba(0,0,0,0.1); border-top:4px solid #FFC107;">
            <h3 style="font-size:1.5rem; color:#001f3f; margin-bottom:20px;">OEM Lizenz</h3>
            <ul style="list-style:none; padding:0; margin:0 0 20px 0;">
              <li style="padding:10px 0; border-bottom:1px solid #eee;"><i class="fas fa-check" style="color:#00A859; margin-right:10px;"></i> Günstigster Preis</li>
              <li style="padding:10px 0; border-bottom:1px solid #eee;"><i class="fas fa-check" style="color:#00A859; margin-right:10px;"></i> Gebunden an Hardware</li>
              <li style="padding:10px 0; border-bottom:1px solid #eee;"><i class="fas fa-times" style="color:#FF5252; margin-right:10px;"></i> Nicht übertragbar</li>
            </ul>
            <div style="text-align:center; font-size:2rem; font-weight:bold; color:#FFC107; margin-bottom:15px;">ab €13.99</div>
            <a href="/produkte" style="display:block; background:#001f3f; color:white; padding:12px; border-radius:8px; text-decoration:none; text-align:center;">Anzeigen</a>
          </div>
          
          <div style="background:white; padding:30px; border-radius:15px; box-shadow:0 5px 20px rgba(0,0,0,0.15); border-top:4px solid #001f3f; transform:scale(1.05);">
            <div style="background:#FFC107; color:#001f3f; padding:5px 15px; border-radius:20px; display:inline-block; font-size:0.9rem; font-weight:bold; margin-bottom:15px;">Beliebt</div>
            <h3 style="font-size:1.5rem; color:#001f3f; margin-bottom:20px;">Retail Lizenz</h3>
            <ul style="list-style:none; padding:0; margin:0 0 20px 0;">
              <li style="padding:10px 0; border-bottom:1px solid #eee;"><i class="fas fa-check" style="color:#00A859; margin-right:10px;"></i> Übertragbar</li>
              <li style="padding:10px 0; border-bottom:1px solid #eee;"><i class="fas fa-check" style="color:#00A859; margin-right:10px;"></i> Vollversion</li>
              <li style="padding:10px 0; border-bottom:1px solid #eee;"><i class="fas fa-check" style="color:#00A859; margin-right:10px;"></i> Herstellersupport</li>
            </ul>
            <div style="text-align:center; font-size:2rem; font-weight:bold; color:#001f3f; margin-bottom:15px;">ab €39.90</div>
            <a href="/produkte" style="display:block; background:#FFC107; color:#001f3f; padding:12px; border-radius:8px; text-decoration:none; text-align:center; font-weight:bold;">Jetzt kaufen</a>
          </div>
          
          <div style="background:white; padding:30px; border-radius:15px; box-shadow:0 2px 10px rgba(0,0,0,0.1); border-top:4px solid #003366;">
            <h3 style="font-size:1.5rem; color:#001f3f; margin-bottom:20px;">Volumen Lizenz</h3>
            <ul style="list-style:none; padding:0; margin:0 0 20px 0;">
              <li style="padding:10px 0; border-bottom:1px solid #eee;"><i class="fas fa-check" style="color:#00A859; margin-right:10px;"></i> Für Unternehmen</li>
              <li style="padding:10px 0; border-bottom:1px solid #eee;"><i class="fas fa-check" style="color:#00A859; margin-right:10px;"></i> Mengenrabatt</li>
              <li style="padding:10px 0; border-bottom:1px solid #eee;"><i class="fas fa-check" style="color:#00A859; margin-right:10px;"></i> Zentrale Verwaltung</li>
            </ul>
            <div style="text-align:center; font-size:2rem; font-weight:bold; color:#003366; margin-bottom:15px;">Auf Anfrage</div>
            <a href="/mengenrabatt" style="display:block; background:#003366; color:white; padding:12px; border-radius:8px; text-decoration:none; text-align:center;">Mehr erfahren</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Bundle Deals Section (Homepage)
function renderBundleDealsSection(section, config) {
  return `
    <section class="bundle-deals-section" data-section-id="${section.id}" style="padding:60px 20px; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); color:white;">
      <div style="max-width:1200px; margin:0 auto;">
        <h2 style="text-align:center; font-size:2.5rem; margin-bottom:10px;">${section.title || '📦 Bundle-Angebote'}</h2>
        <p style="text-align:center; font-size:1.2rem; margin-bottom:40px; opacity:0.9;">${section.subtitle || 'Sparen Sie mit unseren Paketen'}</p>
        
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:30px;">
          <div style="background:rgba(255,255,255,0.1); backdrop-filter:blur(10px); padding:30px; border-radius:15px; border:2px solid rgba(255,255,255,0.2);">
            <div style="font-size:3rem; margin-bottom:15px;">🏠</div>
            <h3 style="font-size:1.5rem; margin-bottom:15px;">Home Office Starter</h3>
            <p style="opacity:0.9; margin-bottom:20px;">Windows 11 + Office 2024 + Antivirus</p>
            <div style="font-size:2rem; font-weight:bold; color:#FFC107; margin-bottom:15px;">€189.90</div>
            <div style="text-decoration:line-through; opacity:0.7; margin-bottom:15px;">€299.90</div>
            <a href="/bundles" style="display:block; background:white; color:#667eea; padding:12px; border-radius:8px; text-decoration:none; text-align:center; font-weight:bold;">Details ansehen</a>
          </div>
          
          <div style="background:rgba(255,255,255,0.1); backdrop-filter:blur(10px); padding:30px; border-radius:15px; border:2px solid rgba(255,255,255,0.2);">
            <div style="font-size:3rem; margin-bottom:15px;">💼</div>
            <h3 style="font-size:1.5rem; margin-bottom:15px;">Business Pro</h3>
            <p style="opacity:0.9; margin-bottom:20px;">Windows Pro + Office Pro + Server</p>
            <div style="font-size:2rem; font-weight:bold; color:#FFC107; margin-bottom:15px;">€649.90</div>
            <div style="text-decoration:line-through; opacity:0.7; margin-bottom:15px;">€899.90</div>
            <a href="/bundles" style="display:block; background:white; color:#667eea; padding:12px; border-radius:8px; text-decoration:none; text-align:center; font-weight:bold;">Details ansehen</a>
          </div>
        </div>
        
        <div style="text-align:center; margin-top:40px;">
          <a href="/bundles" style="display:inline-block; background:white; color:#667eea; padding:15px 40px; border-radius:25px; text-decoration:none; font-weight:bold; font-size:1.1rem;">
            Alle Bundles ansehen <i class="fas fa-arrow-right" style="margin-left:10px;"></i>
          </a>
        </div>
      </div>
    </section>
  `;
}

// Installation Guide Section
function renderInstallationGuide(section, config) {
  return `
    <section class="installation-guide" data-section-id="${section.id}" style="padding:60px 20px; background:white;">
      <div style="max-width:1000px; margin:0 auto;">
        <h2 style="text-align:center; font-size:2.5rem; color:#001f3f; margin-bottom:40px;">${section.title || '📖 Installations-Anleitung'}</h2>
        
        <div style="display:grid; gap:30px;">
          <div style="display:flex; gap:20px; align-items:start;">
            <div style="flex-shrink:0; width:60px; height:60px; background:#FFC107; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.5rem; font-weight:bold; color:#001f3f;">1</div>
            <div>
              <h3 style="font-size:1.3rem; color:#001f3f; margin-bottom:10px;">Bestellung aufgeben</h3>
              <p style="color:#666; line-height:1.6;">Wählen Sie Ihr gewünschtes Produkt und legen Sie es in den Warenkorb. Schließen Sie die Bestellung ab.</p>
            </div>
          </div>
          
          <div style="display:flex; gap:20px; align-items:start;">
            <div style="flex-shrink:0; width:60px; height:60px; background:#FFC107; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.5rem; font-weight:bold; color:#001f3f;">2</div>
            <div>
              <h3 style="font-size:1.3rem; color:#001f3f; margin-bottom:10px;">Lizenzschlüssel erhalten</h3>
              <p style="color:#666; line-height:1.6;">Sie erhalten Ihren Lizenzschlüssel sofort per E-Mail. Prüfen Sie auch Ihren Spam-Ordner.</p>
            </div>
          </div>
          
          <div style="display:flex; gap:20px; align-items:start;">
            <div style="flex-shrink:0; width:60px; height:60px; background:#FFC107; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.5rem; font-weight:bold; color:#001f3f;">3</div>
            <div>
              <h3 style="font-size:1.3rem; color:#001f3f; margin-bottom:10px;">Software herunterladen</h3>
              <p style="color:#666; line-height:1.6;">Laden Sie die Software vom Hersteller herunter. Links finden Sie in Ihrer E-Mail.</p>
            </div>
          </div>
          
          <div style="display:flex; gap:20px; align-items:start;">
            <div style="flex-shrink:0; width:60px; height:60px; background:#FFC107; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.5rem; font-weight:bold; color:#001f3f;">4</div>
            <div>
              <h3 style="font-size:1.3rem; color:#001f3f; margin-bottom:10px;">Aktivieren</h3>
              <p style="color:#666; line-height:1.6;">Geben Sie Ihren Lizenzschlüssel während der Installation ein und aktivieren Sie die Software.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Trust & Security Section
function renderTrustSecurity(section, config) {
  return `
    <section class="trust-security" data-section-id="${section.id}" style="padding:60px 20px; background:linear-gradient(135deg, #00A859 0%, #00BF6F 100%); color:white;">
      <div style="max-width:1200px; margin:0 auto;">
        <h2 style="text-align:center; font-size:2.5rem; margin-bottom:10px;">${section.title || '🛡️ Vertrauen & Sicherheit'}</h2>
        <p style="text-align:center; font-size:1.2rem; margin-bottom:40px; opacity:0.9;">${section.subtitle || 'Warum Sie uns vertrauen können'}</p>
        
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:30px;">
          <div style="text-align:center;">
            <i class="fas fa-shield-alt" style="font-size:3rem; margin-bottom:15px; color:#FFC107;"></i>
            <h3 style="font-size:1.3rem; margin-bottom:10px;">100% Original</h3>
            <p style="opacity:0.9;">Nur authentische Lizenzen direkt von autorisierten Partnern</p>
          </div>
          
          <div style="text-align:center;">
            <i class="fas fa-lock" style="font-size:3rem; margin-bottom:15px; color:#FFC107;"></i>
            <h3 style="font-size:1.3rem; margin-bottom:10px;">Sichere Zahlung</h3>
            <p style="opacity:0.9;">SSL-verschlüsselt und PCI-DSS zertifiziert</p>
          </div>
          
          <div style="text-align:center;">
            <i class="fas fa-award" style="font-size:3rem; margin-bottom:15px; color:#FFC107;"></i>
            <h3 style="font-size:1.3rem; margin-bottom:10px;">Geprüfte Qualität</h3>
            <p style="opacity:0.9;">Über 50.000 zufriedene Kunden seit 2015</p>
          </div>
          
          <div style="text-align:center;">
            <i class="fas fa-headset" style="font-size:3rem; margin-bottom:15px; color:#FFC107;"></i>
            <h3 style="font-size:1.3rem; margin-bottom:10px;">Deutscher Support</h3>
            <p style="opacity:0.9;">Persönliche Betreuung Mo-Fr 9-18 Uhr</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

// License Preview Section
function renderLicensePreview(section, config) {
  return `
    <section class="license-preview" data-section-id="${section.id}" style="padding:60px 20px; background:#f8f9fa;">
      <div style="max-width:800px; margin:0 auto; text-align:center;">
        <h2 style="font-size:2.5rem; color:#001f3f; margin-bottom:20px;">${section.title || '📜 Was Sie erhalten'}</h2>
        <p style="font-size:1.2rem; color:#666; margin-bottom:40px;">${section.subtitle || 'Vorschau auf Ihre Lizenz'}</p>
        
        <div style="background:white; padding:40px; border-radius:15px; box-shadow:0 5px 20px rgba(0,0,0,0.1); border:2px solid #FFC107;">
          <div style="background:#001f3f; color:white; padding:20px; border-radius:10px; margin-bottom:30px;">
            <h3 style="margin:0 0 10px 0;">Ihr Lizenzschlüssel</h3>
            <div style="font-family:monospace; font-size:1.3rem; letter-spacing:2px; color:#FFC107;">XXXXX-XXXXX-XXXXX-XXXXX-XXXXX</div>
          </div>
          
          <div style="text-align:left; color:#666; line-height:1.8;">
            <p><strong>✓ Sofortiger Download-Link</strong></p>
            <p><strong>✓ Ausführliche Installationsanleitung</strong></p>
            <p><strong>✓ Rechnung mit ausgewiesener MwSt.</strong></p>
            <p><strong>✓ Aktivierungshilfe bei Problemen</strong></p>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Volume Calculator Section (Homepage Widget)
function renderVolumeCalculatorWidget(section, config) {
  return `
    <section class="volume-calculator-widget" data-section-id="${section.id}" style="padding:60px 20px; background:linear-gradient(135deg, #FF8C00 0%, #FFA500 100%); color:white;">
      <div style="max-width:1000px; margin:0 auto; text-align:center;">
        <h2 style="font-size:2.5rem; margin-bottom:10px;">${section.title || '💼 Volumen-Rechner'}</h2>
        <p style="font-size:1.2rem; margin-bottom:40px; opacity:0.9;">${section.subtitle || 'B2B Mengenrabatte berechnen'}</p>
        
        <div style="background:rgba(255,255,255,0.1); backdrop-filter:blur(10px); padding:40px; border-radius:15px; border:2px solid rgba(255,255,255,0.2);">
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:20px; margin-bottom:30px;">
            <div style="background:rgba(255,255,255,0.2); padding:20px; border-radius:10px;">
              <div style="font-size:2rem; font-weight:bold; margin-bottom:5px;">10%</div>
              <div style="opacity:0.9;">ab 5 Lizenzen</div>
            </div>
            <div style="background:rgba(255,255,255,0.2); padding:20px; border-radius:10px;">
              <div style="font-size:2rem; font-weight:bold; margin-bottom:5px;">15%</div>
              <div style="opacity:0.9;">ab 10 Lizenzen</div>
            </div>
            <div style="background:rgba(255,255,255,0.2); padding:20px; border-radius:10px;">
              <div style="font-size:2rem; font-weight:bold; margin-bottom:5px;">20%</div>
              <div style="opacity:0.9;">ab 25 Lizenzen</div>
            </div>
            <div style="background:rgba(255,255,255,0.2); padding:20px; border-radius:10px;">
              <div style="font-size:2rem; font-weight:bold; margin-bottom:5px;">25%</div>
              <div style="opacity:0.9;">ab 50 Lizenzen</div>
            </div>
          </div>
          
          <a href="/mengenrabatt" style="display:inline-block; background:white; color:#FF8C00; padding:15px 40px; border-radius:25px; text-decoration:none; font-weight:bold; font-size:1.1rem;">
            <i class="fas fa-calculator"></i> Jetzt berechnen
          </a>
        </div>
      </div>
    </section>
  `;
}

// Recently Viewed Section
function renderRecentlyViewed(section, config) {
  return `
    <section class="recently-viewed" data-section-id="${section.id}" style="padding:60px 20px; background:white;">
      <div style="max-width:1200px; margin:0 auto;">
        <h2 style="font-size:2.5rem; color:#001f3f; margin-bottom:40px;">${section.title || '🕐 Zuletzt angesehen'}</h2>
        <div id="recently-viewed-products" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(250px, 1fr)); gap:20px;">
          <div style="text-align:center; color:#999; padding:40px;">
            <i class="fas fa-clock" style="font-size:3rem; margin-bottom:15px;"></i>
            <p>Ihre kürzlich besuchten Produkte erscheinen hier</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Customer Reviews Section (Homepage)
function renderCustomerReviewsSection(section, config) {
  return `
    <section class="customer-reviews-section" data-section-id="${section.id}" style="padding:60px 20px; background:#f8f9fa;">
      <div style="max-width:1200px; margin:0 auto;">
        <h2 style="text-align:center; font-size:2.5rem; color:#001f3f; margin-bottom:40px;">${section.title || '⭐ Kundenbewertungen'}</h2>
        
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:30px;">
          <div style="background:white; padding:30px; border-radius:15px; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
            <div style="color:#FFC107; font-size:1.5rem; margin-bottom:15px;">★★★★★</div>
            <p style="color:#666; line-height:1.6; margin-bottom:15px;">"Schnelle Lieferung und funktionierender Key. Immer wieder gerne!"</p>
            <div style="font-weight:bold; color:#001f3f;">- Michael S.</div>
          </div>
          
          <div style="background:white; padding:30px; border-radius:15px; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
            <div style="color:#FFC107; font-size:1.5rem; margin-bottom:15px;">★★★★★</div>
            <p style="color:#666; line-height:1.6; margin-bottom:15px;">"Top Preis-Leistung! Lizenz wurde sofort nach Zahlung geliefert."</p>
            <div style="font-weight:bold; color:#001f3f;">- Sarah K.</div>
          </div>
          
          <div style="background:white; padding:30px; border-radius:15px; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
            <div style="color:#FFC107; font-size:1.5rem; margin-bottom:15px;">★★★★★</div>
            <p style="color:#666; line-height:1.6; margin-bottom:15px;">"Sehr guter Support bei Fragen. Kann ich nur empfehlen!"</p>
            <div style="font-weight:bold; color:#001f3f;">- Thomas M.</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Placeholder renderers for remaining sections
function renderFeatureSection(section, config) {
  // Route specific feature sections
  if (section.section_key === 'countdown_deals') {
    return renderCountdownDeals(section, config);
  } else if (section.section_key === 'license_comparison') {
    return renderLicenseComparison(section, config);
  } else if (section.section_key === 'bundle_deals') {
    return renderBundleDealsSection(section, config);
  } else if (section.section_key === 'installation_guide') {
    return renderInstallationGuide(section, config);
  } else if (section.section_key === 'trust_security') {
    return renderTrustSecurity(section, config);
  } else if (section.section_key === 'license_preview') {
    return renderLicensePreview(section, config);
  } else if (section.section_key === 'volume_calculator') {
    return renderVolumeCalculatorWidget(section, config);
  } else if (section.section_key === 'recently_viewed') {
    return renderRecentlyViewed(section, config);
  } else if (section.section_key === 'customer_reviews') {
    return renderCustomerReviewsSection(section, config);
  }
  
  // Default feature section
  return `
    <section class="feature-section" data-section-id="${section.id}" style="padding:60px 20px; background:#f8f9fa;">
      <div style="max-width:1200px; margin:0 auto; text-align:center;">
        <h2 style="font-size:2.5rem; color:#001f3f; margin-bottom:20px;">${section.title || 'Feature Section'}</h2>
        <p style="font-size:1.2rem; color:#666;">${section.subtitle || ''}</p>
      </div>
    </section>
  `;
}

function renderStaticSection(section, config) {
  // Route specific static sections
  if (section.section_key === 'faq') {
    return `
      <section class="faq-section" data-section-id="${section.id}" style="padding:60px 20px; background:white;">
        <div style="max-width:800px; margin:0 auto;">
          <h2 style="text-align:center; font-size:2.5rem; color:#001f3f; margin-bottom:40px;">${section.title || '❓ Häufig gestellte Fragen'}</h2>
          <div style="space-y:20px;">
            <details style="background:#f8f9fa; padding:20px; border-radius:10px; margin-bottom:15px; cursor:pointer;">
              <summary style="font-weight:bold; font-size:1.1rem; color:#001f3f;">Wie erhalte ich meinen Lizenzschlüssel?</summary>
              <p style="margin-top:15px; color:#666;">Sie erhalten Ihren Lizenzschlüssel sofort nach erfolgreicher Zahlung per E-Mail.</p>
            </details>
            <details style="background:#f8f9fa; padding:20px; border-radius:10px; margin-bottom:15px; cursor:pointer;">
              <summary style="font-weight:bold; font-size:1.1rem; color:#001f3f;">Sind die Lizenzen legal?</summary>
              <p style="margin-top:15px; color:#666;">Ja, alle unsere Lizenzen sind 100% legal und stammen von autorisierten Händlern.</p>
            </details>
            <details style="background:#f8f9fa; padding:20px; border-radius:10px; margin-bottom:15px; cursor:pointer;">
              <summary style="font-weight:bold; font-size:1.1rem; color:#001f3f;">Kann ich die Lizenz zurückgeben?</summary>
              <p style="margin-top:15px; color:#666;">Ja, Sie haben ein 14-tägiges Widerrufsrecht gemäß deutschen Gesetzen.</p>
            </details>
          </div>
        </div>
      </section>
    `;
  } else if (section.section_key === 'bekannt_aus') {
    return `
      <section class="bekannt-aus" data-section-id="${section.id}" style="padding:60px 20px; background:#f8f9fa;">
        <div style="max-width:1200px; margin:0 auto; text-align:center;">
          <h2 style="font-size:2rem; color:#001f3f; margin-bottom:40px;">${section.title || 'Bekannt aus'}</h2>
          <div style="display:flex; justify-content:center; align-items:center; gap:40px; flex-wrap:wrap; opacity:0.6;">
            <div style="font-size:1.5rem; font-weight:bold; color:#001f3f;">Chip.de</div>
            <div style="font-size:1.5rem; font-weight:bold; color:#001f3f;">ComputerBild</div>
            <div style="font-size:1.5rem; font-weight:bold; color:#001f3f;">PC-Welt</div>
            <div style="font-size:1.5rem; font-weight:bold; color:#001f3f;">Heise</div>
          </div>
        </div>
      </section>
    `;
  } else if (section.section_key === 'b2b') {
    return `
      <section class="b2b-section" data-section-id="${section.id}" style="padding:60px 20px; background:linear-gradient(135deg, #003366 0%, #001f3f 100%); color:white;">
        <div style="max-width:1000px; margin:0 auto; text-align:center;">
          <h2 style="font-size:2.5rem; margin-bottom:15px;">${section.title || '🏢 Attraktive Angebote für Firmen'}</h2>
          <p style="font-size:1.2rem; margin-bottom:30px; opacity:0.9;">Großbestellungen, individuelle Konditionen, persönliche Betreuung</p>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:20px; margin-bottom:30px;">
            <div><i class="fas fa-percentage" style="font-size:2rem; color:#FFC107; margin-bottom:10px;"></i><br/>Mengenrabatte</div>
            <div><i class="fas fa-file-invoice" style="font-size:2rem; color:#FFC107; margin-bottom:10px;"></i><br/>Kauf auf Rechnung</div>
            <div><i class="fas fa-user-tie" style="font-size:2rem; color:#FFC107; margin-bottom:10px;"></i><br/>Persönlicher Ansprechpartner</div>
          </div>
          <a href="/kontakt" style="display:inline-block; background:#FFC107; color:#001f3f; padding:15px 40px; border-radius:25px; text-decoration:none; font-weight:bold;">Jetzt anfragen</a>
        </div>
      </section>
    `;
  } else if (section.section_key === 'partners') {
    return `
      <section class="partners-section" data-section-id="${section.id}" style="padding:60px 20px; background:white;">
        <div style="max-width:1200px; margin:0 auto; text-align:center;">
          <h2 style="font-size:2.5rem; color:#001f3f; margin-bottom:40px;">${section.title || '🤝 Unsere Partner'}</h2>
          <div style="display:flex; justify-content:center; align-items:center; gap:60px; flex-wrap:wrap;">
            <div style="font-size:2rem; font-weight:bold; color:#003366;">Microsoft</div>
            <div style="font-size:2rem; font-weight:bold; color:#003366;">Adobe</div>
            <div style="font-size:2rem; font-weight:bold; color:#003366;">Kaspersky</div>
            <div style="font-size:2rem; font-weight:bold; color:#003366;">Autodesk</div>
          </div>
        </div>
      </section>
    `;
  } else if (section.section_key === 'process_steps') {
    return `
      <section class="process-steps" data-section-id="${section.id}" style="padding:60px 20px; background:#f8f9fa;">
        <div style="max-width:1000px; margin:0 auto; text-align:center;">
          <h2 style="font-size:2.5rem; color:#001f3f; margin-bottom:40px;">${section.title || '📋 So einfach geht\'s'}</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:30px;">
            <div>
              <div style="width:80px; height:80px; background:#FFC107; border-radius:50%; margin:0 auto 20px; display:flex; align-items:center; justify-content:center; font-size:2rem; color:#001f3f;">1</div>
              <h3 style="font-size:1.2rem; color:#001f3f; margin-bottom:10px;">Produkt wählen</h3>
              <p style="color:#666;">Finden Sie die passende Software</p>
            </div>
            <div>
              <div style="width:80px; height:80px; background:#FFC107; border-radius:50%; margin:0 auto 20px; display:flex; align-items:center; justify-content:center; font-size:2rem; color:#001f3f;">2</div>
              <h3 style="font-size:1.2rem; color:#001f3f; margin-bottom:10px;">Bestellen</h3>
              <p style="color:#666;">Sicher bezahlen</p>
            </div>
            <div>
              <div style="width:80px; height:80px; background:#FFC107; border-radius:50%; margin:0 auto 20px; display:flex; align-items:center; justify-content:center; font-size:2rem; color:#001f3f;">3</div>
              <h3 style="font-size:1.2rem; color:#001f3f; margin-bottom:10px;">Sofort nutzen</h3>
              <p style="color:#666;">Lizenz per E-Mail erhalten</p>
            </div>
          </div>
        </div>
      </section>
    `;
  } else if (section.section_key === 'category_grid') {
    return `
      <section class="category-grid" data-section-id="${section.id}" style="padding:60px 20px; background:white;">
        <div style="max-width:1200px; margin:0 auto;">
          <h2 style="text-align:center; font-size:2.5rem; color:#001f3f; margin-bottom:40px;">${section.title || '📁 Beliebte Software-Kategorien'}</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:20px;">
            <a href="/produkte?category=windows" style="background:#f8f9fa; padding:30px; border-radius:10px; text-decoration:none; text-align:center; transition:transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
              <i class="fab fa-windows" style="font-size:3rem; color:#001f3f; margin-bottom:15px;"></i>
              <h3 style="color:#001f3f;">Windows</h3>
            </a>
            <a href="/produkte?category=office" style="background:#f8f9fa; padding:30px; border-radius:10px; text-decoration:none; text-align:center; transition:transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
              <i class="fas fa-file-word" style="font-size:3rem; color:#001f3f; margin-bottom:15px;"></i>
              <h3 style="color:#001f3f;">Office</h3>
            </a>
            <a href="/produkte?category=server" style="background:#f8f9fa; padding:30px; border-radius:10px; text-decoration:none; text-align:center; transition:transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
              <i class="fas fa-server" style="font-size:3rem; color:#001f3f; margin-bottom:15px;"></i>
              <h3 style="color:#001f3f;">Server</h3>
            </a>
            <a href="/produkte?category=antivirus" style="background:#f8f9fa; padding:30px; border-radius:10px; text-decoration:none; text-align:center; transition:transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
              <i class="fas fa-shield-virus" style="font-size:3rem; color:#001f3f; margin-bottom:15px;"></i>
              <h3 style="color:#001f3f;">Antivirus</h3>
            </a>
          </div>
        </div>
      </section>
    `;
  } else if (section.section_key === 'newsletter') {
    return `
      <section class="newsletter-section" data-section-id="${section.id}" style="padding:60px 20px; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); color:white;">
        <div style="max-width:800px; margin:0 auto; text-align:center;">
          <h2 style="font-size:2.5rem; margin-bottom:15px;">${section.title || '📧 Newsletter abonnieren'}</h2>
          <p style="font-size:1.2rem; margin-bottom:30px; opacity:0.9;">Erhalten Sie exklusive Angebote und Neuigkeiten direkt in Ihr Postfach</p>
          <form style="display:flex; gap:10px; max-width:500px; margin:0 auto;">
            <input type="email" placeholder="Ihre E-Mail-Adresse" style="flex:1; padding:15px; border:none; border-radius:25px; font-size:1rem;" required>
            <button type="submit" style="background:#FFC107; color:#001f3f; padding:15px 30px; border:none; border-radius:25px; font-weight:bold; cursor:pointer; white-space:nowrap;">Anmelden</button>
          </form>
        </div>
      </section>
    `;
  } else if (section.section_key === 'language_support') {
    return `
      <section class="language-support" data-section-id="${section.id}" style="padding:60px 20px; background:white;">
        <div style="max-width:1000px; margin:0 auto; text-align:center;">
          <h2 style="font-size:2.5rem; color:#001f3f; margin-bottom:40px;">${section.title || '🌍 Mehrsprachiger Support'}</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:30px;">
            <div><span style="font-size:3rem;">🇩🇪</span><br/><strong>Deutsch</strong></div>
            <div><span style="font-size:3rem;">🇬🇧</span><br/><strong>English</strong></div>
            <div><span style="font-size:3rem;">🇫🇷</span><br/><strong>Français</strong></div>
            <div><span style="font-size:3rem;">🇪🇸</span><br/><strong>Español</strong></div>
          </div>
        </div>
      </section>
    `;
  } else if (section.section_key === 'live_chat') {
    return `
      <section class="live-chat" data-section-id="${section.id}" style="padding:60px 20px; background:#f8f9fa;">
        <div style="max-width:800px; margin:0 auto; text-align:center;">
          <h2 style="font-size:2.5rem; color:#001f3f; margin-bottom:20px;">${section.title || '💬 Live Support'}</h2>
          <p style="font-size:1.2rem; color:#666; margin-bottom:30px;">Haben Sie Fragen? Unser Team ist für Sie da!</p>
          <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
            <a href="/kontakt" style="display:inline-block; background:#00A859; color:white; padding:15px 40px; border-radius:25px; text-decoration:none; font-weight:bold;">
              <i class="fas fa-comments"></i> Chat starten
            </a>
            <a href="tel:+49..." style="display:inline-block; background:#001f3f; color:white; padding:15px 40px; border-radius:25px; text-decoration:none; font-weight:bold;">
              <i class="fas fa-phone"></i> Anrufen
            </a>
          </div>
        </div>
      </section>
    `;
  }
  
  // Default static section
  return `
    <section class="static-section" data-section-id="${section.id}" style="padding:60px 20px;">
      <div style="max-width:1200px; margin:0 auto;">
        <h2 style="text-align:center; font-size:2.5rem; color:#001f3f; margin-bottom:40px;">${section.title || 'Static Section'}</h2>
        <div style="text-align:center; color:#666;">${section.subtitle || ''}</div>
      </div>
    </section>
  `;
}

function renderWidgetSection(section, config) {
  return `
    <section class="widget-section" data-section-id="${section.id}" style="padding:40px 20px;">
      <div style="max-width:1200px; margin:0 auto;">
        <div style="text-align:center; color:#666;">Widget: ${section.title || 'Widget Section'}</div>
      </div>
    </section>
  `;
}

function renderPlaceholder(section) {
  return `
    <section class="placeholder-section" data-section-id="${section.id}" style="padding:40px 20px; background:#f0f0f0; border:2px dashed #ccc;">
      <div style="max-width:1200px; margin:0 auto; text-align:center; color:#999;">
        <p>Section: ${section.section_key} (ID: ${section.id})</p>
        <p>Title: ${section.title || 'No title'}</p>
      </div>
    </section>
  `;
}

// Slider functionality
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
  const slides = document.querySelectorAll('.hero-slider .slide');
  const dots = document.querySelectorAll('.slider-dot');
  
  slides[currentSlide].style.display = 'none';
  dots[currentSlide].style.background = 'rgba(255,255,255,0.5)';
  dots[currentSlide].classList.remove('active');
  
  currentSlide = index;
  
  slides[currentSlide].style.display = 'flex';
  dots[currentSlide].style.background = '#FFC107';
  dots[currentSlide].classList.add('active');
}

function nextSlide() {
  const slides = document.querySelectorAll('.hero-slider .slide');
  goToSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
  const slides = document.querySelectorAll('.hero-slider .slide');
  goToSlide((currentSlide - 1 + slides.length) % slides.length);
}

function startAutoRotate() {
  const slides = document.querySelectorAll('.hero-slider .slide');
  if (slides.length > 1) {
    slideInterval = setInterval(nextSlide, 5000);
  }
}

function stopAutoRotate() {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
}

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll('.counter[data-target]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  });
}

// Countdown timer for flash deals
function updateCountdownTimers() {
  const timers = document.querySelectorAll('.countdown-timer[data-end-time]');
  
  timers.forEach(timer => {
    const endTime = parseInt(timer.getAttribute('data-end-time'));
    const now = new Date().getTime();
    const distance = endTime - now;
    
    if (distance > 0) {
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      const hoursEl = timer.querySelector('.hours');
      const minutesEl = timer.querySelector('.minutes');
      const secondsEl = timer.querySelector('.seconds');
      
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }
  });
}

// Initialize on load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    startAutoRotate();
    animateCounters();
    updateCountdownTimers();
    
    // Update countdown every second
    setInterval(updateCountdownTimers, 1000);
  });
}
