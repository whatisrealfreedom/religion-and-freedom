# Simple nginx container that serves static files
FROM nginx:alpine

# Copy nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Note: Static files will be mounted as volume in docker-compose
# The /usr/share/nginx/html directory will be mounted from a volume

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

