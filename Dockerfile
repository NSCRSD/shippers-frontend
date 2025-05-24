# ---- Build Stage ----
FROM node:18.20-alpine3.19 AS builder

WORKDIR /app

# Use --prefer-offline and disable audits for speed
COPY package.json package-lock.json ./
RUN npm install --prefer-offline --no-audit --no-fund

COPY . ./
RUN npm run build

# ---- Production Stage ----
FROM nginx:1.25-alpine

# Remove default config if not used
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# ---- Production Stage (just copy build) ----
#FROM alpine:latest

# Optional: Install a simple HTTP server (if you want to serve directly for testing)
#RUN apk add --no-cache nginx
