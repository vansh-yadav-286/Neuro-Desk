# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY client/package*.json ./client/
COPY package*.json ./

# Install dependencies
RUN npm install

WORKDIR /app/client
RUN npm install
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve to run Next.js production build
RUN npm install -g serve

# Copy built application
COPY --from=builder /app/client/.next ./.next
COPY --from=builder /app/client/public ./public
COPY --from=builder /app/client/package*.json ./

# Install production dependencies only
RUN npm ci --only=production

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
