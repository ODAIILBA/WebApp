import type { FC } from 'hono/jsx'

interface ProductDetailProps {
  product: any
  language: string
}

export const ProductDetail: FC<ProductDetailProps> = ({ product, language }) => {
  const t = language === 'de' ? {
    addToCart: 'In den Warenkorb',
    addToWishlist: 'Zur Wunschliste',
    buyNow: 'Jetzt kaufen',
    description: 'Beschreibung',
    features: 'Funktionen',
    systemRequirements: 'Systemanforderungen',
    reviews: 'Bewertungen',
    delivery: 'Lieferung',
    instantDelivery: 'Sofortiger digitaler Download',
    licenseInfo: 'Lizenzinformationen',
    shareProduct: 'Produkt teilen',
    productCode: 'Produktcode',
    availability: 'Verfügbarkeit',
    inStock: 'Auf Lager',
    rating: 'Bewertung',
    reviews_count: 'Bewertungen',
    relatedProducts: 'Ähnliche Produkte',
    recentlyViewed: 'Kürzlich angesehen',
    quantity: 'Menge',
    price: 'Preis',
    includingVAT: 'inkl. MwSt.',
    specifications: 'Spezifikationen'
  } : {
    addToCart: 'Add to Cart',
    addToWishlist: 'Add to Wishlist',
    buyNow: 'Buy Now',
    description: 'Description',
    features: 'Features',
    systemRequirements: 'System Requirements',
    reviews: 'Reviews',
    delivery: 'Delivery',
    instantDelivery: 'Instant Digital Download',
    licenseInfo: 'License Information',
    shareProduct: 'Share Product',
    productCode: 'Product Code',
    availability: 'Availability',
    inStock: 'In Stock',
    rating: 'Rating',
    reviews_count: 'Reviews',
    relatedProducts: 'Related Products',
    recentlyViewed: 'Recently Viewed',
    quantity: 'Quantity',
    price: 'Price',
    includingVAT: 'incl. VAT',
    specifications: 'Specifications'
  }

  return (
    <div class="product-detail-page">
      {/* Breadcrumb */}
      <div class="breadcrumb">
        <a href="/">Home</a>
        <span class="separator">/</span>
        <a href="/products">{language === 'de' ? 'Produkte' : 'Products'}</a>
        <span class="separator">/</span>
        <span class="current">{product.name}</span>
      </div>

      <div class="product-detail-container">
        {/* Left: Image Gallery */}
        <div class="product-gallery">
          <div class="main-image">
            <img 
              id="main-product-image" 
              src={product.image || 'https://placehold.co/600x600?text=Product+Image'} 
              alt={product.name}
            />
            <button class="zoom-btn" onclick="openImageLightbox()">
              <i class="fas fa-search-plus"></i>
            </button>
          </div>
          <div class="thumbnail-gallery">
            <div class="thumbnail active" onclick="changeMainImage(this)">
              <img src={product.image || 'https://placehold.co/100x100?text=1'} alt="Thumbnail 1" />
            </div>
            <div class="thumbnail" onclick="changeMainImage(this)">
              <img src="https://placehold.co/100x100?text=2" alt="Thumbnail 2" />
            </div>
            <div class="thumbnail" onclick="changeMainImage(this)">
              <img src="https://placehold.co/100x100?text=3" alt="Thumbnail 3" />
            </div>
            <div class="thumbnail" onclick="changeMainImage(this)">
              <img src="https://placehold.co/100x100?text=4" alt="Thumbnail 4" />
            </div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div class="product-info">
          <h1 class="product-title">{product.name}</h1>
          
          {/* Rating */}
          <div class="product-rating">
            <div class="stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
            </div>
            <span class="rating-value">4.8</span>
            <span class="reviews-count">(234 {t.reviews_count})</span>
          </div>

          {/* Price */}
          <div class="product-price">
            <div class="current-price">
              <span class="price-amount">€{product.price || '149.99'}</span>
              <span class="vat-info">{t.includingVAT}</span>
            </div>
            {product.discount_price && (
              <div class="old-price">€{product.discount_price}</div>
            )}
          </div>

          {/* Trust Badges */}
          <div class="trust-badges">
            <div class="badge">
              <i class="fas fa-shipping-fast"></i>
              <span>{t.instantDelivery}</span>
            </div>
            <div class="badge">
              <i class="fas fa-shield-alt"></i>
              <span>{language === 'de' ? 'SSL Verschlüsselt' : 'SSL Encrypted'}</span>
            </div>
            <div class="badge">
              <i class="fas fa-undo"></i>
              <span>{language === 'de' ? '30 Tage Rückgaberecht' : '30 Days Return'}</span>
            </div>
          </div>

          {/* Short Description */}
          <div class="short-description">
            <p>{product.short_description || 'Vollständige Softwarelizenz mit sofortiger digitaler Lieferung. Offiziell und rechtmäßig. Lebenslange Nutzung.'}</p>
          </div>

          {/* Availability */}
          <div class="availability">
            <span class="label">{t.availability}:</span>
            <span class="status in-stock">
              <i class="fas fa-check-circle"></i> {t.inStock}
            </span>
          </div>

          {/* License Type (if applicable) */}
          <div class="license-selector">
            <label>{t.licenseInfo}:</label>
            <select class="form-control" id="license-type">
              <option value="single">1 Gerät - €149.99</option>
              <option value="multi">3 Geräte - €249.99</option>
              <option value="business">5 Geräte (Business) - €399.99</option>
            </select>
          </div>

          {/* Quantity */}
          <div class="quantity-selector">
            <label>{t.quantity}:</label>
            <div class="quantity-controls">
              <button class="qty-btn" onclick="decreaseQuantity()">-</button>
              <input type="number" id="product-quantity" value="1" min="1" max="99" />
              <button class="qty-btn" onclick="increaseQuantity()">+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div class="product-actions">
            <button class="btn-primary btn-large" onclick="addToCart()">
              <i class="fas fa-shopping-cart"></i> {t.addToCart}
            </button>
            <button class="btn-secondary btn-large" onclick="buyNow()">
              <i class="fas fa-bolt"></i> {t.buyNow}
            </button>
            <button class="btn-icon" onclick="addToWishlist()" title={t.addToWishlist}>
              <i class="far fa-heart"></i>
            </button>
            <button class="btn-icon" onclick="shareProduct()" title={t.shareProduct}>
              <i class="fas fa-share-alt"></i>
            </button>
          </div>

          {/* Product Meta */}
          <div class="product-meta">
            <div class="meta-item">
              <span class="label">{t.productCode}:</span>
              <span class="value">{product.sku || 'MS-OFF-2021-PRO'}</span>
            </div>
            <div class="meta-item">
              <span class="label">{language === 'de' ? 'Kategorie' : 'Category'}:</span>
              <span class="value">{product.category || 'Office Software'}</span>
            </div>
            <div class="meta-item">
              <span class="label">{language === 'de' ? 'Marke' : 'Brand'}:</span>
              <span class="value">{product.brand || 'Microsoft'}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div class="payment-methods">
            <span class="label">{language === 'de' ? 'Zahlungsmethoden' : 'Payment Methods'}:</span>
            <div class="payment-icons">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png" alt="PayPal" />
              <i class="fab fa-cc-visa"></i>
              <i class="fab fa-cc-mastercard"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div class="product-tabs">
        <div class="tabs-nav">
          <button class="tab-btn active" onclick="switchTab('description')">{t.description}</button>
          <button class="tab-btn" onclick="switchTab('features')">{t.features}</button>
          <button class="tab-btn" onclick="switchTab('requirements')">{t.systemRequirements}</button>
          <button class="tab-btn" onclick="switchTab('reviews')">{t.reviews} (234)</button>
        </div>

        <div class="tabs-content">
          {/* Description Tab */}
          <div id="tab-description" class="tab-pane active">
            <h3>{t.description}</h3>
            <p>{product.description || 'Microsoft Office 2021 Professional Plus ist die vollständige Office-Suite für professionelle Anwender. Enthält Word, Excel, PowerPoint, Outlook, Access, Publisher und mehr.'}</p>
            <h4>{language === 'de' ? 'Hauptmerkmale' : 'Key Features'}:</h4>
            <ul>
              <li>Vollständige Office-Suite mit allen Anwendungen</li>
              <li>Unbegrenzte Nutzungsdauer - einmalige Zahlung</li>
              <li>Offizielle Microsoft-Lizenz</li>
              <li>Sofortiger digitaler Download</li>
              <li>Deutscher Support und Updates</li>
            </ul>
          </div>

          {/* Features Tab */}
          <div id="tab-features" class="tab-pane">
            <h3>{t.features}</h3>
            <div class="features-grid">
              <div class="feature-item">
                <i class="fas fa-file-word"></i>
                <h4>Word</h4>
                <p>Professionelle Textverarbeitung</p>
              </div>
              <div class="feature-item">
                <i class="fas fa-file-excel"></i>
                <h4>Excel</h4>
                <p>Leistungsstarke Tabellenkalkulation</p>
              </div>
              <div class="feature-item">
                <i class="fas fa-file-powerpoint"></i>
                <h4>PowerPoint</h4>
                <p>Beeindruckende Präsentationen</p>
              </div>
              <div class="feature-item">
                <i class="fas fa-envelope"></i>
                <h4>Outlook</h4>
                <p>E-Mail und Kalender Management</p>
              </div>
            </div>
          </div>

          {/* System Requirements Tab */}
          <div id="tab-requirements" class="tab-pane">
            <h3>{t.systemRequirements}</h3>
            <div class="requirements-grid">
              <div class="req-column">
                <h4>Windows</h4>
                <ul>
                  <li><strong>OS:</strong> Windows 10, Windows 11</li>
                  <li><strong>Prozessor:</strong> 1.6 GHz oder schneller</li>
                  <li><strong>RAM:</strong> 4 GB (64-bit)</li>
                  <li><strong>Festplatte:</strong> 4 GB verfügbar</li>
                  <li><strong>Display:</strong> 1280 x 768 Auflösung</li>
                </ul>
              </div>
              <div class="req-column">
                <h4>{language === 'de' ? 'Zusätzliche Anforderungen' : 'Additional Requirements'}</h4>
                <ul>
                  <li>Internet-Verbindung für Aktivierung</li>
                  <li>Microsoft-Konto empfohlen</li>
                  <li>.NET Version 3.5 oder höher</li>
                  <li>DirectX 9 oder höher</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reviews Tab */}
          <div id="tab-reviews" class="tab-pane">
            <h3>{t.reviews}</h3>
            <div class="reviews-summary">
              <div class="rating-overview">
                <div class="avg-rating">4.8</div>
                <div class="stars-large">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half-alt"></i>
                </div>
                <div class="total-reviews">234 Bewertungen</div>
              </div>
              <div class="rating-bars">
                <div class="rating-bar">
                  <span class="stars-label">5 ★</span>
                  <div class="bar"><div class="bar-fill" style="width: 75%"></div></div>
                  <span class="count">176</span>
                </div>
                <div class="rating-bar">
                  <span class="stars-label">4 ★</span>
                  <div class="bar"><div class="bar-fill" style="width: 15%"></div></div>
                  <span class="count">35</span>
                </div>
                <div class="rating-bar">
                  <span class="stars-label">3 ★</span>
                  <div class="bar"><div class="bar-fill" style="width: 7%"></div></div>
                  <span class="count">16</span>
                </div>
                <div class="rating-bar">
                  <span class="stars-label">2 ★</span>
                  <div class="bar"><div class="bar-fill" style="width: 2%"></div></div>
                  <span class="count">5</span>
                </div>
                <div class="rating-bar">
                  <span class="stars-label">1 ★</span>
                  <div class="bar"><div class="bar-fill" style="width: 1%"></div></div>
                  <span class="count">2</span>
                </div>
              </div>
            </div>

            <div class="reviews-list">
              <div class="review-item">
                <div class="review-header">
                  <div class="reviewer-name">Max M.</div>
                  <div class="review-stars">★★★★★</div>
                </div>
                <div class="review-date">Vor 2 Tagen</div>
                <div class="review-text">
                  Sehr schnelle Lieferung, Lizenzschlüssel funktioniert einwandfrei. Installation war problemlos. Kann ich nur empfehlen!
                </div>
                <div class="review-helpful">
                  War diese Bewertung hilfreich? <button>Ja (12)</button> <button>Nein (1)</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div class="related-products-section">
        <h3>{t.relatedProducts}</h3>
        <div class="products-carousel" id="related-products"></div>
      </div>

      {/* Recently Viewed */}
      <div class="recently-viewed-section">
        <h3>{t.recentlyViewed}</h3>
        <div class="products-carousel" id="recently-viewed"></div>
      </div>

      {/* Lightbox Modal */}
      <div id="image-lightbox" class="lightbox">
        <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
        <img id="lightbox-image" src="" alt="" />
        <button class="lightbox-prev" onclick="prevImage()">‹</button>
        <button class="lightbox-next" onclick="nextImage()">›</button>
      </div>

      <style>{`
        .product-detail-page {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
        }
        .breadcrumb {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          font-size: 14px;
          color: #666;
        }
        .breadcrumb a {
          color: #1a2a4e;
          text-decoration: none;
        }
        .breadcrumb a:hover {
          text-decoration: underline;
        }
        .product-detail-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 60px;
        }
        .product-gallery {
          position: sticky;
          top: 20px;
          height: fit-content;
        }
        .main-image {
          position: relative;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 20px;
        }
        .main-image img {
          width: 100%;
          height: auto;
          display: block;
        }
        .zoom-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.9);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .thumbnail-gallery {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .thumbnail {
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s;
        }
        .thumbnail:hover,
        .thumbnail.active {
          border-color: #d4af37;
        }
        .thumbnail img {
          width: 100%;
          height: auto;
          display: block;
        }
        .product-title {
          font-size: 32px;
          color: #1a2a4e;
          margin-bottom: 15px;
          font-weight: 600;
        }
        .product-rating {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .stars {
          color: #ffc107;
          font-size: 18px;
        }
        .rating-value {
          font-weight: 600;
          color: #1a2a4e;
        }
        .reviews-count {
          color: #666;
          font-size: 14px;
        }
        .product-price {
          margin-bottom: 25px;
        }
        .current-price {
          display: flex;
          align-items: baseline;
          gap: 10px;
        }
        .price-amount {
          font-size: 42px;
          font-weight: bold;
          color: #1a2a4e;
        }
        .vat-info {
          font-size: 14px;
          color: #666;
        }
        .old-price {
          font-size: 24px;
          color: #999;
          text-decoration: line-through;
          margin-top: 5px;
        }
        .trust-badges {
          display: flex;
          gap: 15px;
          margin-bottom: 25px;
          flex-wrap: wrap;
        }
        .trust-badges .badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 15px;
          background: #f0f8ff;
          border-radius: 5px;
          font-size: 14px;
          color: #1a2a4e;
        }
        .trust-badges .badge i {
          color: #28a745;
        }
        .short-description {
          margin-bottom: 25px;
          line-height: 1.6;
          color: #666;
        }
        .availability {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .availability .label {
          font-weight: 600;
          color: #333;
        }
        .status.in-stock {
          color: #28a745;
          font-weight: 600;
        }
        .license-selector,
        .quantity-selector {
          margin-bottom: 20px;
        }
        .license-selector label,
        .quantity-selector label {
          display: block;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }
        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0;
          width: 140px;
          border: 1px solid #ddd;
          border-radius: 5px;
          overflow: hidden;
        }
        .qty-btn {
          width: 40px;
          height: 44px;
          background: white;
          border: none;
          cursor: pointer;
          font-size: 20px;
          color: #1a2a4e;
          transition: all 0.2s;
        }
        .qty-btn:hover {
          background: #f8f9fa;
        }
        #product-quantity {
          width: 60px;
          height: 44px;
          border: none;
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
          text-align: center;
          font-size: 16px;
          font-weight: 600;
        }
        .product-actions {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
        }
        .btn-large {
          flex: 1;
          padding: 15px 30px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s;
        }
        .btn-primary {
          background: #1a2a4e;
          color: white;
        }
        .btn-primary:hover {
          background: #2a3a5e;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(26, 42, 78, 0.3);
        }
        .btn-secondary {
          background: #d4af37;
          color: #1a2a4e;
        }
        .btn-secondary:hover {
          background: #b8941f;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        }
        .btn-icon {
          width: 52px;
          height: 52px;
          background: white;
          border: 2px solid #ddd;
          border-radius: 8px;
          cursor: pointer;
          font-size: 18px;
          color: #1a2a4e;
          transition: all 0.3s;
        }
        .btn-icon:hover {
          border-color: #d4af37;
          color: #d4af37;
        }
        .product-meta {
          border-top: 1px solid #e0e0e0;
          padding-top: 20px;
          margin-bottom: 20px;
        }
        .meta-item {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
          font-size: 14px;
        }
        .meta-item .label {
          color: #666;
        }
        .meta-item .value {
          color: #1a2a4e;
          font-weight: 600;
        }
        .payment-methods {
          border-top: 1px solid #e0e0e0;
          padding-top: 20px;
        }
        .payment-methods .label {
          display: block;
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
        }
        .payment-icons {
          display: flex;
          gap: 15px;
          align-items: center;
          flex-wrap: wrap;
        }
        .payment-icons img {
          height: 30px;
          width: auto;
        }
        .payment-icons i {
          font-size: 32px;
          color: #666;
        }
        .product-tabs {
          margin: 60px 0;
        }
        .tabs-nav {
          display: flex;
          gap: 5px;
          border-bottom: 2px solid #e0e0e0;
          margin-bottom: 30px;
        }
        .tab-btn {
          padding: 15px 30px;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          color: #666;
          transition: all 0.3s;
        }
        .tab-btn:hover {
          color: #1a2a4e;
        }
        .tab-btn.active {
          color: #1a2a4e;
          border-bottom-color: #d4af37;
        }
        .tab-pane {
          display: none;
        }
        .tab-pane.active {
          display: block;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          margin-top: 30px;
        }
        .feature-item {
          text-align: center;
          padding: 30px;
          background: #f8f9fa;
          border-radius: 10px;
        }
        .feature-item i {
          font-size: 48px;
          color: #d4af37;
          margin-bottom: 15px;
        }
        .feature-item h4 {
          color: #1a2a4e;
          margin-bottom: 10px;
        }
        .requirements-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 30px;
        }
        .req-column h4 {
          color: #1a2a4e;
          margin-bottom: 15px;
        }
        .req-column ul {
          list-style: none;
          padding: 0;
        }
        .req-column ul li {
          padding: 8px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        .reviews-summary {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 40px;
          margin-bottom: 40px;
          padding: 30px;
          background: #f8f9fa;
          border-radius: 10px;
        }
        .rating-overview {
          text-align: center;
        }
        .avg-rating {
          font-size: 64px;
          font-weight: bold;
          color: #1a2a4e;
        }
        .stars-large {
          color: #ffc107;
          font-size: 24px;
          margin: 10px 0;
        }
        .rating-bars {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .rating-bar {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .stars-label {
          width: 50px;
          color: #666;
        }
        .bar {
          flex: 1;
          height: 10px;
          background: #e0e0e0;
          border-radius: 5px;
          overflow: hidden;
        }
        .bar-fill {
          height: 100%;
          background: #ffc107;
        }
        .rating-bar .count {
          width: 50px;
          text-align: right;
          color: #666;
        }
        .review-item {
          border-bottom: 1px solid #e0e0e0;
          padding: 20px 0;
        }
        .review-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .reviewer-name {
          font-weight: 600;
          color: #1a2a4e;
        }
        .review-stars {
          color: #ffc107;
        }
        .review-date {
          font-size: 14px;
          color: #999;
          margin-bottom: 10px;
        }
        .review-text {
          line-height: 1.6;
          color: #666;
          margin-bottom: 15px;
        }
        .review-helpful button {
          border: 1px solid #ddd;
          background: white;
          padding: 5px 15px;
          border-radius: 5px;
          margin-right: 10px;
          cursor: pointer;
        }
        .related-products-section,
        .recently-viewed-section {
          margin: 60px 0;
        }
        .related-products-section h3,
        .recently-viewed-section h3 {
          font-size: 28px;
          color: #1a2a4e;
          margin-bottom: 30px;
        }
        .products-carousel {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        .lightbox {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.95);
          z-index: 10000;
          align-items: center;
          justify-content: center;
        }
        .lightbox img {
          max-width: 90%;
          max-height: 90%;
        }
        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 40px;
          font-size: 48px;
          color: white;
          background: none;
          border: none;
          cursor: pointer;
        }
        .lightbox-prev,
        .lightbox-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 64px;
          color: white;
          background: none;
          border: none;
          cursor: pointer;
          padding: 20px;
        }
        .lightbox-prev { left: 20px; }
        .lightbox-next { right: 20px; }
        @media (max-width: 1024px) {
          .product-detail-container {
            grid-template-columns: 1fr;
          }
          .product-gallery {
            position: relative;
          }
        }
        @media (max-width: 768px) {
          .product-title {
            font-size: 24px;
          }
          .price-amount {
            font-size: 32px;
          }
          .tabs-nav {
            overflow-x: auto;
          }
          .tab-btn {
            padding: 12px 20px;
            font-size: 14px;
          }
          .features-grid,
          .requirements-grid {
            grid-template-columns: 1fr;
          }
          .reviews-summary {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        function changeMainImage(thumbnail) {
          const img = thumbnail.querySelector('img');
          document.getElementById('main-product-image').src = img.src;
          document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
          thumbnail.classList.add('active');
        }
        
        function openImageLightbox() {
          const mainImg = document.getElementById('main-product-image').src;
          document.getElementById('lightbox-image').src = mainImg;
          document.getElementById('image-lightbox').style.display = 'flex';
        }
        
        function closeLightbox() {
          document.getElementById('image-lightbox').style.display = 'none';
        }
        
        function prevImage() {
          // Navigate to previous image
        }
        
        function nextImage() {
          // Navigate to next image
        }
        
        function switchTab(tabName) {
          document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
          document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
          event.target.classList.add('active');
          document.getElementById('tab-' + tabName).classList.add('active');
        }
        
        function decreaseQuantity() {
          const input = document.getElementById('product-quantity');
          if (input.value > 1) {
            input.value = parseInt(input.value) - 1;
          }
        }
        
        function increaseQuantity() {
          const input = document.getElementById('product-quantity');
          if (input.value < 99) {
            input.value = parseInt(input.value) + 1;
          }
        }
        
        function addToCart() {
          const quantity = document.getElementById('product-quantity').value;
          const licenseType = document.getElementById('license-type').value;
          
          // Get cart from localStorage
          let cart = JSON.parse(localStorage.getItem('cart') || '[]');
          
          // Add product to cart
          cart.push({
            id: Date.now(),
            productId: '${product.id || 1}',
            name: '${product.name || 'Product'}',
            price: parseFloat('${product.price || 149.99}'),
            quantity: parseInt(quantity),
            licenseType: licenseType
          });
          
          // Save cart
          localStorage.setItem('cart', JSON.stringify(cart));
          
          // Show notification
          alert('Produkt wurde zum Warenkorb hinzugefügt!');
          
          // Update cart count in header
          updateCartCount();
        }
        
        function buyNow() {
          addToCart();
          window.location.href = '/checkout';
        }
        
        function addToWishlist() {
          let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
          wishlist.push({
            productId: '${product.id || 1}',
            name: '${product.name || 'Product'}',
            price: parseFloat('${product.price || 149.99}')
          });
          localStorage.setItem('wishlist', JSON.stringify(wishlist));
          alert('Zur Wunschliste hinzugefügt!');
        }
        
        function shareProduct() {
          if (navigator.share) {
            navigator.share({
              title: '${product.name || 'Product'}',
              text: 'Schau dir dieses Produkt an!',
              url: window.location.href
            });
          } else {
            // Fallback: Copy link
            navigator.clipboard.writeText(window.location.href);
            alert('Link kopiert!');
          }
        }
        
        function updateCartCount() {
          const cart = JSON.parse(localStorage.getItem('cart') || '[]');
          const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
          const cartBadge = document.querySelector('.cart-count');
          if (cartBadge) {
            cartBadge.textContent = cartCount;
          }
        }
        
        // Save to recently viewed
        function saveToRecentlyViewed() {
          let recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
          const product = {
            id: '${product.id || 1}',
            name: '${product.name || 'Product'}',
            price: '${product.price || 149.99}',
            image: '${product.image || ''}'
          };
          
          // Remove if already exists
          recent = recent.filter(p => p.id !== product.id);
          
          // Add to beginning
          recent.unshift(product);
          
          // Keep only last 10
          recent = recent.slice(0, 10);
          
          localStorage.setItem('recentlyViewed', JSON.stringify(recent));
        }
        
        // Initialize
        updateCartCount();
        saveToRecentlyViewed();
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            closeLightbox();
          }
        });
      ` }} ></script>
    </div>
  )
}
