# ---- Build Stage ----
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

# ---- Production Stage (just copy build) ----
FROM alpine:latest

# Optional: Install a simple HTTP server (if you want to serve directly for testing)
RUN apk add --no-cache nginx

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
