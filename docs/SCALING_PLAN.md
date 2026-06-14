# Scaling Plan

To scale to millions of users, the following plan is in place:

1. **Redis caching:** Feed queries are strictly read from Redis O(1) sorted sets instead of SQL aggregations.
2. **Neon Serverless Postgres:** Neon can scale compute instantly during spikes.
3. **Kafka Migration:** The Event Bus will be moved to Apache Kafka. This ensures heavy tasks (like pushing to 10M followers) are handled via partitioned message queues and dedicated workers.
4. **WebSocket Scaling:** `Socket.io` can be run with Redis Adapter to sync messages across multiple Node instances.
5. **Microservices:** Heavy modules (Feed generation) will be moved out to separate Go or Rust services consuming Kafka events, while standard CRUD remains in Node.js.
