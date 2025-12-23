# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Install ajv@8 explicitly to fix peer dependency conflicts with ajv-keywords
# ajv-keywords@5.1.0 requires ajv@^8.8.2, but some packages install ajv@6
RUN npm install ajv@^8.17.0 --legacy-peer-deps --save-dev

# Copy source code
COPY frontend/ ./

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
