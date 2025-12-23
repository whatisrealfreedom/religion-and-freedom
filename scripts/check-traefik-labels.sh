#!/bin/bash
# Detailed Traefik labels checker

echo "🔍 Checking Traefik Labels on freedom-frontend"
echo "================================================"
echo ""

# Method 1: Using jq (best)
if command -v jq &> /dev/null; then
    echo "Using jq to parse labels:"
    docker inspect freedom-frontend 2>/dev/null | jq -r '.[0].Config.Labels | to_entries | .[] | select(.key | startswith("traefik")) | "\(.key) = \(.value)"' | sort
else
    echo "jq not available, using grep:"
    docker inspect freedom-frontend 2>/dev/null | grep -A 50 '"Labels"' | grep -i traefik | head -20
fi

echo ""
echo "📋 Expected labels:"
echo "  traefik.enable = true"
echo "  traefik.http.routers.freedom-frontend.rule = Host(\`whatisreadfreedom.com\`)"
echo "  traefik.http.routers.freedom-frontend.entrypoints = websecure"
echo "  traefik.http.routers.freedom-frontend.tls = true"
echo "  traefik.http.routers.freedom-frontend.tls.certresolver = letsencrypt"
echo "  traefik.http.services.freedom-frontend.loadbalancer.server.port = 80"
echo ""

