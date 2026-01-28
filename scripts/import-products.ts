// Product Import Script for Cloudflare D1
// This script processes the WooCommerce CSV export and imports products into D1 database

import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

interface ProductRow {
  ID: string;
  Name: string;
  Description: string;
  'Short description': string;
  'Regular price': string;
  'Sale price': string;
  SKU: string;
  Categories: string;
  Images: string;
  'In stock?': string;
  Stock: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  short_description: string;
  price: number;
  sale_price: number | null;
  sku: string;
  category: string;
  image_url: string;
  in_stock: boolean;
  stock_quantity: number;
  created_at: string;
}

function cleanHTML(html: string): string {
  // Remove HTML tags and clean up
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 1000); // Limit length
}

function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;
  // Remove currency symbols and parse
  const cleaned = priceStr.replace(/[€$,]/g, '').trim();
  return parseFloat(cleaned) || 0;
}

function main() {
  const csvPath = path.join(__dirname, '../../uploaded_files/wc-product-export-28-1-2026-1769597068160.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  
  // Parse CSV
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
    relax_column_count: true,
  }) as ProductRow[];

  console.log(`📦 Found ${records.length} products in CSV`);

  const products: Product[] = [];
  const sqlStatements: string[] = [];

  for (const row of records) {
    // Skip if no name
    if (!row.Name || row.Name.trim() === '') continue;

    const product: Product = {
      id: parseInt(row.ID) || 0,
      name: row.Name.substring(0, 255),
      description: cleanHTML(row.Description || ''),
      short_description: cleanHTML(row['Short description'] || ''),
      price: parsePrice(row['Regular price']),
      sale_price: row['Sale price'] ? parsePrice(row['Sale price']) : null,
      sku: row.SKU || '',
      category: row.Categories?.split(',')[0]?.trim() || 'Software',
      image_url: row.Images?.split(',')[0]?.trim() || '/images/placeholder.jpg',
      in_stock: row['In stock?'] === '1' || row['In stock?']?.toLowerCase() === 'yes',
      stock_quantity: parseInt(row.Stock) || 999,
      created_at: new Date().toISOString(),
    };

    products.push(product);

    // Generate SQL INSERT statement
    const sql = `INSERT INTO products (
      id, name, description, short_description, price, sale_price, 
      sku, category, image_url, in_stock, stock_quantity, created_at
    ) VALUES (
      ${product.id},
      '${product.name.replace(/'/g, "''")}',
      '${product.description.replace(/'/g, "''")}',
      '${product.short_description.replace(/'/g, "''")}',
      ${product.price},
      ${product.sale_price || 'NULL'},
      '${product.sku.replace(/'/g, "''")}',
      '${product.category.replace(/'/g, "''")}',
      '${product.image_url.replace(/'/g, "''")}',
      ${product.in_stock ? 1 : 0},
      ${product.stock_quantity},
      '${product.created_at}'
    );`;
    
    sqlStatements.push(sql);
  }

  console.log(`✅ Processed ${products.length} valid products`);

  // Write SQL file
  const sqlPath = path.join(__dirname, '../migrations/0002_import_products.sql');
  const sqlContent = `-- Import products from WooCommerce CSV
-- Generated: ${new Date().toISOString()}
-- Total products: ${products.length}

${sqlStatements.join('\n\n')}
`;

  fs.writeFileSync(sqlPath, sqlContent, 'utf-8');
  console.log(`💾 Wrote SQL migration to: ${sqlPath}`);

  // Write JSON summary
  const jsonPath = path.join(__dirname, '../products-summary.json');
  fs.writeFileSync(jsonPath, JSON.stringify(products.slice(0, 10), null, 2), 'utf-8');
  console.log(`📊 Wrote product summary to: ${jsonPath}`);

  console.log('\n🎉 Import complete!');
  console.log(`\nNext steps:`);
  console.log(`1. Review the SQL file: ${sqlPath}`);
  console.log(`2. Apply migration: npm run db:migrate:local`);
  console.log(`3. Verify products in database`);
}

main();
