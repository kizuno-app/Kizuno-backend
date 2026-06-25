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

## Render Blueprint Deployment

This backend is pre-configured to be deployed on **Render** using the provided `render.yaml` Blueprint specification.

### Step 1: Push changes to GitHub
Ensure you have pushed all your latest configuration changes to your GitHub repository.

### Step 2: Deploy to Render
1. Go to the **[Render Dashboard](https://dashboard.render.com/)**.
2. Click **New +** and select **Blueprint**.
3. Connect your GitHub repository.
4. Render will detect the `render.yaml` file and parse the blueprint.
5. In the configuration screen, you will need to fill in the required environment variables:
   * `DATABASE_URL` (Main database connection URL)
   * `CHAT_DATABASE_URL` (Chat module database connection URL)
   * `UPSTASH_REDIS_REST_URL` (Your Upstash Redis connection URL, e.g., `rediss://...`)
   * `CLIENT_URL` (Your production frontend app URL, e.g. `https://yourdomain.com`)
   * `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (For avatar/media uploads)
   * `CHAT_CLOUDINARY_CLOUD_NAME`, `CHAT_CLOUDINARY_API_SECRET` (Optionally specify separate Cloudinary credentials for the chat, or copy the main one)
   * `RESEND_API_KEY` (Your Resend credentials for sending automated transactional emails)
6. Click **Approve** / **Apply** to start the deployment.

### Step 3: Verify Deployment
* Render will automatically spin up a native Node.js 18 environment, download dependencies, run the Prisma generation, compile the TypeScript files, and start the production web service.
* Once the deployment status turns green (**Live**), your server is active and accessible via the generated Render URL on port `3000`.

## Azure VM Deployment

This backend includes a `deploy.sh` script designed to automate deployment on an Ubuntu 22.04+ Azure VM.

### Steps to Deploy

1. **Clone the repository on the Azure VM**:
   ```bash
   git clone <your-repo-url> campus-connect-backend
   cd campus-connect-backend
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and fill in the required variables (DATABASE_URL, JWT_SECRET, etc.):
   ```bash
   cp .env.example .env
   nano .env
   ```

3. **Run the deployment script**:
   ```bash
   bash deploy.sh
   ```
   This script will verify Node.js, install production dependencies, generate all Prisma clients, compile the TypeScript code, and prepare the build.

4. **Run in the background using PM2**:
   ```bash
   sudo npm install -g pm2
   pm2 start dist/server.js --name campus-connect-backend --env production
   pm2 save
   pm2 startup
   ```

5. **Firewall / Network Rules**:
   Ensure you open port `5000` (or your configured `PORT`) in your Azure Network Security Group (NSG) to allow inbound traffic.

