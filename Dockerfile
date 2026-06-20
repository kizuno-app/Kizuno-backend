# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install build dependencies for native Node packages (like bcrypt)
RUN apk add --no-cache python3 make g++

COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies including devDependencies for compilation
RUN npm ci

# Copy source code and copying script
COPY src ./src
COPY copy-clients.js ./

# Generate Prisma clients
RUN npm run prisma:generate

# Build typescript (runs tsc and copy-clients.js)
RUN npm run build

# Prune development dependencies to keep the production image slim
RUN npm prune --production

# Run stage
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "start"]
