# ─── FolioAI Multi-Stage Docker Build ───────────────────────────────────────

FROM node:20-alpine AS frontend-builder

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

# ─────────────────────────────────────────────────────────────

FROM node:20-alpine AS production

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY --from=frontend-builder /app/dist ./dist

RUN mkdir -p /app/data

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/portfolio/list || exit 1

ENV NODE_ENV=production

CMD ["node", "dist/server.cjs"]
