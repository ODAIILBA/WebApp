-- Add WooCommerce ID column for linking licenses
-- Migration: 0008_add_woocommerce_id
-- Purpose: Store original WooCommerce product IDs for license attachment

-- Add woocommerce_id column to products table
ALTER TABLE products ADD COLUMN woocommerce_id TEXT;

-- Create index for fast lookups
CREATE INDEX IF NOT EXISTS idx_products_woocommerce_id ON products(woocommerce_id);

-- Add comment for documentation
-- This field stores the original WooCommerce product ID from the old store
-- Used for importing and linking licenses to the correct products
