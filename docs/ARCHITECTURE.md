# Architecture

## Modular Monolith
The system is built as a single Node.js application but divided into strict modules:
- **Auth**: User registration, login, JWT.
- **User**: Profiles and personal data.
- **Connection**: Follows graph.
- **Post**: User-generated content.
- **Feed**: High-performance feed caching and ranking.
- **Chat**: Real-time messaging.
- **Notification**: Alerts and updates.
- **Discover**: Trending and suggestions.

## Strict Boundaries
Each module is self-contained. A module cannot directly import from another module's service.
All cross-module communication happens asynchronously via an Event Bus (`shared/events`).

## Technology Choices
- **Express + TypeScript**: Reliable, strongly-typed.
- **Prisma + PostgreSQL (Neon)**: Serverless ready, strict typing, schema management per module.
- **Redis (Upstash)**: Used for feed sorted sets, presence, and session caching.
- **Socket.io**: Real-time Chat capabilities.
