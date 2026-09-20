# 🐳 Docker Complete Learning Guide

## Table of Contents

1. [Basic Concepts](https://claude.ai/chat/db849c90-dd48-4d69-b021-bbfb9864c51c#basic-concepts)
2. [Docker Cleanup Commands](https://claude.ai/chat/db849c90-dd48-4d69-b021-bbfb9864c51c#docker-cleanup-commands)
3. [Port Management](https://claude.ai/chat/db849c90-dd48-4d69-b021-bbfb9864c51c#port-management)
4. [Data Persistence with Volumes](https://claude.ai/chat/db849c90-dd48-4d69-b021-bbfb9864c51c#data-persistence-with-volumes)
5. [Container Investigation](https://claude.ai/chat/db849c90-dd48-4d69-b021-bbfb9864c51c#container-investigation)
6. [Docker Build Optimization](https://claude.ai/chat/db849c90-dd48-4d69-b021-bbfb9864c51c#docker-build-optimization)
7. [Docker Networking](https://claude.ai/chat/db849c90-dd48-4d69-b021-bbfb9864c51c#docker-networking)
8. [Environment Variables](https://claude.ai/chat/db849c90-dd48-4d69-b021-bbfb9864c51c#environment-variables)
9. [Multi-Stage Builds](https://claude.ai/chat/db849c90-dd48-4d69-b021-bbfb9864c51c#multi-stage-builds)
10. [Production Deployment](https://claude.ai/chat/db849c90-dd48-4d69-b021-bbfb9864c51c#production-deployment)
11. [Best Practices](https://claude.ai/chat/db849c90-dd48-4d69-b021-bbfb9864c51c#best-practices)
12. [Common Commands Cheatsheet](https://claude.ai/chat/db849c90-dd48-4d69-b021-bbfb9864c51c#common-commands-cheatsheet)

---

## Basic Concepts

### What is Docker?

- **Image** = Blueprint (like a recipe)
- **Container** = Running instance of an image (like a cooked meal)
- **Dockerfile** = Instructions to build an image
- **docker-compose.yml** = Configuration to run multiple containers together
- **Volume** = Persistent storage that survives container deletion
- **Port mapping** = Connect container port to host machine port

### Container Lifecycle

```bash
# Create and start container
docker run image-name

# Stop container
docker stop container-name

# Start stopped container
docker start container-name

# Remove container 
docker rm container-name

# Force remove running container
docker rm -f container-name
```

---

## Docker Cleanup Commands

### Problem: Too many stopped containers and unused images eating disk space

### Solution 1: Nuclear Option (Clean Everything)

```bash
docker system prune -a
```

**What it removes:**

- All stopped containers
- All unused images
- All unused networks
- All build cache

**⚠️ Warning:** Deletes everything not currently running!

### Solution 2: Selective Cleanup

```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune
```

### Check Disk Usage

```bash
docker system df

# Output:
# TYPE         TOTAL   ACTIVE   SIZE
# Images       15      5        2.5GB
# Containers   50      3        100MB
# Volumes      10      2        500MB
```

### Auto-cleanup Containers

```bash
# --rm flag removes container automatically when it stops
docker run --rm nginx
```

---

## Port Management

### Problem: Port conflict - "address already in use"

### Find Which Container Uses a Port

```bash
# See all running containers with ports
docker ps

# Linux/Mac: Find process on port
lsof -i :3000

# Windows: Find process on port
netstat -ano | findstr :3000
```

### Solutions

**Option A: Stop conflicting container**

```bash
docker stop container-id
docker run -p 3000:3000 my-app
```

**Option B: Use different port**

```bash
docker run -p 3001:3000 my-app
# Access at localhost:3001
```

### Port Mapping Syntax

```bash
docker run -p HOST_PORT:CONTAINER_PORT image

# Examples:
-p 3000:3000   # Host 3000 → Container 3000
-p 8080:3000   # Host 8080 → Container 3000
-p 3000:80     # Host 3000 → Container 80 (nginx)
```

**Remember:** `HOST:CONTAINER` (your computer : inside container)

---

## Data Persistence with Volumes

### Problem: Data is lost when container is deleted

### ❌ Without Volume

```bash
docker run --name db postgres
# Add data...
docker rm -f db
# Data is GONE FOREVER! 💀
```

### ✅ With Named Volume (Recommended)

```bash
# Create and use volume
docker run --name db \
  -v my-data:/var/lib/postgresql/data \
  postgres

# Delete container
docker rm -f db

# Data still exists! Start new container with same volume
docker run --name db-new \
  -v my-data:/var/lib/postgresql/data \
  postgres
# All data is back! ✅
```

### Volume Types

**1. Named Volume** (Managed by Docker)

```bash
docker run -v my-data:/var/lib/postgresql/data postgres
```

**2. Bind Mount** (Specific folder on your computer)

```bash
docker run -v /home/user/data:/var/lib/postgresql/data postgres
```

**3. Anonymous Volume**

```bash
docker run -v /var/lib/postgresql/data postgres
```

### Volume Commands

```bash
# List volumes
docker volume ls

# Create volume
docker volume create my-data

# Inspect volume (see location)
docker volume inspect my-data

# Remove volume
docker volume rm my-data

# Remove unused volumes
docker volume prune
```

### Visual Understanding

```
Without Volume:
[Container + Data] → DELETE → 💀 Data Gone

With Volume:
[Container] → [Volume (separate storage)]
	 ↓
  DELETE
	 ↓
[Volume survives!] → New Container → Data restored! ✅
```

---

## Container Investigation

### Scenario: You need to investigate a running container

### 1. See Processes Inside Container

```bash
# List all processes
docker top container-id

# Detailed info
docker inspect container-id
```

### 2. View Logs

```bash
# See all logs
docker logs container-id

# Follow logs in real-time (like tail -f)
docker logs -f container-id

# Last 100 lines
docker logs --tail 100 container-id

# With timestamps
docker logs -t container-id
```

### 3. Execute Commands Inside Container

```bash
# Open interactive shell
docker exec -it container-id bash

# Or use sh if bash doesn't exist
docker exec -it container-id sh

# Run single command
docker exec container-id ls -la

# Run as root user
docker exec -u root -it container-id bash
```

**What `-it` means:**

- `-i` = Interactive (keep stdin open)
- `-t` = TTY (allocate pseudo-terminal)

### 4. Copy Files In/Out

```bash
# Copy FROM container TO your computer
docker cp container-id:/app/config.json ./config.json

# Copy folder
docker cp container-id:/var/log ./logs

# Copy TO container
docker cp ./myfile.txt container-id:/app/
```

### 5. Monitor Resources

```bash
# Real-time stats (CPU, RAM, Network)
docker stats container-id

# All containers
docker stats
```

### 6. Other Useful Commands

```bash
# See port mappings
docker port container-id

# Get container IP address
docker inspect -f '{{.NetworkSettings.IPAddress}}' container-id

# See environment variables
docker exec container-id env
```

---

## Docker Build Optimization

### Problem: Slow builds due to poor layer caching

### ❌ Bad Dockerfile (Slow)

```dockerfile
FROM node:18
WORKDIR /app
COPY . .                # Copies everything (changes often)
RUN npm install         # Runs EVERY time even if package.json unchanged!
CMD ["npm", "start"]
```

### ✅ Optimized Dockerfile (Fast)

```dockerfile
FROM node:18
WORKDIR /app

# Copy dependency files FIRST
COPY package.json package-lock.json ./

# Install dependencies (cached if package.json unchanged!)
RUN npm install

# Copy application code LAST
COPY . .

CMD ["npm", "start"]
```

### Why This Works: Docker Cache Rules

Docker caches layers **top to bottom**. When a layer changes, ALL layers below rebuild!

**Principle:** Put rarely-changing things at the TOP, frequently-changing things at the BOTTOM

### Use .dockerignore

Create `.dockerignore` file:

```
node_modules
.git
*.log
.env
dist
coverage
```

Prevents copying unnecessary files into image!

### Build Commands

```bash
# Normal build
docker build -t my-app .

# Build without cache (force rebuild)
docker build --no-cache -t my-app .

# Build with build arguments
docker build --build-arg NODE_ENV=production -t my-app .
```

---

## Docker Networking

### Problem: Containers can't communicate with each other

### Why Containers Can't Talk by Default

```
[frontend] ❌ → [backend] ❌ → [database]
```

Each container is isolated on its own network!

### Solution: Docker Networks

### Method 1: Custom Network

```bash
# Create network
docker network create my-network

# Run containers on same network
docker run -d --name database --network my-network postgres
docker run -d --name backend --network my-network -p 5000:5000 my-backend
docker run -d --name frontend --network my-network -p 3000:3000 my-frontend
```

Now containers can talk using **container names as hostnames**!

### How to Connect Between Containers

**Inside backend code:**

```javascript
// ❌ DON'T use localhost (that's the container itself)
const db = 'postgresql://localhost:5432'

// ✅ Use container name
const db = 'postgresql://database:5432'
```

**Inside frontend code:**

```javascript
// ❌ DON'T use localhost
fetch('http://localhost:5000/api')

// ✅ Use container name
fetch('http://backend:5000/api')
```

### Important Concepts

**From INSIDE containers:**

- `localhost` = the container itself
- Use **container names** as hostnames
- Example: `http://backend:5000`

**From YOUR computer (host):**

- `localhost:5000` works (via port mapping)
- Example: `http://localhost:5000`

### Method 2: Docker Compose (Easier!)

```yaml
version: '3.8'

services:
  database:
	image: postgres
	networks:
	  - my-network

  backend:
	image: my-backend
	ports:
	  - "5000:5000"
	networks:
	  - my-network
	depends_on:
	  - database

  frontend:
	image: my-frontend
	ports:
	  - "3000:3000"
	networks:
	  - my-network
	depends_on:
	  - backend

networks:
  my-network:
	driver: bridge
```

Run with: `docker-compose up`

All containers automatically connect!

### Network Commands

```bash
# List networks
docker network ls

# Create network
docker network create my-network

# Connect running container to network
docker network connect my-network container-name

# Disconnect from network
docker network disconnect my-network container-name

# Inspect network
docker network inspect my-network

# Remove network
docker network rm my-network
```

---

## Environment Variables

### Problem: How to pass configuration to containers?

### Method 1: Using `-e` Flag

```bash
docker run -e DATABASE_URL=postgresql://... \
		   -e API_KEY=secret123 \
		   -e NODE_ENV=production \
		   my-app
```

**Good for:** Quick tests, few variables

### Method 2: Using `--env-file` (Recommended)

Create `.env` file:

```
DATABASE_URL=postgresql://user:pass@db:5432/mydb
API_KEY=secret-key-12345
NODE_ENV=production
PORT=3000
```

Run with:

```bash
docker run --env-file .env my-app
```

**⚠️ Important:** Add `.env` to `.gitignore`!

### Method 3: In Dockerfile (Default Values)

```dockerfile
FROM node:18
WORKDIR /app

# Set default environment variables
ENV NODE_ENV=production
ENV PORT=3000

COPY . .
CMD ["npm", "start"]
```

**⚠️ Warning:** NEVER put secrets in Dockerfile!

### Method 4: Docker Compose

```yaml
version: '3.8'

services:
  backend:
	image: my-backend
	environment:
	  NODE_ENV: production
	  PORT: 3000
	# OR use env_file
	env_file:
	  - .env
```

### Method 5: Docker Secrets (Production)

```bash
# Create secret
echo "my-password" | docker secret create db_password -

# Use in docker-compose.yml
services:
  database:
	secrets:
	  - db_password
	environment:
	  POSTGRES_PASSWORD_FILE: /run/secrets/db_password

secrets:
  db_password:
	file: ./secrets/db_password.txt
```

### Priority Order (What Overrides What)

1. **Command line `-e`** (highest)
2. **`--env-file`**
3. **docker-compose.yml `environment`**
4. **Dockerfile `ENV`** (lowest)

### Best Practices

✅ **DO:**

```dockerfile
# Dockerfile - non-sensitive defaults only
ENV NODE_ENV=production
ENV PORT=3000
```

```bash
# Runtime - sensitive data via env-file
docker run --env-file .env my-app
```

❌ **DON'T:**

```dockerfile
# ❌ NEVER in Dockerfile!
ENV API_KEY=secret-123
ENV PASSWORD=mypassword
```

---

## Multi-Stage Builds

### Problem: Images are too large (1GB+ for simple apps)

### Why Images Get Large

- Contains source code
- All dependencies (dev + production)
- Build tools
- Intermediate files

### Solution: Multi-Stage Builds

### Example: React App

**❌ Single Stage (1.2GB)**

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

**✅ Multi-Stage (25MB)**

```dockerfile
# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production (ONLY this stage becomes final image!)
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Result:** 1.2GB → 25MB (48x smaller!)

### How Multi-Stage Works

**Stage 1 (Builder):**

```
[node:18 - 1GB] → Install deps → Build app → THROWN AWAY! 🗑️
```

**Stage 2 (Final):**

```
[nginx:alpine - 23MB] → Copy ONLY /build folder → Final: 25MB ✅
```

### Example: Node.js Backend

```dockerfile
# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build  # TypeScript → JavaScript

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production  # Only prod dependencies!
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]
```

### Advanced: Multiple Stages

```dockerfile
# Stage 1: Dependencies
FROM node:18 AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Testing
FROM dependencies AS testing
COPY . .
RUN npm test

# Stage 3: Builder
FROM dependencies AS builder
COPY . .
RUN npm run build

# Stage 4: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]
```

**Build specific stage:**

```bash
# Build and stop at testing
docker build --target testing -t my-app:test .

# Build full production
docker build -t my-app:prod .
```

### Alpine Images (Smaller Base)

```dockerfile
FROM node:18        # ~1GB
FROM node:18-alpine # ~170MB
FROM nginx:alpine   # ~23MB
```

Alpine = Minimal Linux distribution, perfect for containers!

---

## Production Deployment

### Complete Production Setup

### docker-compose.yml (Production-Ready)

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  database:
	image: postgres:15-alpine
	container_name: prod-database
	restart: unless-stopped
	environment:
	  POSTGRES_DB: myapp
	  POSTGRES_USER: appuser
	  POSTGRES_PASSWORD_FILE: /run/secrets/db_password
	secrets:
	  - db_password
	volumes:
	  - postgres_data:/var/lib/postgresql/data
	healthcheck:
	  test: ["CMD-SHELL", "pg_isready -U appuser"]
	  interval: 10s
	  timeout: 5s
	  retries: 5
	networks:
	  - backend-network

  # Redis Cache
  redis:
	image: redis:7-alpine
	container_name: prod-redis
	restart: unless-stopped
	volumes:
	  - redis_data:/data
	healthcheck:
	  test: ["CMD", "redis-cli", "ping"]
	  interval: 10s
	networks:
	  - backend-network

  # Backend API
  backend:
	build:
	  context: ./backend
	  dockerfile: Dockerfile
	  target: production
	container_name: prod-backend
	restart: unless-stopped
	env_file:
	  - .env.backend
	environment:
	  DB_HOST: database
	  DB_PORT: 5432
	  REDIS_HOST: redis
	  NODE_ENV: production
	depends_on:
	  database:
		condition: service_healthy
	  redis:
		condition: service_healthy
	healthcheck:
	  test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
	  interval: 30s
	  timeout: 10s
	  retries: 3
	networks:
	  - backend-network
	  - frontend-network

  # Frontend
  frontend:
	build:
	  context: ./frontend
	  dockerfile: Dockerfile
	container_name: prod-frontend
	restart: unless-stopped
	depends_on:
	  backend:
		condition: service_healthy
	networks:
	  - frontend-network

  # Nginx Reverse Proxy
  nginx:
	image: nginx:alpine
	container_name: prod-nginx
	restart: unless-stopped
	ports:
	  - "80:80"
	  - "443:443"
	volumes:
	  - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
	  - ./nginx/ssl:/etc/nginx/ssl:ro
	depends_on:
	  - frontend
	  - backend
	healthcheck:
	  test: ["CMD", "wget", "--spider", "http://localhost/health"]
	  interval: 30s
	networks:
	  - frontend-network

volumes:
  postgres_data:
  redis_data:

networks:
  backend-network:
	driver: bridge
  frontend-network:
	driver: bridge

secrets:
  db_password:
	file: ./secrets/db_password.txt
```

### Key Production Features

**1. Health Checks**

```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready"]
  interval: 10s
  timeout: 5s
  retries: 5
```

Ensures container is actually ready, not just started!

**2. Restart Policies**

```yaml
restart: unless-stopped
```

Auto-restart on crash!

Options:

- `no` - Never restart
- `always` - Always restart
- `on-failure` - Only on error
- `unless-stopped` - Restart unless manually stopped

**3. Depends On with Conditions**

```yaml
depends_on:
  database:
	condition: service_healthy
```

Wait for database to be READY, not just started!

**4. Separate Networks**

```yaml
networks:
  backend-network:    # DB + Backend + Redis
  frontend-network:   # Frontend + Backend + Nginx
```

Database isolated from frontend!

**5. Named Volumes**

```yaml
volumes:
  postgres_data:
  redis_data:
```

Data persists across restarts!

**6. Docker Secrets**

```yaml
secrets:
  db_password:
	file: ./secrets/db_password.txt
```

Secure password management!

### Nginx Configuration (nginx.conf)

```nginx
events {
	worker_connections 1024;
}

http {
	upstream backend {
		server backend:5000;
	}

	server {
		listen 80;
		server_name example.com;

		# Frontend
		location / {
			proxy_pass http://frontend:80;
			proxy_set_header Host $host;
			proxy_set_header X-Real-IP $remote_addr;
		}

		# Backend API
		location /api/ {
			proxy_pass http://backend:5000/;
			proxy_set_header Host $host;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		}

		# Health check
		location /health {
			access_log off;
			return 200 "OK";
		}
	}
}
```

### Project Structure

```
project/
├── docker-compose.yml
├── .env.backend
├── .gitignore
├── secrets/
│   └── db_password.txt
├── nginx/
│   ├── nginx.conf
│   └── ssl/
├── frontend/
│   ├── Dockerfile
│   └── src/
└── backend/
	├── Dockerfile
	└── src/
```

### Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend

# Stop all services
docker-compose down

# Rebuild after changes
docker-compose up -d --build

# Scale services
docker-compose up -d --scale backend=3
```

---

## Best Practices

### Security

1. ✅ Never put secrets in Dockerfile
2. ✅ Use Docker secrets or env files
3. ✅ Don't run containers as root
4. ✅ Use specific image versions, not `latest`
5. ✅ Scan images for vulnerabilities
6. ✅ Use `.dockerignore` to exclude sensitive files

### Performance

1. ✅ Use multi-stage builds
2. ✅ Optimize layer caching
3. ✅ Use Alpine images when possible
4. ✅ Minimize layers (combine RUN commands)
5. ✅ Clean up in the same layer

### Example: Optimized Dockerfile

```dockerfile
FROM node:18-alpine AS builder

# Install dependencies in separate layer
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && \
	npm cache clean --force

# Build app
COPY . .
RUN npm run build

# Final stage
FROM node:18-alpine
WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Don't run as root!
USER node

CMD ["node", "dist/index.js"]
```

### Maintenance

1. ✅ Regular cleanup: `docker system prune`
2. ✅ Monitor disk usage: `docker system df`
3. ✅ Use health checks
4. ✅ Implement logging
5. ✅ Backup volumes regularly

### Development vs Production

**Development:**

```yaml
services:
  backend:
	build: ./backend
	volumes:
	  - ./backend:/app  # Live code reload
	environment:
	  NODE_ENV: development
```

**Production:**

```yaml
services:
  backend:
	image: my-backend:1.0.0
	restart: unless-stopped
	env_file: .env.prod
	environment:
	  NODE_ENV: production
```

---

## Common Commands Cheatsheet

### Container Management

```bash
# Run container
docker run image-name
docker run -d image-name              # Detached mode
docker run -it image-name bash        # Interactive with bash
docker run --rm image-name            # Auto-remove when stopped
docker run --name my-container image  # Named container

# List containers
docker ps                    # Running only
docker ps -a                 # All (including stopped)

# Stop/Start/Restart
docker stop container-id
docker start container-id
docker restart container-id

# Remove container
docker rm container-id
docker rm -f container-id    # Force remove (even if running)

# View logs
docker logs container-id
docker logs -f container-id  # Follow logs

# Execute command
docker exec container-id command
docker exec -it container-id bash

# Copy files
docker cp container-id:/path/file ./local-path
docker cp ./local-file container-id:/path/

# Stats
docker stats container-id
```

### Image Management

```bash
# Build image
docker build -t image-name .
docker build -t image-name:tag .

# List images
docker images
docker images -a

# Pull/Push
docker pull image-name
docker push image-name

# Remove image
docker rmi image-name
docker rmi -f image-name

# Tag image
docker tag source-image:tag target-image:tag

# Save/Load (backup)
docker save -o myimage.tar image-name
docker load -i myimage.tar
```

### Volume Management

```bash
# Create volume
docker volume create volume-name

# List volumes
docker volume ls

# Inspect volume
docker volume inspect volume-name

# Remove volume
docker volume rm volume-name
docker volume prune  # Remove unused
```

### Network Management

```bash
# Create network
docker network create network-name

# List networks
docker network ls

# Inspect network
docker network inspect network-name

# Connect container to network
docker network connect network-name container-name

# Disconnect
docker network disconnect network-name container-name

# Remove network
docker network rm network-name
```

### System Management

```bash
# System info
docker info
docker version

# Disk usage
docker system df
docker system df -v

# Clean up
docker system prune        # Remove unused data
docker system prune -a     # Remove all unused images
docker system prune --volumes  # Include volumes

# Events
docker events
```

### Docker Compose

```bash
# Start services
docker-compose up
docker-compose up -d           # Detached mode
docker-compose up --build      # Rebuild images

# Stop services
docker-compose down
docker-compose down -v         # Remove volumes too

# View logs
docker-compose logs
docker-compose logs -f service-name

# List services
docker-compose ps

# Execute command in service
docker-compose exec service-name command

# Restart services
docker-compose restart

# Scale services
docker-compose up -d --scale service-name=3
```

### Inspection & Debugging

```bash
# Inspect container/image
docker inspect container-id

# View processes
docker top container-id

# View port mappings
docker port container-id

# View changes in container
docker diff container-id

# Export container filesystem
docker export container-id > container.tar
```

---

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs container-id

# Try running interactively
docker run -it image-name bash

# Check if port is in use
docker ps
lsof -i :port-number
```

### Can't Connect to Container

```bash
# Check networks
docker network inspect network-name

# Check if container is running
docker ps

# Get container IP
docker inspect -f '{{.NetworkSettings.IPAddress}}' container-id
```

### Out of Disk Space

```bash
# Check usage
docker system df

# Clean up
docker system prune -a --volumes

# Remove specific images
docker images
docker rmi image-id
```

### Permission Denied

```bash
# Run as root
docker exec -u root -it container-id bash

# Check file ownership
docker exec container-id ls -la /path
```

---

## Additional Resources

### Official Documentation

- Docker Docs: https://docs.docker.com
- Docker Hub: https://hub.docker.com
- Best Practices: https://docs.docker.com/develop/dev-best-practices/

### Useful Tools

- Docker Desktop (GUI)
- Portainer (Container management UI)
- Dive (Image layer explorer)
- Hadolint (Dockerfile linter)

---

## Summary

**What We Learned:**

1. ✅ Docker basics and concepts
2. ✅ Cleanup and maintenance
3. ✅ Port management
4. ✅ Data persistence with volumes
5. ✅ Container investigation and debugging
6. ✅ Build optimization and caching
7. ✅ Networking between containers
8. ✅ Environment variable management
9. ✅ Multi-stage builds for smaller images
10. ✅ Production-ready deployments

**Key Takeaways:**

- Always use volumes for persistent data
- Optimize Dockerfiles for caching
- Use multi-stage builds for production
- Network containers properly
- Never commit secrets
- Use health checks in production
- Regular cleanup to save disk space

---

_Created: 2025_ _Last Updated: 2025_