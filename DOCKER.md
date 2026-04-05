# 🐳 Docker Setup Guide - Food Rescue

This guide will help you build and run the Food Rescue application using Docker. Docker ensures that the application runs consistently across all environments.

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Docker Desktop** (Windows/Mac) or **Docker Engine** (Linux)
  - Download: https://www.docker.com/products/docker-desktop
  - Verify installation: `docker --version`
- **Docker Compose** (usually included with Docker Desktop)
  - Verify installation: `docker-compose --version`

## 🚀 Quick Start (For Team Members)

### 1. Clone the Repository

```bash
git clone https://github.com/developerchidi/Food-Rescue.git
cd Food-Rescue
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory by copying from `.env.example`:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Linux/Mac
cp .env.example .env
```

Then edit the `.env` file with your actual credentials:

```bash
# Required: Update these values
DATABASE_URL="postgresql://postgres.xxx:password@aws-0-region.pooler.supabase.com:5432/postgres"
AUTH_SECRET="your-super-secret-key-min-32-characters"
NEXTAUTH_URL="http://localhost:3000"

# Upstash Redis
UPSTASH_REDIS_REST_URL="https://your-redis-instance.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-upstash-redis-token"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

> **Note**: Contact your team lead to get the actual credentials for development/staging environments.

### 3. Build and Run with Docker

#### Option A: Using Docker Compose (Recommended)

```bash
# Build and start the application
docker-compose up --build

# Or run in detached mode (background)
docker-compose up -d --build
```

The application will be available at: **http://localhost:3000**

#### Option B: Using Docker CLI

```bash
# Build the Docker image
docker build -t food-rescue:latest .

# Run the container
docker run -p 3000:3000 --env-file .env food-rescue:latest
```

### 4. Run Database Migrations

After the container is running, you need to apply database migrations:

```bash
# If using docker-compose
docker-compose exec app npx prisma migrate deploy

# If using docker run
docker exec -it <container-id> npx prisma migrate deploy
```

To find your container ID:
```bash
docker ps
```

### 5. (Optional) Seed the Database

To populate the database with sample data:

```bash
# If using docker-compose
docker-compose exec app npx prisma db seed

# If using docker run
docker exec -it <container-id> npx prisma db seed
```

The Prisma seed script creates demo users with email `*@example.com` (including `admin@example.com`); the shared password is **`password123`**. Manual QA accounts in `qa/manual/test-data.md` use `*.foodrescue.test` with **`Test@1234`** and are not created by this seed.

## 🛠️ Development Workflow

### Viewing Logs

```bash
# View logs (docker-compose)
docker-compose logs -f

# View logs (docker run)
docker logs -f <container-id>
```

### Stopping the Application

```bash
# Stop docker-compose
docker-compose down

# Stop docker container
docker stop <container-id>
```

### Rebuilding After Code Changes

```bash
# Rebuild and restart
docker-compose up --build

# Or force rebuild
docker-compose build --no-cache
docker-compose up
```

### Accessing the Container Shell

```bash
# Using docker-compose
docker-compose exec app sh

# Using docker run
docker exec -it <container-id> sh
```

## 🏗️ Docker Architecture

### Multi-Stage Build

Our Dockerfile uses a multi-stage build for optimization:

1. **Stage 1 (deps)**: Installs dependencies
2. **Stage 2 (builder)**: Generates Prisma Client and builds Next.js
3. **Stage 3 (runner)**: Creates minimal production image

This approach reduces the final image size significantly.

### What's Included

- ✅ Next.js 15 with App Router
- ✅ Prisma ORM with PostgreSQL
- ✅ NextAuth.js for authentication
- ✅ Cloudinary for image storage
- ✅ Upstash Redis for caching
- ✅ Production-optimized build

## 🔧 Troubleshooting

### Issue: "Port 3000 is already in use"

**Solution**: Stop any local development server or change the port:

```bash
# Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use port 3001 instead
```

### Issue: "Database connection failed"

**Solution**: 
1. Verify your `DATABASE_URL` in `.env` is correct
2. Ensure your database is accessible from Docker
3. Check if you need to whitelist Docker's IP in your database firewall

### Issue: "Prisma Client not generated"

**Solution**: Rebuild the Docker image:

```bash
docker-compose build --no-cache
docker-compose up
```

### Issue: "Out of memory" during build

**Solution**: Increase Docker's memory allocation:
- Docker Desktop → Settings → Resources → Memory (increase to at least 4GB)

### Issue: Changes not reflecting

**Solution**: 
1. Make sure you rebuild after code changes: `docker-compose up --build`
2. Clear Next.js cache: `docker-compose exec app rm -rf .next`

## 📦 Production Deployment

### Building for Production

```bash
# Build production image
docker build -t food-rescue:production .

# Tag for registry
docker tag food-rescue:production your-registry/food-rescue:latest

# Push to registry
docker push your-registry/food-rescue:latest
```

### Environment Variables for Production

Make sure to update these in your production environment:

```bash
NODE_ENV=production
NEXTAUTH_URL=https://yourdomain.com
DATABASE_URL=<production-database-url>
AUTH_SECRET=<strong-random-secret>
```

## Production deploy runbook (monorepo)

Use this checklist when shipping a new version to staging or production. Jira: **N11CT2-70**.

### 1. Clone and submodules

```bash
git clone https://github.com/developerchidi/Food-Rescue.git
cd Food-Rescue
git submodule update --init --recursive
```

Confirm the backend folder matches `docker-compose.yml` (`./backend` build context). On case-sensitive hosts, the directory name must match that path.

### 2. Environment files

| Location | Purpose |
| -------- | ------- |
| Repository root `.env` | Backend: `DATABASE_URL`, `JWT_SECRET`, mail/Redis if used by API |
| `Frontend/.env` | Next.js / Auth: `AUTH_SECRET`, `NEXTAUTH_URL`, Cloudinary, `NEXT_PUBLIC_*` |

Never commit real secrets; load the same keys in your host or CI/CD secret store.

### 3. Database migrations (order matters)

Apply Prisma migrations **before** switching live traffic to new API containers.

```bash
docker compose build backend
docker compose run --rm backend npx prisma migrate deploy
```

If you use a one-off container instead of Compose, run `npx prisma migrate deploy` inside the backend image with `DATABASE_URL` set.

### 4. Build and start stack

```bash
docker compose up -d --build
```

### 5. Smoke checks

- Frontend: open `http://localhost:3000` (or your public URL).
- Backend health (when exposed on host port `3001`): `curl -sf http://localhost:3001/health` should return JSON with `status: "ok"`.
- Create/login flow against staging before promoting to production.

### 6. Rollback

Keep previous image tags in your registry. To roll back, redeploy the last known-good tags for `frontend` and `backend` and re-run `prisma migrate deploy` only if the new release had migrations (avoid downgrading schema without a planned migration).

### 7. CI reference

Pull requests against `main` / `develop` run the GitHub Actions workflow in `.github/workflows/ci.yml` (Frontend lint, typecheck, build). Fix CI on the branch before merging.

## 🔐 Security Best Practices

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use strong secrets** - Generate `AUTH_SECRET` with: `openssl rand -base64 32`
3. **Rotate credentials** - Change secrets regularly
4. **Limit database access** - Use read-only users where possible
5. **Keep Docker updated** - Regularly update Docker Desktop/Engine

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)
- [Prisma with Docker](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-docker)

## 💬 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the logs: `docker-compose logs -f`
3. Contact the team lead or create an issue on GitHub

---

**Happy Coding! 🚀**
