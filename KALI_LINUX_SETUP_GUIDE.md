# 🐉 Kali Linux Setup Guide - SoftwareKing24 Webapp

## 📋 Prerequisites

Before starting, ensure you have these installed on your Kali Linux system:

### 1. Install Node.js and npm
```bash
# Update package list
sudo apt update

# Install Node.js (v18 or higher recommended)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should be v18+ or v20+
npm --version   # Should be v9+ or v10+
```

### 2. Install Git (if not already installed)
```bash
sudo apt install -y git
```

### 3. Install PM2 globally (for process management)
```bash
sudo npm install -g pm2
```

### 4. Install Wrangler CLI (Cloudflare development tool)
```bash
sudo npm install -g wrangler
```

---

## 📦 Step 1: Extract Your Backup

```bash
# Navigate to where you downloaded the backup
cd ~/Downloads  # Or wherever you downloaded it

# Extract the tar.gz backup
tar -xzf webapp-backup-YYYY-MM-DD.tar.gz

# This will create a directory structure like: /home/user/webapp/
# Navigate to it
cd /home/user/webapp
```

**Note:** The backup preserves the absolute path structure, so it will extract to `/home/user/webapp/`. If this directory doesn't exist, it will be created.

---

## 🔧 Step 2: Install Dependencies

```bash
# Navigate to the project directory
cd /home/user/webapp

# Install all npm packages (this may take a few minutes)
npm install

# If you get permission errors, use:
sudo npm install --unsafe-perm=true --allow-root
```

---

## 🗄️ Step 3: Initialize Local Database

The project uses Cloudflare D1 database. For local development, you need to initialize the local SQLite database:

```bash
# Navigate to project directory
cd /home/user/webapp

# Apply database migrations (creates tables)
npx wrangler d1 migrations apply webapp-production --local

# Verify migrations applied
npx wrangler d1 execute webapp-production --local --command="SELECT name FROM sqlite_master WHERE type='table'"
```

**Expected output:** You should see tables like `users`, `products`, `orders`, `shopping_carts`, etc.

---

## 🚀 Step 4: Run Development Server

### Option A: Using PM2 (Recommended - Background Process)

```bash
cd /home/user/webapp

# Build the project first
npm run build

# Start with PM2
pm2 start ecosystem.config.cjs

# Check status
pm2 status

# View logs
pm2 logs webapp --nostream

# Test the server
curl http://localhost:3000
```

**PM2 Commands:**
```bash
pm2 list              # List all processes
pm2 restart webapp    # Restart the app
pm2 stop webapp       # Stop the app
pm2 delete webapp     # Remove from PM2
pm2 logs webapp       # Stream logs (Ctrl+C to exit)
```

### Option B: Using npm directly (Foreground Process)

```bash
cd /home/user/webapp

# Build first
npm run build

# Run development server (blocks terminal)
npm run dev:sandbox
# Or with D1 database:
npm run dev:d1
```

Press `Ctrl+C` to stop the server.

---

## 🌐 Step 5: Access the Application

Once the server is running:

1. **Open your browser** (Firefox, Chromium, etc.)
2. **Navigate to:** `http://localhost:3000`
3. **You should see:** The SoftwareKing24 homepage

---

## 🔍 Troubleshooting

### Issue: Port 3000 Already in Use
```bash
# Kill process on port 3000
sudo fuser -k 3000/tcp

# Or find and kill manually
sudo lsof -i :3000
sudo kill -9 <PID>
```

### Issue: "Module not found" errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Issue: Permission errors
```bash
# Fix permissions
sudo chown -R $USER:$USER /home/user/webapp
chmod -R 755 /home/user/webapp
```

### Issue: Database errors
```bash
# Reset local database
rm -rf .wrangler/state/v3/d1
npx wrangler d1 migrations apply webapp-production --local
```

### Issue: Build errors
```bash
# Clear cache and rebuild
rm -rf dist .wrangler
npm run build
```

---

## 📂 Project Structure

```
/home/user/webapp/
├── src/
│   ├── index.tsx              # Main application entry
│   ├── components/            # UI components
│   ├── services/              # Business logic
│   └── types/                 # TypeScript types
├── public/                    # Static files
│   └── static/                # JS, CSS, images
├── migrations/                # Database migrations
├── dist/                      # Built files (generated)
├── .wrangler/                 # Local D1 database (generated)
├── package.json               # Dependencies
├── wrangler.jsonc             # Cloudflare config
├── ecosystem.config.cjs       # PM2 config
└── README.md                  # Project docs
```

---

## 🛠️ Development Commands

```bash
# Build project
npm run build

# Run development server (with D1)
npm run dev:d1

# Run without D1
npm run dev:sandbox

# Apply database migrations
npm run db:migrate:local

# Reset database (caution: deletes all data)
npm run db:reset

# View database
npx wrangler d1 execute webapp-production --local --command="SELECT * FROM products LIMIT 5"

# Git commands
npm run git:status
npm run git:log
```

---

## 🔐 Environment Variables

The project uses `.dev.vars` for local secrets. If you need API keys:

```bash
# Create .dev.vars file
cat > .dev.vars << 'EOF'
JWT_SECRET=your-secret-key-here
CLOUDFLARE_API_TOKEN=your-token-here
EOF
```

---

## 📝 Testing the Application

### Test Cart Functionality
```bash
# Add item to cart
curl -X POST http://localhost:3000/api/cart/items \
  -H "Content-Type: application/json" \
  -H "X-Session-ID: test123" \
  -d '{"product_id": 1, "quantity": 1}'

# Get cart
curl http://localhost:3000/api/cart \
  -H "X-Session-ID: test123"
```

### Test Admin Panel
1. Navigate to: `http://localhost:3000/admin`
2. Default credentials (if seeded):
   - Email: `admin@softwareking24.com`
   - Password: Check database or create new user

---

## 🚀 Production Deployment (Optional)

To deploy to Cloudflare Pages:

```bash
# Login to Cloudflare
npx wrangler login

# Create D1 database (production)
npx wrangler d1 create webapp-production

# Apply migrations to production
npx wrangler d1 migrations apply webapp-production

# Deploy
npm run deploy:prod
```

---

## 🆘 Getting Help

### Check Logs
```bash
# PM2 logs
pm2 logs webapp

# Wrangler logs
tail -f /home/user/.config/.wrangler/logs/wrangler-*.log
```

### Common Issues
1. **Port conflict** → Kill process on port 3000
2. **Database errors** → Reset local database
3. **Build errors** → Clean install dependencies
4. **Permission errors** → Fix ownership with chown

---

## 📚 Additional Resources

- **Node.js Docs:** https://nodejs.org/docs/
- **Wrangler Docs:** https://developers.cloudflare.com/workers/wrangler/
- **PM2 Docs:** https://pm2.keymetrics.io/docs/
- **Hono Framework:** https://hono.dev/

---

## ✅ Quick Start Summary

```bash
# 1. Extract backup
tar -xzf webapp-backup-*.tar.gz
cd /home/user/webapp

# 2. Install dependencies
npm install

# 3. Initialize database
npx wrangler d1 migrations apply webapp-production --local

# 4. Build and run
npm run build
pm2 start ecosystem.config.cjs

# 5. Open browser
# http://localhost:3000

# 6. Test it works
curl http://localhost:3000/api/health
```

---

**Status:** ✅ Ready for Kali Linux  
**Last Updated:** 2026-02-13  
**Support:** Check logs with `pm2 logs webapp`
