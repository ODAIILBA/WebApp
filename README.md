# 🛒 Premium Software Store - Enterprise eCommerce Platform

A full-featured, enterprise-grade digital software eCommerce platform built with **Hono**, **TypeScript**, and **Cloudflare Pages/D1**. Designed specifically for selling software licenses with instant delivery, multilingual support, and a comprehensive admin panel.

## 🌐 Live Demo

**Sandbox URL**: https://3000-iiy5dmdkef8bwxqrgjvk8-b237eb32.sandbox.novita.ai

**Admin Panel**: https://3000-iiy5dmdkef8bwxqrgjvk8-b237eb32.sandbox.novita.ai/admin

### Admin Panel Pages
- `/admin` - Dashboard with statistics
- `/admin/products` - Product management
- `/admin/products/add` - Add new product
- `/admin/licenses` - License key management
- `/admin/licenses/import` - Import keys via CSV

## ✨ Features Completed

### ✅ **Homepage & Frontend**
- [x] Premium dark blue + gold theme design
- [x] Fully responsive layout
- [x] Header with search, language switcher, account, and cart
- [x] Mega menu navigation with categories
- [x] Hero banner with promotional content
- [x] Trust badges section (SSL, EHI, Instant Delivery, 24/7 Support)
- [x] Sidebar "Software Deals" menu
- [x] Featured products grid with discount badges
- [x] Product cards with pricing, discounts, VAT info
- [x] "How It Works" step-by-step guide
- [x] Bestsellers section
- [x] Partner logos showcase
- [x] Comprehensive footer with legal links and payment methods

### ✅ **Admin Panel** (WordPress-Like Experience)
- [x] Professional admin layout with sidebar navigation
- [x] Dashboard with statistics cards
- [x] Product management interface
- [x] Add/Edit product forms with multilingual support
- [x] License key management with table view
- [x] CSV import functionality for license keys
- [x] CSV export functionality for license keys
- [x] Real-time statistics (available, sold, used, expired keys)
- [x] Status badges and filters
- [x] Admin authentication protection
- [x] Quick actions and navigation
- [x] Mobile-responsive admin interface

### ✅ **Database Architecture**
- [x] Comprehensive Cloudflare D1 schema
- [x] Users & authentication (admin/customer roles)
- [x] Categories with parent/child relationships
- [x] Products with multilingual support
- [x] License key management system
- [x] Orders & order items
- [x] Coupons & discounts
- [x] CMS pages with translations
- [x] Settings & homepage sections configuration
- [x] Optimized indexes for performance

### ✅ **API Routes**
- [x] Product APIs (featured, bestsellers, new, by slug)
- [x] Category APIs (list, products by category)
- [x] Brand APIs (featured brands)
- [x] Authentication APIs (register, login, logout, me)
- [x] Order creation API
- [x] Admin authentication middleware
- [x] Admin license management APIs
- [x] License CSV import/export APIs
- [x] Language detection middleware

### ✅ **Core Systems**
- [x] Database helper with prepared statements
- [x] Utility functions (formatting, hashing, calculations)
- [x] TypeScript type definitions
- [x] Session management
- [x] Password hashing (SHA-256)
- [x] Order number generation
- [x] VAT calculation
- [x] Schema.org JSON-LD generators
- [x] CSV parsing and generation

## 🚧 Features In Progress

### 🔄 **Product Pages**
- [ ] Product detail pages with full information
- [ ] Category listing pages with filters
- [ ] Search functionality with autocomplete
- [ ] Product filtering & sorting options
- [ ] Related products suggestions

### 🔄 **Shopping & Checkout**
- [ ] Shopping cart system with persistence
- [ ] Checkout flow with validation
- [ ] Guest checkout option
- [ ] Payment integration (Stripe/PayPal)
- [ ] Order confirmation emails
- [ ] Invoice PDF generation
- [ ] Coupon code application

### 🔄 **User Dashboard**
- [ ] User profile management
- [ ] Order history with details
- [ ] License key downloads
- [ ] Digital downloads with secure links
- [ ] Wishlist functionality
- [ ] Support ticket system
- [ ] Email preferences

### 🔄 **Additional Admin Features**
- [ ] Order management interface
- [ ] Customer management
- [ ] Coupon management UI
- [ ] Homepage section builder
- [ ] SEO settings per page
- [ ] Translation editor
- [ ] Analytics dashboard
- [ ] Settings management UI

### 🔄 **Additional Features**
- [ ] Multilingual content editor (EN/DE)
- [ ] Advanced SEO metadata
- [ ] Sitemap generation
- [ ] Review & rating system
- [ ] Email notification system
- [ ] Newsletter subscription

## 🏗️ Technical Architecture

```
┌─────────────────────────────────────────────┐
│         CLOUDFLARE PAGES (FRONTEND)          │
│  • Static HTML pages (SEO-optimized)        │
│  • TailwindCSS + FontAwesome                │
│  • Responsive design                        │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│     CLOUDFLARE WORKERS (HONO BACKEND)        │
│  • /api/products/* - Product operations     │
│  • /api/auth/* - Authentication             │
│  • /api/orders/* - Order processing         │
│  • /api/admin/* - Admin operations          │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│           CLOUDFLARE D1 (DATABASE)           │
│  • Users, Products, Categories              │
│  • Orders, License Keys                     │
│  • Multilingual content                     │
│  • SEO metadata                             │
└─────────────────────────────────────────────┘
```

## 📦 Database Schema

### Core Tables
- **users** - Customer & admin accounts
- **sessions** - Authentication sessions
- **categories** - Product categories (hierarchical)
- **category_translations** - Multilingual category data
- **brands** - Software manufacturers
- **products** - Software products
- **product_translations** - Multilingual product data
- **product_images** - Product screenshots
- **product_faqs** - Product Q&A
- **license_keys** - License key inventory
- **license_activations** - Activation tracking
- **orders** - Customer orders
- **order_items** - Order line items
- **coupons** - Discount codes
- **pages** - CMS pages
- **settings** - Site configuration

## 🚀 Development Setup

### Prerequisites
- Node.js 18+
- npm or pnpm
- Wrangler CLI

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd webapp

# Install dependencies
npm install

# Initialize local database (automatic with --local flag)
npm run build

# Start development server
pm2 start ecosystem.config.cjs

# Or run directly
npm run dev:sandbox
```

### Database Management

```bash
# Apply migrations locally
npm run db:migrate:local

# Seed database with sample data
npm run db:seed

# Reset database (delete + migrate + seed)
npm run db:reset

# Query local database
npm run db:console:local
```

### Available Scripts

```bash
npm run dev              # Vite dev server (development)
npm run dev:sandbox      # Wrangler pages dev with D1 (sandbox)
npm run build            # Build for production
npm run deploy           # Deploy to Cloudflare Pages
npm run clean-port       # Kill process on port 3000
npm run test             # Test localhost:3000
```

## 🎨 Design System

### Color Palette
- **Primary**: #1a2a4e (Dark Blue)
- **Accent**: #d4af37 (Gold)
- **Success**: #10b981 (Green)
- **Background**: #f8f9fa (Light Gray)
- **Text**: #1f2937 (Dark)

### Visual Elements
- Rounded cards (12px border-radius)
- Gold borders on premium items
- Trust badges with icons
- Professional typography
- Responsive grid layouts
- Hover effects and transitions

## 📝 API Endpoints

### Public APIs

#### Products
```
GET  /api/products/featured?limit=8
GET  /api/products/bestsellers?limit=6
GET  /api/products/new?limit=6
GET  /api/products/:slug
```

#### Categories
```
GET  /api/categories
GET  /api/categories/:slug/products?page=1&limit=20
```

#### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

#### Orders
```
POST /api/orders
GET  /api/orders/:orderNumber
```

### Admin APIs (Protected)
```
GET  /api/admin/dashboard
POST /api/admin/products
PUT  /api/admin/products/:id
...more to be implemented
```

## 🔐 Authentication

### Default Credentials

**Admin Account**:
- Email: `admin@example.com`
- Password: (hash placeholder - update in seed.sql)

**Customer Account**:
- Email: `customer@example.com`
- Password: (hash placeholder - update in seed.sql)

### Session Management
- JWT-like token system
- 7-day session expiration
- Secure HTTP-only cookies (production)

## 🌍 Multilingual Support

### Supported Languages
- **English (en)** - Default
- **German (de)** - Full translation

### URL Structure
```
/              → English homepage
/de            → German homepage
/products      → English products
/de/products   → German products
```

### Translation System
- Database-driven translations
- Separate tables for each translatable entity
- Admin panel for translation management (planned)

## 📊 Sample Data

The seed.sql includes:
- 5 products (Windows, Office, Kaspersky, Adobe, Server)
- 6 categories (Windows, Office, Server, Antivirus, Games, Design)
- 5 brands (Microsoft, Adobe, Kaspersky, Norton, Autodesk)
- Sample license keys
- 3 coupon codes
- CMS pages (About, Privacy, Terms, Imprint)

## 🛡️ Security Features

- **Password Hashing**: SHA-256 (upgrade to bcrypt via API recommended)
- **SQL Injection Protection**: Prepared statements
- **Session Validation**: Token-based authentication
- **CORS**: Configured for API routes
- **Input Validation**: Type checking and sanitization

## 🚀 Deployment

### Local Development
```bash
npm run build
pm2 start ecosystem.config.cjs
```

### Production Deployment

1. **Create D1 Database**:
```bash
npx wrangler d1 create webapp-production
# Copy database_id to wrangler.jsonc
```

2. **Apply Migrations**:
```bash
npm run db:migrate:prod
```

3. **Deploy to Cloudflare Pages**:
```bash
npm run deploy:prod
```

4. **Set Environment Variables**:
```bash
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name webapp
npx wrangler pages secret put SENDGRID_API_KEY --project-name webapp
```

## 📈 Performance

- **Lighthouse Score Target**: 95+
- **Database**: Optimized indexes on all foreign keys
- **CDN**: TailwindCSS & FontAwesome via CDN
- **Edge**: Cloudflare global network
- **Build Size**: ~120KB worker bundle (with admin panel)

## 🔧 Tech Stack

- **Framework**: Hono v4.11+
- **Runtime**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Language**: TypeScript 5+
- **Styling**: TailwindCSS 3+ (CDN)
- **Icons**: FontAwesome 6+ (CDN)
- **Build Tool**: Vite 6+
- **Package Manager**: npm

## 📁 Project Structure

```
webapp/
├── src/
│   ├── components/
│   │   └── homepage.tsx          # Homepage component
│   ├── lib/
│   │   └── database.ts           # Database helper class
│   ├── routes/                   # API route handlers (planned)
│   ├── types/
│   │   └── index.ts              # TypeScript definitions
│   ├── utils/
│   │   └── helpers.ts            # Utility functions
│   ├── index.tsx                 # Main application entry
│   └── renderer.tsx              # Layout component
├── migrations/
│   └── 0001_initial_schema.sql   # Database schema
├── public/                       # Static assets
├── seed.sql                      # Sample data
├── ecosystem.config.cjs          # PM2 configuration
├── wrangler.jsonc                # Cloudflare configuration
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript config
└── vite.config.ts                # Vite config
```

## 🎯 Roadmap

### Phase 1 (Current) ✅
- [x] Core architecture
- [x] Database schema
- [x] Homepage design
- [x] Basic API routes
- [x] Authentication system
- [x] Admin panel foundation
- [x] License key management

### Phase 2 (In Progress)
- [ ] Product detail pages
- [ ] Shopping cart
- [ ] Checkout system
- [ ] User dashboard
- [ ] Order management

### Phase 3
- [ ] Payment integration
- [ ] Email notifications
- [ ] Advanced admin features
- [ ] SEO optimization

### Phase 4
- [ ] Analytics
- [ ] Marketing tools
- [ ] Performance optimization
- [ ] Advanced features

## 🤝 Contributing

This is a professional eCommerce platform. Contributions welcome!

## 📄 License

Proprietary - All rights reserved

## 👨‍💻 Support

For support and questions:
- Email: support@premiumsoftwarestore.com
- Documentation: [Coming soon]

---

**Built with ❤️ using Hono + Cloudflare**

*Last Updated: 2026-01-28*
