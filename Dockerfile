FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source code and prisma schemas
COPY src ./src
COPY prisma ./prisma

# Generate Prisma clients
RUN npm run prisma:generate

# Build typescript
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/modules/*/db/client ./src/modules/*/db/client

EXPOSE 3000

CMD ["npm", "start"]
