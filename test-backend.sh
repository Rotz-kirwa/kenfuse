#!/bin/bash

# KENFUSE Quick Start Script
# This script helps you quickly test the backend connection

echo "🚀 KENFUSE Backend Connection Test"
echo "===================================="
echo ""

# Check if backend is running
echo "📡 Checking backend connection..."
BACKEND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/health 2>/dev/null)

if [ "$BACKEND_RESPONSE" = "200" ]; then
    echo "✅ Backend is running on http://localhost:5000"
else
    echo "❌ Backend is NOT running"
    echo ""
    echo "To start the backend:"
    echo "  cd backend"
    echo "  npm run dev"
    echo ""
    exit 1
fi

echo ""
echo "🧪 Testing API Endpoints..."
echo ""

# Test registration
echo "1️⃣  Testing Registration Endpoint..."
REGISTER_TEST=$(curl -s -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test'$(date +%s)'@example.com",
    "password": "password123",
    "phone": "0712345678"
  }')

if echo "$REGISTER_TEST" | grep -q "success"; then
    echo "   ✅ Registration endpoint working"
    
    # Extract token for further tests
    TOKEN=$(echo "$REGISTER_TEST" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    
    if [ ! -z "$TOKEN" ]; then
        echo "   ✅ JWT token received"
        
        # Test authenticated endpoint
        echo ""
        echo "2️⃣  Testing Authenticated Endpoint..."
        ME_TEST=$(curl -s -X GET http://localhost:5000/api/v1/auth/me \
          -H "Authorization: Bearer $TOKEN")
        
        if echo "$ME_TEST" | grep -q "success"; then
            echo "   ✅ Authentication working"
        else
            echo "   ❌ Authentication failed"
        fi
    fi
else
    echo "   ❌ Registration endpoint failed"
    echo "   Response: $REGISTER_TEST"
fi

echo ""
echo "3️⃣  Testing Memorials Endpoint..."
MEMORIALS_TEST=$(curl -s -X GET http://localhost:5000/api/v1/memorials \
  -H "Authorization: Bearer $TOKEN")

if echo "$MEMORIALS_TEST" | grep -q "success"; then
    echo "   ✅ Memorials endpoint working"
else
    echo "   ⚠️  Memorials endpoint returned: $MEMORIALS_TEST"
fi

echo ""
echo "===================================="
echo "✨ Backend Connection Test Complete!"
echo ""
echo "Next steps:"
echo "1. Start frontend: cd frontend && npm run dev"
echo "2. Open browser: http://localhost:5173"
echo "3. Try registering a new account"
echo "4. Check the INTEGRATION_GUIDE.md for more details"
echo ""
