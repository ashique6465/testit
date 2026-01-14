# Frontend Dockerfile (Next.js production)
# Multi-stage build
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# Runner image
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Install only production deps
RUN npm ci --production --legacy-peer-deps

EXPOSE 3000
CMD ["npm", "start"]
