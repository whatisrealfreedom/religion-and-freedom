# Frontend builder container - for running npm commands
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Install ajv@8 explicitly to fix peer dependency conflicts
RUN npm install ajv@^8.17.0 --legacy-peer-deps --save-dev

# Copy source code (will be mounted as volume in docker-compose)
COPY frontend/ ./

# Default command - can be overridden to run npm run build
CMD ["tail", "-f", "/dev/null"]

