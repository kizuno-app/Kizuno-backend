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

## Docker & Azure VM Deployment

This backend is pre-configured to be deployed containerized using Docker and Docker Compose.

### Step 1: Install Docker & Docker Compose on your Azure VM
If not already installed, run the following commands on your Ubuntu/Debian Azure VM:
```bash
# Update package index and install Docker
sudo apt update
sudo apt install -y docker.io docker-compose

# Start and enable Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to the docker group (so you don't need sudo for docker commands)
sudo usermod -aG docker $USER
# Log out and log back in to apply group changes
```

### Step 2: Configure Environment Variables
On your Azure VM, clone the repository, navigate into the project directory, and create a production `.env` file containing all the credentials (similar to your local `.env`):
```bash
nano .env
```
Ensure all required environment variables are filled in:
* `DATABASE_URL` (Main database URL)
* `CHAT_DATABASE_URL` (Chat module database URL)
* `UPSTASH_REDIS_REST_URL` (Redis connection URL, e.g., `rediss://...`)
* `JWT_SECRET` (Secure JWT secret string)
* `CLIENT_URL` (Frontend URL)
* `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (For asset uploads)
* `RESEND_API_KEY` (For sending emails)

### Step 3: Run the Application
Run the following command to build the Docker image and start the backend container in the background (detached mode):
```bash
docker-compose up --build -d
```

### Step 4: Verify Deployment
Check the status of the container and view logs:
```bash
# List running containers
docker-compose ps

# View real-time logs
docker-compose logs -f
```
The server will be listening on port `3000` inside your Azure VM. Make sure to open port `3000` (or whichever port you map) in your Azure Network Security Group (NSG) inbound port rules if you want it to be publicly accessible, or configure a reverse proxy like Nginx with SSL (Let's Encrypt) to proxy to port `3000`.
