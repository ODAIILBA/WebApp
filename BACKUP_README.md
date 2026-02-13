# 📦 SoftwareKing24 Webapp Backup

## 🚀 Quick Start on Kali Linux

### Option 1: Automated Setup (Recommended)

```bash
# 1. Extract the backup
tar -xzf webapp-backup-*.tar.gz

# 2. Run the automated setup script
cd /home/user/webapp
chmod +x setup-kali.sh
./setup-kali.sh

# 3. Open browser to http://localhost:3000
```

The script will automatically:
- ✅ Install Node.js, npm, PM2, and Wrangler
- ✅ Install project dependencies
- ✅ Initialize the database
- ✅ Build the project
- ✅ Start the server with PM2

---

### Option 2: Manual Setup

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

# 5. Access at http://localhost:3000
```

---

## 📋 System Requirements

- **OS:** Kali Linux (or any Debian-based Linux)
- **Node.js:** v18.x or higher
- **npm:** v9.x or higher
- **RAM:** 2GB minimum, 4GB recommended
- **Disk Space:** 500MB minimum

---

## 🛠️ Useful Commands

### PM2 Process Management
```bash
pm2 list              # List all running processes
pm2 logs webapp       # View logs
pm2 restart webapp    # Restart the app
pm2 stop webapp       # Stop the app
pm2 delete webapp     # Remove from PM2
```

### Database Operations
```bash
# View products
npx wrangler d1 execute webapp-production --local \
  --command="SELECT * FROM products LIMIT 5"

# Reset database (deletes all data)
npm run db:reset
```

### Testing
```bash
# Test homepage
curl http://localhost:3000

# Test cart API
curl -X POST http://localhost:3000/api/cart/items \
  -H "Content-Type: application/json" \
  -H "X-Session-ID: test123" \
  -d '{"product_id": 1, "quantity": 1}'
```

---

## 📚 Documentation

- **Full Setup Guide:** `KALI_LINUX_SETUP_GUIDE.md`
- **Project README:** `README.md`
- **Cart Fix Documentation:** `ADD_TO_CART_FINAL_FIX.md`

---

## 🌐 Access Points

Once running, access these URLs:

- **Homepage:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin
- **Cart:** http://localhost:3000/cart
- **Test Page:** http://localhost:3000/test-cart.html

---

## 🆘 Troubleshooting

### Port 3000 already in use
```bash
sudo fuser -k 3000/tcp
pm2 restart webapp
```

### Database errors
```bash
rm -rf .wrangler/state/v3/d1
npx wrangler d1 migrations apply webapp-production --local
```

### Build errors
```bash
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

---

## 📊 What's Included

✅ **Complete E-Commerce Backend**
- User authentication & authorization
- Shopping cart with session management
- Order processing with tax calculation
- License key generation system
- Admin dashboard
- Firewall & security features

✅ **Frontend**
- Modern responsive design
- Add to cart functionality (fully working!)
- Product browsing and search
- German language interface
- Mobile-friendly

✅ **Database**
- 15+ tables for complete e-commerce
- Migrations included
- Sample data (optional)

✅ **Deployment Ready**
- PM2 process manager configured
- Cloudflare Pages compatible
- Git repository included

---

## 🎯 Next Steps

1. ✅ Extract backup
2. ✅ Run setup script
3. ✅ Access http://localhost:3000
4. 📝 Customize content in admin panel
5. 🎨 Modify branding (logos, colors)
6. 🚀 Deploy to production (optional)

---

## 📞 Support

If you encounter issues:

1. Check logs: `pm2 logs webapp`
2. Review setup guide: `KALI_LINUX_SETUP_GUIDE.md`
3. Test API: `curl http://localhost:3000/api/health`

---

**Version:** Latest backup  
**Status:** ✅ Production Ready  
**Last Updated:** 2026-02-13  
**Total Commits:** 467+
