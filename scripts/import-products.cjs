// Product Import Script for Cloudflare D1
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

function cleanHTML(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 800);
}

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const cleaned = priceStr.toString().replace(/[€$,]/g, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function escapeSQL(str) {
  if (!str) return '';
  return str.toString().replace(/'/g, "''").replace(/\\/g, '\\\\');
}

function getCategory(categoriesStr) {
  if (!categoriesStr) return 'Software';
  const cats = categoriesStr.split(',').map(c => c.trim());
  // Filter out URLs and get actual category names
  const validCats = cats.filter(c => !c.startsWith('http') && c.length > 0 && c.length < 50);
  return validCats[0] || 'Software';
}

function main() {
  const csvPath = path.join(__dirname, '..', '..', 'uploaded_files', 'wc-product-export-28-1-2026-1769597068160.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  
  console.log(`📦 Reading CSV file...`);

  // Parse CSV with proper library
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
    relax_column_count: true,
    trim: true
  });

  console.log(`📋 Found ${records.length} rows`);

  const products = [];
  const sqlStatements = [];
  let skipped = 0;

  for (let i = 0; i < records.length; i++) {
    const row = records[i];

    // Skip if no name or ID
    if (!row.Name || !row.ID || row.Name.trim() === '' || row.Name === 'Name') {
      skipped++;
      continue;
    }

    const id = parseInt(row.ID);
    if (isNaN(id) || id === 0) {
      skipped++;
      continue;
    }

    const name = row.Name.substring(0, 255);
    const description = cleanHTML(row.Description);
    const short_description = cleanHTML(row['Short description']);
    const price = parsePrice(row['Regular price']);
    const salePrice = row['Sale price'] ? parsePrice(row['Sale price']) : null;
    const sku = row.SKU || `SKU-${id}`;
    const category = getCategory(row.Categories);
    const imageUrl = row.Images ? row.Images.split(',')[0].trim() : '/images/placeholder.jpg';
    const inStock = row['In stock?'] === '1' || row['In stock?']?.toLowerCase() === 'yes';
    const stockQty = parseInt(row.Stock) || 999;

    products.push({ id, name, price, salePrice, category, sku });

    const sql = `INSERT OR REPLACE INTO products (
  id, name, description, short_description, price, sale_price, 
  sku, category, image_url, in_stock, stock_quantity, created_at
) VALUES (
  ${id},
  '${escapeSQL(name)}',
  '${escapeSQL(description)}',
  '${escapeSQL(short_description)}',
  ${price},
  ${salePrice || 'NULL'},
  '${escapeSQL(sku)}',
  '${escapeSQL(category)}',
  '${escapeSQL(imageUrl)}',
  ${inStock ? 1 : 0},
  ${stockQty},
  datetime('now')
);`;
    
    sqlStatements.push(sql);
  }

  console.log(`✅ Processed ${products.length} valid products`);
  console.log(`⏭️  Skipped ${skipped} invalid rows`);
  
  if (products.length > 0) {
    const prices = products.filter(p => p.price > 0).map(p => p.price);
    if (prices.length > 0) {
      console.log(`💰 Price range: €${Math.min(...prices).toFixed(2)} - €${Math.max(...prices).toFixed(2)}`);
    }
    const categories = [...new Set(products.map(p => p.category))];
    console.log(`📂 Categories (${categories.length}):`, categories.slice(0, 10).join(', '));
  }

  // Write SQL file
  const sqlDir = path.join(__dirname, '..', 'migrations');
  if (!fs.existsSync(sqlDir)) {
    fs.mkdirSync(sqlDir, { recursive: true });
  }
  
  const sqlPath = path.join(sqlDir, '0002_import_products.sql');
  const sqlContent = `-- Import products from WooCommerce CSV
-- Generated: ${new Date().toISOString()}
-- Total products: ${products.length}

${sqlStatements.join('\n\n')}
`;

  fs.writeFileSync(sqlPath, sqlContent, 'utf-8');
  console.log(`💾 SQL migration: ${sqlPath}`);

  // Write sample JSON
  const jsonPath = path.join(__dirname, '..', 'products-preview.json');
  fs.writeFileSync(jsonPath, JSON.stringify(products.slice(0, 20), null, 2), 'utf-8');
  console.log(`📊 Preview (first 20): ${jsonPath}`);

  console.log('\n🎉 Import preparation complete!');
  console.log(`\n📌 Next steps:`);
  console.log(`1. npm run db:migrate:local`);
  console.log(`2. pm2 restart webapp`);
  console.log(`3. Visit /produkte to see products\n`);
}

try {
  main();
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
