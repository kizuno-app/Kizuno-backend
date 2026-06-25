#!/bin/bash
# ============================================================================
# Campus Connect Backend - Azure VM Deployment Script
# Target: Ubuntu 22.04+ on Azure VM
# Usage: bash deploy.sh
# ============================================================================

set -e  # Exit on any error

echo "================================================"
echo "  Campus Connect Backend - Production Deployment"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ── Step 1: Check Node.js ───────────────────────────────────────────────────
echo -e "${YELLOW}[1/6] Checking Node.js...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
    echo -e "  Found Node.js $(node -v)"
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo -e "  ${RED}Node.js 18+ required. Installing Node.js 20 LTS...${NC}"
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
else
    echo -e "  ${YELLOW}Node.js not found. Installing Node.js 20 LTS...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi
echo -e "  ${GREEN}Node.js $(node -v) ✓${NC}"
echo -e "  ${GREEN}npm $(npm -v) ✓${NC}"
echo ""

# ── Step 2: Check .env file ─────────────────────────────────────────────────
echo -e "${YELLOW}[2/6] Checking environment configuration...${NC}"
if [ ! -f .env ]; then
    echo -e "  ${RED}ERROR: .env file not found!${NC}"
    echo -e "  Copy .env.example to .env and fill in your values:"
    echo -e "    cp .env.example .env"
    echo -e "    nano .env"
    exit 1
fi
echo -e "  ${GREEN}.env file found ✓${NC}"

# Verify critical env vars without sourcing (to avoid syntax errors from unquoted special characters)
DB_URL_VAL=$(grep -E "^\s*DATABASE_URL\s*=" .env | cut -d'=' -f2- | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' | tr -d '"' | tr -d "'")
JWT_SECRET_VAL=$(grep -E "^\s*JWT_SECRET\s*=" .env | cut -d'=' -f2- | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' | tr -d '"' | tr -d "'")

if [ -z "$DB_URL_VAL" ]; then
    echo -e "  ${RED}ERROR: DATABASE_URL is not set or empty in .env${NC}"
    exit 1
fi
if [ -z "$JWT_SECRET_VAL" ] || [ "$JWT_SECRET_VAL" = "super-secret-key" ] || [ "$JWT_SECRET_VAL" = "generate-a-strong-secret-here" ]; then
    echo -e "  ${YELLOW}WARNING: JWT_SECRET should be a strong random secret for production!${NC}"
fi
echo ""

# ── Step 3: Install dependencies ────────────────────────────────────────────
echo -e "${YELLOW}[3/6] Installing dependencies (including devDependencies for build)...${NC}"
if [ -f package-lock.json ]; then
    npm ci --include=dev 2>&1 | tail -5
else
    echo -e "  ${YELLOW}No package-lock.json found, running npm install...${NC}"
    npm install --include=dev 2>&1 | tail -5
fi
echo -e "  ${GREEN}Dependencies installed ✓${NC}"
echo ""

# ── Step 4: Generate Prisma clients ─────────────────────────────────────────
echo -e "${YELLOW}[4/6] Generating Prisma clients for all modules...${NC}"
npm run prisma:generate 2>&1 | grep -E "Generated|Error" || true
echo -e "  ${GREEN}Prisma clients generated ✓${NC}"
echo ""

# ── Step 5: Build TypeScript ────────────────────────────────────────────────
echo -e "${YELLOW}[5/6] Building TypeScript → JavaScript...${NC}"
npx tsc 2>&1
node copy-clients.js 2>&1
echo -e "  ${GREEN}Build complete ✓${NC}"
echo ""

# ── Step 5.5: Prune development dependencies for production ─────────────────
echo -e "${YELLOW}Pruning development dependencies...${NC}"
npm prune --omit=dev 2>&1 | tail -5
echo -e "  ${GREEN}Pruning complete ✓${NC}"
echo ""

# ── Step 6: Start server ────────────────────────────────────────────────────
echo -e "${YELLOW}[6/6] Starting server...${NC}"
echo ""
echo "================================================"
echo -e "  ${GREEN}Deployment complete!${NC}"
echo "================================================"
echo ""
echo "To start the server:"
echo "  NODE_ENV=production node dist/server.js"
echo ""
echo "To run in background with auto-restart (recommended):"
echo "  npm install -g pm2"
echo "  pm2 start dist/server.js --name campus-connect-backend --env production"
echo "  pm2 save"
echo "  pm2 startup  # Run the command it outputs to enable auto-start on boot"
echo ""
echo "To set up as a systemd service:"
echo "  sudo bash -c 'cat > /etc/systemd/system/campus-connect.service << EOF"
echo "[Unit]"
echo "Description=Campus Connect Backend"
echo "After=network.target"
echo ""
echo "[Service]"
echo "Type=simple"
echo "User=$USER"
echo "WorkingDirectory=$(pwd)"
echo "ExecStart=$(which node) dist/server.js"
echo "Restart=on-failure"
echo "RestartSec=10"
echo "Environment=NODE_ENV=production"
echo "EnvironmentFile=$(pwd)/.env"
echo ""
echo "[Install]"
echo "WantedBy=multi-user.target"
echo "EOF'"
echo ""
echo "  sudo systemctl daemon-reload"
echo "  sudo systemctl enable campus-connect"
echo "  sudo systemctl start campus-connect"
echo ""
echo -e "${YELLOW}Don't forget to:${NC}"
echo "  1. Open port ${PORT:-5000} in Azure NSG (Network Security Group)"
echo "  2. Set CLIENT_URL in .env to your frontend's URL"
echo "  3. Set NEXT_PUBLIC_API_URL=http://<VM-IP>:${PORT:-5000}/api/v1 in frontend"
echo "  4. Set NEXT_PUBLIC_WS_URL=http://<VM-IP>:${PORT:-5000} in frontend"
echo ""
