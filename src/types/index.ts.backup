// Type definitions for the eCommerce platform

export type UserRole = 'admin' | 'customer';
export type UserStatus = 'active' | 'suspended' | 'deleted';
export type Language = 'en' | 'de';

export interface User {
  id: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  status: UserStatus;
  email_verified: number;
  phone?: string;
  company?: string;
  vat_number?: string;
  language_preference: Language;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface Session {
  id: number;
  user_id: number;
  token: string;
  expires_at: string;
  created_at: string;
}

export interface Category {
  id: number;
  parent_id?: number;
  slug: string;
  icon?: string;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryTranslation {
  id: number;
  category_id: number;
  language: Language;
  name: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo_url?: string;
  website_url?: string;
  is_featured: number;
  sort_order: number;
  created_at: string;
}

export type ProductType = 'license' | 'bundle' | 'volume';
export type StockType = 'unlimited' | 'limited' | 'out_of_stock';
export type LicenseType = 'perpetual' | 'subscription' | 'trial';

export interface Product {
  id: number;
  sku: string;
  category_id: number;
  brand_id?: number;
  slug: string;
  product_type: ProductType;
  base_price: number;
  discount_price?: number;
  discount_percentage?: number;
  vat_rate: number;
  stock_type: StockType;
  available_licenses: number;
  license_type?: LicenseType;
  license_duration?: string;
  delivery_type: string;
  compatibility?: string;
  system_requirements?: string;
  activation_limit: number;
  is_featured: number;
  is_new: number;
  is_bestseller: number;
  view_count: number;
  sale_count: number;
  rating: number;
  review_count: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface ProductTranslation {
  id: number;
  product_id: number;
  language: Language;
  name: string;
  short_description?: string;
  long_description?: string;
  features?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  alt_text?: string;
  sort_order: number;
  is_primary: number;
  created_at: string;
}

export interface ProductFAQ {
  id: number;
  product_id: number;
  language: Language;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
}

export type LicenseKeyType = 'single' | 'volume' | 'oem';
export type LicenseKeyStatus = 'available' | 'sold' | 'used' | 'expired' | 'revoked';

export interface LicenseKey {
  id: number;
  product_id: number;
  license_key: string;
  key_type: LicenseKeyType;
  activation_limit: number;
  activation_count: number;
  status: LicenseKeyStatus;
  assigned_to_order_id?: number;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface LicenseActivation {
  id: number;
  license_key_id: number;
  device_id?: string;
  ip_address?: string;
  user_agent?: string;
  activated_at: string;
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
export type PaymentStatus = 'unpaid' | 'paid' | 'failed' | 'refunded';

export interface Order {
  id: number;
  order_number: string;
  user_id?: number;
  email: string;
  first_name: string;
  last_name: string;
  company?: string;
  vat_number?: string;
  country: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method?: string;
  payment_intent_id?: string;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total: number;
  currency: string;
  language: Language;
  ip_address?: string;
  user_agent?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  product_sku: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  license_key_id?: number;
  download_url?: string;
  download_expires_at?: string;
  created_at: string;
}

export type CouponType = 'percentage' | 'fixed';

export interface Coupon {
  id: number;
  code: string;
  type: CouponType;
  value: number;
  min_purchase_amount: number;
  max_uses: number;
  used_count: number;
  valid_from?: string;
  valid_until?: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: number;
  slug: string;
  page_type: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface PageTranslation {
  id: number;
  page_id: number;
  language: Language;
  title: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
}

export interface Setting {
  id: number;
  setting_key: string;
  setting_value?: string;
  setting_type: string;
  updated_at: string;
}

export interface HomepageSection {
  id: number;
  section_key: string;
  section_type: string;
  is_enabled: number;
  sort_order: number;
  config?: string;
  updated_at: string;
}

// Extended types with relations
export interface ProductWithDetails extends Product {
  translation: ProductTranslation;
  category: CategoryTranslation;
  brand?: Brand;
  images: ProductImage[];
  faqs?: ProductFAQ[];
}

export interface OrderWithItems extends Order {
  items: (OrderItem & { license_key?: string })[];
}

// Cloudflare bindings
export interface CloudflareBindings {
  DB: D1Database;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Cart types
export interface CartItem {
  product_id: number;
  quantity: number;
  product: ProductWithDetails;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}
