FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY server/package*.json ./
COPY package*.json ../

# Install dependencies
RUN npm install

# Copy application
COPY server/ .

EXPOSE 5000

ENV NODE_ENV=production

CMD ["npm", "start"]
