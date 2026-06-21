# Campus Connect Backend

A Service-Isolated Modular Monolith for a modern social networking platform.

## Features
- **Strict Modularity**: Isolated database schemas and clients per module.
- **Event-Driven**: Fully decoupled cross-module communication using an Event Bus.
- **Microservice-Ready**: Designed to be seamlessly transitioned into microservices.
- **Complex Feed Ranking**: Engagement, Freshness, Social Graph, and Velocity-based ranking.
- **Real-Time Ready**: Websocket integrated for Chat.

## Tech Stack
- Node.js & TypeScript
- Express.js
- Prisma ORM
- PostgreSQL (Neon)
- Redis (Upstash)

## Quick Start
1. Clone the repo
2. Create `.env` from `.env.example`
3. Run `npm install`
4. Run `npm run prisma:generate`
5. Run `npm run dev`

## Direct Azure VM Deployment (Node.js & PM2)

This backend can be run directly on your Azure VM using Node.js and daemonized with PM2.

### Step 1: Install Node.js on your Azure VM
If not already installed, run the following commands on your Ubuntu/Debian Azure VM (using Node Version Manager - NVM is recommended):
```bash
# Update package index and install build dependencies
sudo apt update
sudo apt install -y curl build-essential

# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Load NVM into current shell session
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js 18
nvm install 18
nvm use 18
```

### Step 2: Clone, Install Dependencies, & Generate Clients
Clone your repository onto the Azure VM, navigate to the backend folder, and install all dependencies:
```bash
# Install all dependencies (including devDependencies like typescript)
npm install
```

### Step 3: Configure Production Environment Variables
Create a production `.env` file in the root of the backend directory:
```bash
nano .env
```
Ensure all required environment variables are filled in:
* `PORT=3000`
* `NODE_ENV=production`
* `DATABASE_URL` (Main database connection URL)
* `CHAT_DATABASE_URL` (Chat database connection URL)
* `UPSTASH_REDIS_REST_URL` (Redis connection URL, e.g., `rediss://...`)
* `JWT_SECRET` (Secure JWT secret string)
* `CLIENT_URL` (Frontend URL)
* `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (For asset uploads)
* `RESEND_API_KEY` (For sending emails)

### Step 4: Generate Clients and Build the Application
Run the Prisma generation script to generate the client engines natively for the VM's OS, then compile TypeScript into the `dist` folder:
```bash
# Generate all 11 database clients for Linux
npm run prisma:generate

# Compile TypeScript and copy clients
npm run build
```

### Step 5: Start and Daemonize with PM2
Install PM2 globally to keep the server running in the background and automatically restart it if it crashes:
```bash
# Install PM2 globally
npm install -g pm2

# Start the server
pm2 start dist/server.js --name campus-connect-backend --env NODE_ENV=production --env PORT=3000

# Set up PM2 to start automatically on VM reboot
pm2 startup
pm2 save
```

### Step 6: Verify Deployment
Check the status of the running app and view logs:
```bash
# Check PM2 processes list
pm2 status

# View real-time logs
pm2 logs campus-connect-backend
```
The server will run on port `3000` (or the PORT defined in your `.env`). Make sure to open port `3000` in your Azure Network Security Group (NSG) inbound rules to allow external connections, or proxy it through a web server like Nginx with SSL configuration.
