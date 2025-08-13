#!/bin/bash

echo "🧪 Testing Multi-Service Docker App..."
echo "======================================"

# Test 1: Check if all containers are running
echo "1. Checking container status..."
docker compose ps

echo -e "\n2. Testing Nginx reverse proxy..."
if curl -s http://localhost:8080/ > /dev/null; then
    echo "✅ Frontend accessible via Nginx"
else
    echo "❌ Frontend not accessible"
fi

echo -e "\n3. Testing Backend API..."
if curl -s http://localhost:8080/api/greetings > /dev/null; then
    echo "✅ Backend API accessible via Nginx"
    echo "📊 Sample response:"
    curl -s http://localhost:8080/api/greetings | jq '.' 2>/dev/null || curl -s http://localhost:8080/api/greetings
else
    echo "❌ Backend API not accessible"
fi

echo -e "\n4. Testing direct backend access..."
if curl -s http://localhost:5000/health > /dev/null; then
    echo "✅ Backend directly accessible"
else
    echo "❌ Backend not directly accessible"
fi

echo -e "\n5. Testing database connection..."
if docker compose exec db pg_isready -U postgres > /dev/null 2>&1; then
    echo "✅ Database is ready and accepting connections"
else
    echo "❌ Database not ready"
fi

echo -e "\n🎉 Test completed!"
echo "🌐 Access your app at: http://localhost:8080"
echo "📱 Frontend: React app with greetings from database"
echo "🔧 Backend: Node.js API at /api/greetings"
echo "🗄️  Database: PostgreSQL with persistent storage"
