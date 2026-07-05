# ─── FolioAI Multi-Stage Docker Build ───────────────────────────────────────
# Stage 1: Build Vite frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copy package files and install all deps
COPY package.json ./
RUN npm install

# Copy source files
COPY . .

# Build the Vite frontend bundle
RUN npm run build

# ─── Stage 2: Production Runtime ─────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

# Install only production deps
COPY package.json ./
RUN npm install --omit=dev

# Copy compiled server bundle from build stage
COPY --from=frontend-builder /app/dist ./dist

# Copy server source (will be compiled by esbuild in build step)
COPY --from=frontend-builder /app/dist/server.cjs ./dist/server.cjs 2>/dev/null || true

# Ensure data directory exists for persistent DB
RUN mkdir -p /app/data

# Expose Cloud Run default port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/portfolio/list || exit 1

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Run the compiled server
CMD ["node", "dist/server.cjs"]
