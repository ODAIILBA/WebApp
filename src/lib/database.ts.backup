// Database helper functions

import type { D1Database } from '@cloudflare/workers-types';
import type { 
  Product, 
  ProductTranslation, 
  ProductWithDetails, 
  Category,
  CategoryTranslation,
  Brand,
  LicenseKey,
  Order,
  User,
  Language
} from '../types';

export class DatabaseHelper {
  constructor(private db: D1Database) {}

  // ============================================
  // PRODUCT QUERIES
  // ============================================

  async getProductBySlug(slug: string, language: Language = 'en'): Promise<ProductWithDetails | null> {
    const product = await this.db.prepare(`
      SELECT 
        p.*,
        pt.name, pt.short_description, pt.long_description, pt.features,
        pt.meta_title, pt.meta_description,
        ct.name as category_name,
        b.name as brand_name, b.logo_url as brand_logo
      FROM products p
      LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = ?
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN category_translations ct ON c.id = ct.category_id AND ct.language_code = ?
      LEFT JOIN brands b ON p.brand_id = b.id
      WHERE p.slug = ?
      LIMIT 1
    `).bind(language, language, slug).first();

    if (!product) return null;

    // Get images
    const images = await this.db.prepare(`
      SELECT * FROM product_images 
      WHERE product_id = ? 
      ORDER BY sort_order ASC, is_primary DESC
    `).bind(product.id).all();

    return {
      ...product,
      images: images.results || [],
      faqs: []
    } as any;
  }

  async getProductById(productId: number, language: Language = 'en'): Promise<ProductWithDetails | null> {
    const product = await this.db.prepare(`
      SELECT 
        p.*,
        pt.name, pt.short_description, pt.long_description, pt.features,
        pt.meta_title, pt.meta_description,
        ct.name as category_name,
        b.name as brand_name, b.logo_url as brand_logo
      FROM products p
      LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = ?
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN category_translations ct ON c.id = ct.category_id AND ct.language_code = ?
      LEFT JOIN brands b ON p.brand_id = b.id
      WHERE p.id = ?
      LIMIT 1
    `).bind(language, language, productId).first();

    if (!product) return null;

    // Get images
    const images = await this.db.prepare(`
      SELECT * FROM product_images 
      WHERE product_id = ? 
      ORDER BY sort_order ASC, is_primary DESC
    `).bind(product.id).all();

    return {
      ...product,
      images: images.results || [],
      faqs: []
    } as any;
  }

  async getAllProducts(language: Language = 'en', limit: number = 20, offset: number = 0): Promise<ProductWithDetails[]> {
    const products = await this.db.prepare(`
      SELECT 
        p.*,
        pt.name, pt.short_description,
        ct.name as category_name,
        b.name as brand_name,
        pi.image_url, pi.alt_text
      FROM products p
      LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = ?
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN category_translations ct ON c.id = ct.category_id AND ct.language_code = ?
      LEFT JOIN brands b ON p.brand_id = b.id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
      WHERE p.is_active = 1
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `).bind(language, language, limit, offset).all();

    return products.results as any[];
  }

  async getFeaturedProducts(language: Language = 'en', limit: number = 8): Promise<ProductWithDetails[]> {
    const products = await this.db.prepare(`
      SELECT 
        p.*,
        pt.name, pt.short_description,
        ct.name as category_name,
        b.name as brand_name,
        pi.image_url, pi.alt_text
      FROM products p
      LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = ?
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN category_translations ct ON c.id = ct.category_id AND ct.language_code = ?
      LEFT JOIN brands b ON p.brand_id = b.id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
      WHERE p.is_featured = 1
      ORDER BY p.created_at DESC
      LIMIT ?
    `).bind(language, language, limit).all();

    return products.results as any[];
  }

  async getBestsellerProducts(language: Language = 'en', limit: number = 6): Promise<ProductWithDetails[]> {
    const products = await this.db.prepare(`
      SELECT 
        p.*,
        pt.name, pt.short_description,
        ct.name as category_name,
        b.name as brand_name,
        pi.image_url, pi.alt_text
      FROM products p
      LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = ?
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN category_translations ct ON c.id = ct.category_id AND ct.language_code = ?
      LEFT JOIN brands b ON p.brand_id = b.id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
      WHERE p.is_bestseller = 1
      ORDER BY p.created_at DESC
      LIMIT ?
    `).bind(language, language, limit).all();

    return products.results as any[];
  }

  async getNewProducts(language: Language = 'en', limit: number = 6): Promise<ProductWithDetails[]> {
    const products = await this.db.prepare(`
      SELECT 
        p.*,
        pt.name, pt.short_description,
        ct.name as category_name,
        b.name as brand_name,
        pi.image_url, pi.alt_text
      FROM products p
      LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = ?
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN category_translations ct ON c.id = ct.category_id AND ct.language_code = ?
      LEFT JOIN brands b ON p.brand_id = b.id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
      WHERE p.is_new = 1
      ORDER BY p.created_at DESC
      LIMIT ?
    `).bind(language, language, limit).all();

    return products.results as any[];
  }

  async getProductsByCategory(categorySlug: string, language: Language = 'en', page: number = 1, limit: number = 20) {
    const offset = (page - 1) * limit;

    const products = await this.db.prepare(`
      SELECT 
        p.id,
        p.slug,
        p.sku,
        p.base_price,
        p.base_price as price,
        p.discount_price,
        p.discount_percentage,
        p.stock,
        p.image_url,
        p.is_featured,
        p.is_bestseller,
        p.is_new,
        p.rating,
        p.review_count,
        COALESCE(pt.name, p.name) as name,
        COALESCE(pt.short_description, p.short_description) as short_description,
        ct.name as category_name,
        b.name as brand_name
      FROM products p
      LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = ?
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN category_translations ct ON c.id = ct.category_id AND ct.language_code = ?
      LEFT JOIN brands b ON p.brand_id = b.id
      WHERE c.slug = ? AND p.is_active = 1
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `).bind(language, language, categorySlug, limit, offset).all();

    const countResult = await this.db.prepare(`
      SELECT COUNT(*) as total
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE c.slug = ?
    `).bind(categorySlug).first();

    return {
      products: products.results as any[],
      total: (countResult as any)?.total || 0,
      page,
      limit,
      totalPages: Math.ceil(((countResult as any)?.total || 0) / limit)
    };
  }

  // ============================================
  // CATEGORY QUERIES
  // ============================================

  async getAllCategories(language: Language = 'en') {
    const categories = await this.db.prepare(`
      SELECT 
        c.id,
        c.slug,
        c.parent_id,
        c.icon,
        c.image_url,
        c.sort_order,
        c.is_active,
        c.meta_title,
        c.meta_description,
        c.created_at,
        c.updated_at,
        COALESCE(ct.name, c.name) as name,
        COALESCE(ct.description, c.description) as description
      FROM categories c
      LEFT JOIN category_translations ct ON c.id = ct.category_id AND ct.language_code = ?
      WHERE c.is_active = 1
      ORDER BY c.sort_order ASC
    `).bind(language).all();

    return categories.results as any[];
  }

  async getCategoryBySlug(slug: string, language: Language = 'en') {
    const category = await this.db.prepare(`
      SELECT 
        c.*,
        ct.name, ct.description, ct.meta_title, ct.meta_description
      FROM categories c
      LEFT JOIN category_translations ct ON c.id = ct.category_id AND ct.language_code = ?
      WHERE c.slug = ?
      LIMIT 1
    `).bind(language, slug).first();

    return category as any;
  }

  // ============================================
  // LICENSE KEY QUERIES
  // ============================================

  async getAvailableLicenseKey(productId: number): Promise<LicenseKey | null> {
    const key = await this.db.prepare(`
      SELECT * FROM license_keys
      WHERE product_id = ? AND status = 'available'
      ORDER BY created_at ASC
      LIMIT 1
    `).bind(productId).first();

    return key as any;
  }

  async assignLicenseKeyToOrder(licenseKeyId: number, orderId: number) {
    await this.db.prepare(`
      UPDATE license_keys
      SET status = 'sold', assigned_to_order_id = ?, updated_at = datetime('now')
      WHERE id = ?
    `).bind(orderId, licenseKeyId).run();
  }

  async getLicenseKeysByOrderId(orderId: number) {
    const keys = await this.db.prepare(`
      SELECT lk.*, p.sku, pt.name as product_name
      FROM license_keys lk
      LEFT JOIN products p ON lk.product_id = p.id
      LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.language = 'en'
      WHERE lk.assigned_to_order_id = ?
    `).bind(orderId).all();

    return keys.results as any[];
  }

  // ============================================
  // ORDER QUERIES
  // ============================================

  async createOrder(orderData: any): Promise<number> {
    const result = await this.db.prepare(`
      INSERT INTO orders (
        order_number, user_id, email, first_name, last_name,
        company, vat_number, country, status, payment_status,
        subtotal, tax_amount, discount_amount, total, currency, language
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      orderData.order_number,
      orderData.user_id || null,
      orderData.email,
      orderData.first_name,
      orderData.last_name,
      orderData.company || null,
      orderData.vat_number || null,
      orderData.country,
      'pending',
      'unpaid',
      orderData.subtotal,
      orderData.tax_amount,
      orderData.discount_amount,
      orderData.total,
      orderData.currency || 'EUR',
      orderData.language || 'en'
    ).run();

    return result.meta.last_row_id as number;
  }

  async addOrderItem(orderItem: any) {
    await this.db.prepare(`
      INSERT INTO order_items (
        order_id, product_id, product_name, product_sku,
        quantity, unit_price, tax_rate, tax_amount, total
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      orderItem.order_id,
      orderItem.product_id,
      orderItem.product_name,
      orderItem.product_sku,
      orderItem.quantity,
      orderItem.unit_price,
      orderItem.tax_rate,
      orderItem.tax_amount,
      orderItem.total
    ).run();
  }

  async getOrderByNumber(orderNumber: string) {
    const order = await this.db.prepare(`
      SELECT * FROM orders WHERE order_number = ?
    `).bind(orderNumber).first();

    if (!order) return null;

    const items = await this.db.prepare(`
      SELECT oi.*, lk.license_key
      FROM order_items oi
      LEFT JOIN license_keys lk ON oi.license_key_id = lk.id
      WHERE oi.order_id = ?
    `).bind((order as any).id).all();

    return {
      ...order,
      items: items.results || []
    } as any;
  }

  async updateOrderStatus(orderId: number, status: string, paymentStatus?: string) {
    const updates = [];
    const binds = [];

    if (status) {
      updates.push('status = ?');
      binds.push(status);
    }

    if (paymentStatus) {
      updates.push('payment_status = ?');
      binds.push(paymentStatus);
    }

    if (status === 'completed') {
      updates.push('completed_at = datetime("now")');
    }

    updates.push('updated_at = datetime("now")');
    binds.push(orderId);

    await this.db.prepare(`
      UPDATE orders
      SET ${updates.join(', ')}
      WHERE id = ?
    `).bind(...binds).run();
  }

  // ============================================
  // USER QUERIES
  // ============================================

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.db.prepare(`
      SELECT * FROM users WHERE email = ?
    `).bind(email).first();

    return user as any;
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.db.prepare(`
      SELECT * FROM users WHERE id = ?
    `).bind(id).first();

    return user as any;
  }

  async createUser(userData: any): Promise<number> {
    const result = await this.db.prepare(`
      INSERT INTO users (
        email, password_hash, first_name, last_name, role, language_preference
      ) VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      userData.email,
      userData.password_hash,
      userData.first_name,
      userData.last_name,
      userData.role || 'customer',
      userData.language_preference || 'en'
    ).run();

    return result.meta.last_row_id as number;
  }

  // ============================================
  // SESSION QUERIES
  // ============================================

  async createSession(userId: number, token: string, expiresAt: string) {
    await this.db.prepare(`
      INSERT INTO sessions (user_id, token, expires_at)
      VALUES (?, ?, ?)
    `).bind(userId, token, expiresAt).run();
  }

  async getSessionByToken(token: string) {
    const session = await this.db.prepare(`
      SELECT s.*, u.email, u.first_name, u.last_name, u.role
      FROM sessions s
      LEFT JOIN users u ON s.user_id = u.id
      WHERE s.token = ? AND s.expires_at > datetime('now')
    `).bind(token).first();

    return session as any;
  }

  async deleteSession(token: string) {
    await this.db.prepare(`
      DELETE FROM sessions WHERE token = ?
    `).bind(token).run();
  }

  // ============================================
  // SETTINGS QUERIES
  // ============================================

  async getSetting(key: string): Promise<string | null> {
    const setting = await this.db.prepare(`
      SELECT setting_value FROM settings WHERE setting_key = ?
    `).bind(key).first();

    return (setting as any)?.setting_value || null;
  }

  async getHomepageSections() {
    const sections = await this.db.prepare(`
      SELECT * FROM homepage_sections
      WHERE is_enabled = 1
      ORDER BY sort_order ASC
    `).all();

    return sections.results as any[];
  }

  // ============================================
  // BRAND QUERIES
  // ============================================

  async getFeaturedBrands(limit: number = 8) {
    const brands = await this.db.prepare(`
      SELECT * FROM brands
      WHERE is_featured = 1
      ORDER BY sort_order ASC
      LIMIT ?
    `).bind(limit).all();

    return brands.results as any[];
  }

  // ============================================
  // IMPORT HELPER QUERIES
  // ============================================

  async getProductBySKU(sku: string) {
    const product = await this.db.prepare(`
      SELECT * FROM products WHERE sku = ? LIMIT 1
    `).bind(sku).first();

    return product as any;
  }

  async getOrCreateCategory(name: string, language: string = 'de') {
    // Check if category exists
    const existing = await this.db.prepare(`
      SELECT c.* FROM categories c
      JOIN category_translations ct ON c.id = ct.category_id
      WHERE ct.name = ? AND ct.language_code = ?
      LIMIT 1
    `).bind(name, language).first();

    if (existing) {
      return existing as any;
    }

    // Create new category
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const result = await this.db.prepare(`
      INSERT INTO categories (slug, sort_order, is_active)
      VALUES (?, 0, 1)
    `).bind(slug).run();

    const categoryId = result.meta.last_row_id;

    // Insert translation
    await this.db.prepare(`
      INSERT INTO category_translations (category_id, language, name, description)
      VALUES (?, ?, ?, ?)
    `).bind(categoryId, language, name, name).run();

    return { id: categoryId, slug, sort_order: 0, is_active: 1 };
  }

  async getOrCreateBrand(name: string, language: string = 'de') {
    // Check if brand exists
    const existing = await this.db.prepare(`
      SELECT * FROM brands WHERE name = ? LIMIT 1
    `).bind(name).first();

    if (existing) {
      return existing as any;
    }

    // Create new brand
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const result = await this.db.prepare(`
      INSERT INTO brands (name, slug, logo_url, is_featured, sort_order)
      VALUES (?, ?, ?, 0, 0)
    `).bind(name, slug, `/static/brands/${slug}.png`).run();

    return { id: result.meta.last_row_id, name, slug };
  }
}
