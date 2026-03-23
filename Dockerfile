# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Nhận các biến từ GitHub Actions (Build-args)
ARG DATABASE_URL
ARG AUTH_SECRET
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

# Đặt biến môi trường cho quá trình Build
ENV DATABASE_URL=$DATABASE_URL
ENV AUTH_SECRET=$AUTH_SECRET
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
# Các biến cố định cho server của thầy
ENV AUTH_URL="http://157.20.82.3:21011"
ENV AUTH_TRUST_HOST=true

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

# Cần khai báo lại ARG và ENV ở stage runner để ứng dụng nhận được lúc chạy
ARG DATABASE_URL
ARG AUTH_SECRET
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

ENV DATABASE_URL=$DATABASE_URL
ENV AUTH_SECRET=$AUTH_SECRET
ENV AUTH_URL="http://157.20.82.3:21011"
ENV AUTH_TRUST_HOST=true
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

ENV NODE_ENV production
ENV PORT 80

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
# Tự động copy thu mục build của Next.js (Standalone)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Copy module prisma để runtime có thể sử dụng (Tránh lỗi không tìm thấy engine)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs
EXPOSE 80
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
