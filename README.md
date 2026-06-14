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
