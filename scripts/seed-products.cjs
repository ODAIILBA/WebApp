// Seed products data for development
// Run with: node scripts/seed-products.cjs

const fs = require('fs');
const path = require('path');

const previewPath = path.join(__dirname, '..', 'products-preview.json');
const products = JSON.parse(fs.readFileSync(previewPath, 'utf-8'));

console.log(`\n🌱 Seeding ${products.length} sample products...\n`);

// Generate sample data for all categories
const sampleProducts = [
  // Microsoft Windows
  { id: 1, name: 'Windows 11 Professional', price: 29.99, salePrice: 19.99, category: 'Microsoft Windows', sku: 'WIN11-PRO', image: '/images/windows11-pro.jpg', inStock: true, stockQty: 999 },
  { id: 2, name: 'Windows 11 Home', price: 19.99, salePrice: null, category: 'Microsoft Windows', sku: 'WIN11-HOME', image: '/images/windows11-home.jpg', inStock: true, stockQty: 999 },
  { id: 3, name: 'Windows 10 Professional', price: 24.99, salePrice: null, category: 'Microsoft Windows', sku: 'WIN10-PRO', image: '/images/windows10-pro.jpg', inStock: true, stockQty: 999 },
  
  // Microsoft Office
  { id: 10, name: 'Office 2024 Professional Plus', price: 49.99, salePrice: 39.99, category: 'Microsoft Office 2024', sku: 'OFF2024-PP', image: '/images/office2024-pp.jpg', inStock: true, stockQty: 999 },
  { id: 11, name: 'Office 2021 Professional Plus', price: 44.99, salePrice: 34.99, category: 'Microsoft Office 2021', sku: 'OFF2021-PP', image: '/images/office2021-pp.jpg', inStock: true, stockQty: 999 },
  { id: 12, name: 'Office 2019 Professional Plus', price: 39.99, salePrice: null, category: 'Microsoft Office 2019', sku: 'OFF2019-PP', image: '/images/office2019-pp.jpg', inStock: true, stockQty: 999 },
  { id: 13, name: 'Office 2024 Home & Business', price: 34.99, salePrice: null, category: 'Microsoft Office 2024', sku: 'OFF2024-HB', image: '/images/office2024-hb.jpg', inStock: true, stockQty: 999 },
  
  // Individual Office Apps
  { id: 20, name: 'Word 2021', price: 9.99, salePrice: null, category: 'Microsoft Office', sku: 'WORD-2021', image: '/images/word2021.jpg', inStock: true, stockQty: 999 },
  { id: 21, name: 'Excel 2021', price: 9.99, salePrice: null, category: 'Microsoft Office', sku: 'EXCEL-2021', image: '/images/excel2021.jpg', inStock: true, stockQty: 999 },
  { id: 22, name: 'PowerPoint 2021', price: 9.99, salePrice: null, category: 'Microsoft Office', sku: 'PPT-2021', image: '/images/powerpoint2021.jpg', inStock: true, stockQty: 999 },
  { id: 23, name: 'Outlook 2021', price: 9.99, salePrice: null, category: 'Microsoft Office', sku: 'OUTLOOK-2021', image: '/images/outlook2021.jpg', inStock: true, stockQty: 999 },
  { id: 24, name: 'Access 2021', price: 12.99, salePrice: null, category: 'Microsoft Office', sku: 'ACCESS-2021', image: '/images/access2021.jpg', inStock: true, stockQty: 999 },
  
  // Server Products
  { id: 30, name: 'Windows Server 2025 Standard', price: 299.99, salePrice: null, category: 'Microsoft Server', sku: 'SRV2025-STD', image: '/images/server2025-std.jpg', inStock: true, stockQty: 50 },
  { id: 31, name: 'Windows Server 2022 Standard', price: 249.99, salePrice: 199.99, category: 'Microsoft Server', sku: 'SRV2022-STD', image: '/images/server2022-std.jpg', inStock: true, stockQty: 50 },
  { id: 32, name: 'SQL Server 2022 Standard', price: 399.99, salePrice: null, category: 'Microsoft Server', sku: 'SQL2022-STD', image: '/images/sql2022-std.jpg', inStock: true, stockQty: 30 },
  
  // Project & Visio
  { id: 40, name: 'Project 2024 Professional', price: 89.99, salePrice: 69.99, category: 'Microsoft Project', sku: 'PROJ2024-PRO', image: '/images/project2024-pro.jpg', inStock: true, stockQty: 100 },
  { id: 41, name: 'Visio 2024 Professional', price: 79.99, salePrice: 59.99, category: 'Microsoft Visio', sku: 'VISIO2024-PRO', image: '/images/visio2024-pro.jpg', inStock: true, stockQty: 100 },
  
  // Mac Products
  { id: 50, name: 'Office 2024 for Mac', price: 54.99, salePrice: null, category: 'Microsoft Office Mac', sku: 'OFF2024-MAC', image: '/images/office2024-mac.jpg', inStock: true, stockQty: 999 },
  { id: 51, name: 'Office 2021 Home & Student Mac', price: 29.99, salePrice: null, category: 'Microsoft Office Mac', sku: 'OFF2021-MAC-HS', image: '/images/office2021-mac-hs.jpg', inStock: true, stockQty: 999 },
];

console.log(`✅ Generated ${sampleProducts.length} sample products\n`);
console.log(`📂 Categories:`);
const categories = [...new Set(sampleProducts.map(p => p.category))];
categories.forEach(cat => {
  const count = sampleProducts.filter(p => p.category === cat).length;
  console.log(`   - ${cat}: ${count} products`);
});

console.log(`\n💰 Price range: €${Math.min(...sampleProducts.map(p => p.price))} - €${Math.max(...sampleProducts.map(p => p.price))}`);

// Write seed data
const seedPath = path.join(__dirname, '..', 'src', 'data', 'seed-products.json');
const seedDir = path.dirname(seedPath);

if (!fs.existsSync(seedDir)) {
  fs.mkdirSync(seedDir, { recursive: true });
}

fs.writeFileSync(seedPath, JSON.stringify(sampleProducts, null, 2), 'utf-8');
console.log(`\n💾 Seed data written to: ${seedPath}`);

console.log(`\n🎉 Seed data ready!`);
console.log(`\n📌 The app will automatically load these products when database is empty.`);
