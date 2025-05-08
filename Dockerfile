# ---------- Stage 1: Build ----------
  FROM node:23-slim AS builder

  # Set working directory
  WORKDIR /app
  
  # Install dependencies (include dev for build)
  COPY package*.json ./
  RUN npm ci
  
  # Copy the entire project (including TS files)
  COPY . .
  
  # Run TypeScript compiler
  RUN npm run build
  
  # ---------- Stage 2: Production ----------
  FROM node:23-slim AS production
  
  # Set production environment
  ENV NODE_ENV=production
  WORKDIR /app
  
  # Install only production dependencies
  COPY package*.json ./
  RUN npm ci --only=production
  
  # Copy the compiled build from the builder
  COPY --from=builder /app/build ./build
  
  # Expose the app port
  EXPOSE 8016
  
  # Start the app using the compiled JS file
  CMD ["node", "build/src/index.js"]
  