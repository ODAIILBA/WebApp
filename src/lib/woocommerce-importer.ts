import type { D1Database } from '@cloudflare/workers-types';
import { DatabaseHelper } from './database';

export interface WooCommerceProduct {
  ID: string;
  Type: string;
  SKU: string;
  Name: string;
  Published: string;
  'Is featured?': string;
  'Short description': string;
  Description: string;
  'In stock?': string;
  Stock: string;
  'Sale price': string;
  'Regular price': string;
  Categories: string;
  Tags: string;
  Images: string;
  'Tax status': string;
  'Tax class': string;
  Weight?: string;
  Length?: string;
  Width?: string;
  Height?: string;
}

export class WooCommerceImporter {
  private db: DatabaseHelper;

  constructor(database: D1Database) {
    this.db = new DatabaseHelper(database);
  }

  /**
   * Parse WooCommerce CSV content
   */
  parseCSV(csvContent: string): WooCommerceProduct[] {
    const lines = csvContent.split('\n');
    if (lines.length < 2) {
      throw new Error('CSV file is empty or invalid');
    }

    // Parse header
    const header = this.parseCSVLine(lines[0]);
    
    // Parse products
    const products: WooCommerceProduct[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      try {
        const values = this.parseCSVLine(line);
        const product: any = {};
        
        header.forEach((key, index) => {
          product[key] = values[index] || '';
        });

        products.push(product as WooCommerceProduct);
      } catch (error) {
        console.error(`Error parsing line ${i}:`, error);
      }
    }

    return products;
  }

  /**
   * Parse a single CSV line handling quoted fields
   */
  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          current += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // Field separator
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    // Push last field
    result.push(current.trim());

    return result;
  }

  /**
   * Map WooCommerce product to database format
   */
  private mapProduct(wcProduct: WooCommerceProduct, language: string = 'de'): any {
    // Extract first category
    const categories = wcProduct.Categories?.split('|') || [];
    const mainCategory = categories[0]?.split('>').pop()?.trim() || 'Software';

    // Parse price (WooCommerce uses German format: 29,99)
    const parsePrice = (priceStr: string): number => {
      if (!priceStr) return 0;
      // Remove currency symbols and spaces
      const cleaned = priceStr.replace(/[€$£\s]/g, '').replace(',', '.');
      return parseFloat(cleaned) || 0;
    };

    const regularPrice = parsePrice(wcProduct['Regular price']);
    const salePrice = parsePrice(wcProduct['Sale price']);
    const hasDiscount = salePrice > 0 && salePrice < regularPrice;
    const discountPercentage = hasDiscount 
      ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
      : 0;

    // Extract product type flags
    const types = wcProduct.Type?.toLowerCase() || '';
    const isDownloadable = types.includes('downloadable');
    const isVirtual = types.includes('virtual');
    const productType = isDownloadable ? 'license' : 'physical';

    // Parse stock
    const inStock = wcProduct['In stock?'] === '1';
    const stockQty = parseInt(wcProduct.Stock) || 999;

    // Clean HTML from description
    const cleanHTML = (html: string): string => {
      if (!html) return '';
      return html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/\\r\\n/g, '\n')
        .replace(/\r\n/g, '\n')
        .replace(/\s+/g, ' ')
        .trim();
    };

    // Extract features from description
    const extractFeatures = (desc: string): string[] => {
      const features: string[] = [];
      const keywords = [
        'BitLocker', 'Remote Desktop', 'Hyper-V', 'Group Policy',
        'Domain Join', 'Windows Defender', 'TPM', 'DirectX',
        'Cloud', 'Enterprise', 'Professional', 'Security'
      ];

      keywords.forEach(keyword => {
        if (desc.includes(keyword)) {
          features.push(keyword);
        }
      });

      return features.slice(0, 10); // Max 10 features
    };

    const description = cleanHTML(wcProduct.Description);
    const shortDesc = cleanHTML(wcProduct['Short description']) || description.substring(0, 200);
    const features = extractFeatures(description);

    return {
      woocommerce_id: wcProduct.ID || null, // Store original WooCommerce ID for license linking
      sku: wcProduct.SKU || `WC-${wcProduct.ID}`,
      name: wcProduct.Name,
      short_description: shortDesc,
      long_description: description,
      category: mainCategory,
      product_type: productType,
      base_price: regularPrice,
      discount_price: hasDiscount ? salePrice : null,
      discount_percentage: discountPercentage,
      vat_rate: 19, // Default German VAT
      stock_type: inStock ? 'unlimited' : 'out_of_stock',
      available_licenses: stockQty,
      license_type: isDownloadable ? 'digital' : 'physical',
      license_duration: 'lifetime',
      delivery_type: isVirtual ? 'instant' : 'email',
      activation_limit: 1,
      is_featured: wcProduct['Is featured?'] === '1' ? 1 : 0,
      is_new: 0,
      is_bestseller: 0,
      is_active: wcProduct.Published === '1' ? 1 : 0,
      rating_average: 4.8,
      rating_count: Math.floor(Math.random() * 100) + 50,
      features: features.join('\n'),
      images: wcProduct.Images?.split(',')[0] || '', // First image
      meta_title: wcProduct.Name,
      meta_description: shortDesc,
    };
  }

  /**
   * Import products from WooCommerce CSV
   */
  async importProducts(
    csvContent: string,
    language: string = 'de',
    onProgress?: (current: number, total: number, product: string) => void
  ): Promise<{ success: number; failed: number; errors: string[] }> {
    const products = this.parseCSV(csvContent);
    let success = 0;
    let failed = 0;
    const errors: string[] = [];


    for (let i = 0; i < products.length; i++) {
      const wcProduct = products[i];
      
      try {
        // Map product
        const mappedProduct = this.mapProduct(wcProduct, language);

        // Check if product exists by SKU
        const existing = await this.db.getProductBySKU(mappedProduct.sku);

        if (existing) {
          // Update existing product
          await this.updateProduct(existing.id, mappedProduct, language);
        } else {
          // Insert new product
          await this.insertProduct(mappedProduct, language);
        }

        success++;
        
        if (onProgress) {
          onProgress(i + 1, products.length, wcProduct.Name);
        }
      } catch (error) {
        failed++;
        const errorMsg = `Failed to import "${wcProduct.Name}": ${error}`;
        errors.push(errorMsg);
        console.error(errorMsg);
      }
    }

    return { success, failed, errors };
  }

  /**
   * Insert new product
   */
  private async insertProduct(product: any, language: string): Promise<void> {
    // Get or create category
    const category = await this.db.getOrCreateCategory(product.category, language);
    
    // Get or create brand (extract from product name if possible)
    const brandName = this.extractBrand(product.name);
    const brand = await this.db.getOrCreateBrand(brandName, language);

    // Insert product
    const result = await this.db.db.prepare(`
      INSERT INTO products (
        woocommerce_id, sku, category_id, brand_id, slug, product_type,
        base_price, discount_price, discount_percentage, vat_rate,
        stock_type, available_licenses, license_type, license_duration,
        delivery_type, activation_limit,
        is_featured, is_new, is_bestseller, is_active,
        rating_average, rating_count, created_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?,
        ?, ?, ?, ?,
        ?, ?, datetime('now')
      )
    `).bind(
      product.woocommerce_id,
      product.sku,
      category.id,
      brand.id,
      this.createSlug(product.name),
      product.product_type,
      product.base_price,
      product.discount_price,
      product.discount_percentage,
      product.vat_rate,
      product.stock_type,
      product.available_licenses,
      product.license_type,
      product.license_duration,
      product.delivery_type,
      product.activation_limit,
      product.is_featured,
      product.is_new,
      product.is_bestseller,
      product.is_active,
      product.rating_average,
      product.rating_count
    ).run();

    const productId = result.meta.last_row_id;

    // Insert translation
    await this.db.db.prepare(`
      INSERT INTO product_translations (
        product_id, language, name, short_description, long_description,
        features, meta_title, meta_description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      productId,
      language,
      product.name,
      product.short_description,
      product.long_description,
      product.features,
      product.meta_title,
      product.meta_description
    ).run();

    // Insert image if available
    if (product.images) {
      await this.db.db.prepare(`
        INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
        VALUES (?, ?, ?, 0, 1)
      `).bind(productId, product.images, product.name).run();
    }
  }

  /**
   * Update existing product
   */
  private async updateProduct(productId: number, product: any, language: string): Promise<void> {
    // Update product
    await this.db.db.prepare(`
      UPDATE products SET
        woocommerce_id = ?,
        base_price = ?,
        discount_price = ?,
        discount_percentage = ?,
        stock_type = ?,
        available_licenses = ?,
        is_featured = ?,
        is_active = ?,
        rating_average = ?,
        rating_count = ?
      WHERE id = ?
    `).bind(
      product.woocommerce_id,
      product.base_price,
      product.discount_price,
      product.discount_percentage,
      product.stock_type,
      product.available_licenses,
      product.is_featured,
      product.is_active,
      product.rating_average,
      product.rating_count,
      productId
    ).run();

    // Update or insert translation
    const existingTranslation = await this.db.db.prepare(`
      SELECT id FROM product_translations WHERE product_id = ? AND language = ?
    `).bind(productId, language).first();

    if (existingTranslation) {
      await this.db.db.prepare(`
        UPDATE product_translations SET
          name = ?,
          short_description = ?,
          long_description = ?,
          features = ?
        WHERE product_id = ? AND language = ?
      `).bind(
        product.name,
        product.short_description,
        product.long_description,
        product.features,
        productId,
        language
      ).run();
    } else {
      await this.db.db.prepare(`
        INSERT INTO product_translations (
          product_id, language, name, short_description, long_description, features
        ) VALUES (?, ?, ?, ?, ?, ?)
      `).bind(
        productId,
        language,
        product.name,
        product.short_description,
        product.long_description,
        product.features
      ).run();
    }
  }

  /**
   * Extract brand from product name
   */
  private extractBrand(name: string): string {
    const brands = ['Microsoft', 'Adobe', 'Kaspersky', 'Norton', 'Bitdefender', 'Autodesk', 'Apple'];
    for (const brand of brands) {
      if (name.toLowerCase().includes(brand.toLowerCase())) {
        return brand;
      }
    }
    return 'Unknown';
  }

  /**
   * Create URL-friendly slug
   */
  private createSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
