#!/bin/bash
# Verification script for deployment
# Run this on the server to verify everything is working

set -e

echo "🔍 Verifying Freedom Website Deployment"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

DOMAIN="whatisreadfreedom.com"
SERVER_IP="138.199.149.138"

# 1. Check DNS Resolution
echo "1️⃣  Checking DNS resolution..."
DNS_IP=$(dig +short $DOMAIN A | head -1)
if [ "$DNS_IP" = "$SERVER_IP" ]; then
    echo -e "${GREEN}✅ DNS correctly points to $SERVER_IP${NC}"
else
    echo -e "${YELLOW}⚠️  DNS points to: $DNS_IP (expected: $SERVER_IP)${NC}"
    echo "   Note: DNS changes can take up to 48 hours to propagate globally"
fi
echo ""

# 2. Check if containers are running
echo "2️⃣  Checking Docker containers..."
if docker ps | grep -q freedom-backend && docker ps | grep -q freedom-frontend; then
    echo -e "${GREEN}✅ Both containers are running${NC}"
    docker ps | grep freedom
else
    echo -e "${RED}❌ Containers are not running${NC}"
    docker ps -a | grep freedom
fi
echo ""

# 3. Check Traefik labels
echo "3️⃣  Checking Traefik configuration..."
if docker inspect freedom-frontend 2>/dev/null | grep -q "traefik.enable=true"; then
    echo -e "${GREEN}✅ Traefik is enabled for frontend${NC}"
    echo "   Router rule:"
    docker inspect freedom-frontend | grep -A 5 "traefik.http.routers.freedom-frontend.rule" | head -2
else
    echo -e "${RED}❌ Traefik not enabled for frontend${NC}"
fi
echo ""

# 4. Check container health
echo "4️⃣  Checking container health..."
cd /home/deploy/freedom-website 2>/dev/null || cd ~/freedom-website
if [ -f docker-compose.prod.yml ]; then
    docker-compose -f docker-compose.prod.yml ps
else
    echo "⚠️  docker-compose.prod.yml not found in current directory"
fi
echo ""

# 5. Test backend health (from inside container network)
echo "5️⃣  Testing backend health..."
if docker exec freedom-frontend wget -qO- http://backend:8080/api/v1/health 2>/dev/null; then
    echo -e "${GREEN}✅ Backend is healthy${NC}"
else
    echo -e "${YELLOW}⚠️  Cannot reach backend from frontend container${NC}"
fi
echo ""

# 6. Check Traefik routes (if Traefik dashboard is accessible)
echo "6️⃣  Checking Traefik HTTP routers..."
if curl -s http://localhost:8080/api/http/routers 2>/dev/null | grep -q "freedom-frontend"; then
    echo -e "${GREEN}✅ Freedom router found in Traefik${NC}"
    echo "   Router details:"
    curl -s http://localhost:8080/api/http/routers | jq '.[] | select(.name | contains("freedom")) | {name, rule, service}' 2>/dev/null || echo "   (Install jq for detailed output)"
else
    echo -e "${YELLOW}⚠️  Freedom router not found in Traefik API${NC}"
    echo "   (This might be normal if Traefik dashboard is on different port)"
fi
echo ""

# 7. Test domain access
echo "7️⃣  Testing domain access..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
    echo -e "${GREEN}✅ Domain is accessible (HTTP $HTTP_CODE)${NC}"
elif [ "$HTTP_CODE" = "000" ]; then
    echo -e "${YELLOW}⚠️  Cannot connect to domain (might be DNS propagation or SSL certificate issue)${NC}"
else
    echo -e "${YELLOW}⚠️  Domain returned HTTP $HTTP_CODE${NC}"
fi
echo ""

# 8. Check SSL certificate
echo "8️⃣  Checking SSL certificate..."
if echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null | grep -q "Verify return code: 0"; then
    echo -e "${GREEN}✅ SSL certificate is valid${NC}"
else
    echo -e "${YELLOW}⚠️  SSL certificate check failed (might still be provisioning)${NC}"
fi
echo ""

# 9. Check logs for errors
echo "9️⃣  Checking recent logs for errors..."
echo "Backend logs (last 5 lines):"
docker logs --tail=5 freedom-backend 2>&1 | tail -5 || echo "No backend logs"
echo ""
echo "Frontend logs (last 5 lines):"
docker logs --tail=5 freedom-frontend 2>&1 | tail -5 || echo "No frontend logs"
echo ""

# Summary
echo "📊 Summary"
echo "=========="
echo "Domain: $DOMAIN"
echo "Expected IP: $SERVER_IP"
echo "DNS IP: $DNS_IP"
echo ""
echo "Next steps if issues:"
echo "  1. If DNS doesn't match: Wait for DNS propagation (can take up to 48h)"
echo "  2. If containers not running: Check docker-compose.prod.yml and .env file"
echo "  3. If Traefik not showing route: Check container labels and network"
echo "  4. If SSL not working: Check Traefik logs and Let's Encrypt status"
echo ""
echo "✅ Verification complete!"

