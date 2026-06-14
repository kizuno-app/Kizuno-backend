# Migration Guide: Monolith to Microservices

Because the codebase strictly follows the Modular Monolith pattern, migrating a module (e.g., `Chat Module`) into its own Microservice is a highly structured process:

1. **Extract the Module Folder**: Move `src/modules/chat` into a new repository.
2. **Replace Internal Event Bus**: Replace `shared/events/index.ts` with a real Kafka or RabbitMQ publisher/subscriber.
3. **Database Extraction**: The `Chat` module already has its own `schema.prisma`. Deploy a new Postgres database or a new schema in Neon just for Chat.
4. **API Gateway**: Update the primary monolith's API Gateway (or add NGINX) to route `/api/v1/chat/*` requests to the new microservice URL instead of handling it internally.
5. **No Logic Changes**: Since modules do not directly call each other's services, no business logic needs to be rewritten.
