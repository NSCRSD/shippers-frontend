# ---- Build Stage ----
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

# ---- Production Stage ----
FROM node:18-alpine

WORKDIR /app

# Install the lightweight static server
RUN npm install -g serve

# Copy built React app from builder
COPY --from=builder /app/build ./build

EXPOSE 3000

# Serve the build folder
CMD ["serve", "-s", "build", "-l", "3000"]
