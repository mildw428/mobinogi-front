# syntax=docker/dockerfile:1.4

# Step 1: Build the Next.js app
FROM --platform=linux/amd64 node:23 AS builder

WORKDIR /app

# 복사: 환경변수 파일 포함
COPY . .

# 환경변수 파일을 Next.js가 인식할 수 있도록 `.env`로 복사
RUN cp .env.prod .env.local

# ❗ CI 환경임을 명시 (중요)
ENV CI=1

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Build with env vars from .env
RUN pnpm run build

# Step 2: Serve the app
FROM --platform=linux/amd64 node:23

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy built app and dependencies
COPY --from=builder /app /app

EXPOSE 3000

CMD ["pnpm", "run", "start"]