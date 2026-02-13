#!/bin/bash

# 🐉 SoftwareKing24 Webapp - Kali Linux Quick Setup Script
# This script automates the setup process for running the webapp backup

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🐉 SoftwareKing24 Webapp - Kali Linux Setup           ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
    print_error "Please do not run this script as root"
    exit 1
fi

# Step 1: Check Node.js
print_info "Step 1: Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_success "Node.js installed: $NODE_VERSION"
else
    print_error "Node.js is not installed"
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
    print_success "Node.js installed successfully"
fi

# Step 2: Check npm
print_info "Step 2: Checking npm installation..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_success "npm installed: $NPM_VERSION"
else
    print_error "npm is not installed (should come with Node.js)"
    exit 1
fi

# Step 3: Install PM2
print_info "Step 3: Installing PM2..."
if command -v pm2 &> /dev/null; then
    print_success "PM2 already installed"
else
    sudo npm install -g pm2
    print_success "PM2 installed successfully"
fi

# Step 4: Install Wrangler
print_info "Step 4: Installing Wrangler..."
if command -v wrangler &> /dev/null; then
    print_success "Wrangler already installed"
else
    sudo npm install -g wrangler
    print_success "Wrangler installed successfully"
fi

# Step 5: Navigate to project directory
PROJECT_DIR="/home/user/webapp"
print_info "Step 5: Checking project directory..."
if [ ! -d "$PROJECT_DIR" ]; then
    print_error "Project directory not found: $PROJECT_DIR"
    print_info "Please extract your backup first:"
    echo "  tar -xzf webapp-backup-*.tar.gz"
    exit 1
fi

cd "$PROJECT_DIR"
print_success "Project directory found: $PROJECT_DIR"

# Step 6: Install dependencies
print_info "Step 6: Installing npm dependencies (this may take a few minutes)..."
if [ -f "package.json" ]; then
    npm install
    print_success "Dependencies installed successfully"
else
    print_error "package.json not found in $PROJECT_DIR"
    exit 1
fi

# Step 7: Initialize database
print_info "Step 7: Initializing local database..."
if [ -d "migrations" ]; then
    npx wrangler d1 migrations apply webapp-production --local
    print_success "Database initialized successfully"
else
    print_warning "No migrations directory found, skipping database setup"
fi

# Step 8: Build project
print_info "Step 8: Building project..."
npm run build
print_success "Project built successfully"

# Step 9: Kill any process on port 3000
print_info "Step 9: Checking port 3000..."
if sudo lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    print_warning "Port 3000 is in use, killing process..."
    sudo fuser -k 3000/tcp
    sleep 2
    print_success "Port 3000 is now free"
else
    print_success "Port 3000 is available"
fi

# Step 10: Start with PM2
print_info "Step 10: Starting application with PM2..."
pm2 delete webapp 2>/dev/null || true  # Delete old instance if exists
pm2 start ecosystem.config.cjs
print_success "Application started successfully"

# Step 11: Wait for server to start
print_info "Step 11: Waiting for server to start..."
sleep 5

# Step 12: Test server
print_info "Step 12: Testing server..."
if curl -s -f http://localhost:3000 > /dev/null 2>&1; then
    print_success "Server is responding on http://localhost:3000"
else
    print_error "Server is not responding"
    print_info "Check logs with: pm2 logs webapp"
    exit 1
fi

# Display PM2 status
echo ""
print_info "PM2 Process Status:"
pm2 list

# Final instructions
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  🎉 Setup Complete! Your webapp is now running!        ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📍 Access your application:${NC}"
echo -e "   🌐 Homepage: ${GREEN}http://localhost:3000${NC}"
echo -e "   🛡️  Admin:    ${GREEN}http://localhost:3000/admin${NC}"
echo -e "   🛒 Cart:     ${GREEN}http://localhost:3000/cart${NC}"
echo ""
echo -e "${BLUE}📋 Useful commands:${NC}"
echo -e "   ${YELLOW}pm2 list${NC}              - List all processes"
echo -e "   ${YELLOW}pm2 logs webapp${NC}       - View application logs"
echo -e "   ${YELLOW}pm2 restart webapp${NC}    - Restart application"
echo -e "   ${YELLOW}pm2 stop webapp${NC}       - Stop application"
echo -e "   ${YELLOW}pm2 delete webapp${NC}     - Remove from PM2"
echo ""
echo -e "${BLUE}🧪 Test the cart API:${NC}"
echo -e "   ${YELLOW}curl -X POST http://localhost:3000/api/cart/items \\${NC}"
echo -e "   ${YELLOW}     -H 'Content-Type: application/json' \\${NC}"
echo -e "   ${YELLOW}     -H 'X-Session-ID: test123' \\${NC}"
echo -e "   ${YELLOW}     -d '{\"product_id\": 1, \"quantity\": 1}'${NC}"
echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo -e "   📖 Full guide: ${GREEN}$PROJECT_DIR/KALI_LINUX_SETUP_GUIDE.md${NC}"
echo -e "   📖 README:     ${GREEN}$PROJECT_DIR/README.md${NC}"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
echo ""
