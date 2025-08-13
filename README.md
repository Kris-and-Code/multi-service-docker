# Multi-Service Docker Compose Setup

A complete containerized server infrastructure demonstrating a production-ready microservices architecture with React frontend, Node.js backend, PostgreSQL database, and Nginx reverse proxy.

## 🏗️ Architecture Overview

This project showcases a modern microservices setup where:

- **React Frontend** - Modern web application served via Nginx
- **Node.js Backend** - Express API server with PostgreSQL integration  
- **PostgreSQL Database** - Persistent data storage with initialization scripts
- **Nginx Reverse Proxy** - Single entry point routing traffic to appropriate services

All services run in isolated Docker containers and communicate through Docker's internal networking.

## 📁 Project Structure

```
multi-service-docker/
├── docker-compose.yml          # Main orchestration file
├── README.md                   # This documentation
├── test-app.sh                 # Test script to verify setup
├── frontend/                   # React application
│   ├── Dockerfile             # Frontend container build
│   ├── package.json           # Node.js dependencies
│   └── src/                   # React source code
│       ├── App.js             # Main React component
│       └── App.css            # Styling
├── backend/                    # Node.js API service
│   ├── Dockerfile             # Backend container build
│   ├── package.json           # Backend dependencies
│   └── index.js               # Express server
├── db/                        # Database setup
│   ├── Dockerfile             # PostgreSQL container build
│   └── init.sql               # Database initialization script
└── nginx/                     # Reverse proxy configuration
    ├── Dockerfile             # Nginx container build
    └── nginx.conf             # Nginx routing configuration
```

## 🚀 Quick Start

### Prerequisites

- Docker Engine 20.10+
- Docker Compose v2.0+

### 1. Clone and Navigate

```bash
cd multi-service-docker
```

### 2. Build and Run

```bash
# Build all services and start the stack
docker compose up --build

# Or run in detached mode
docker compose up --build -d
```

### 3. Access the Application

- **Main App**: http://localhost:8080
- **API Endpoint**: http://localhost:8080/api/greetings

## 🔧 Service Details

### Frontend (React + Nginx)
- **Port**: 80 (internal)
- **Features**: 
  - Displays greetings from database
  - Add new greetings via form
  - Responsive design with modern UI
  - Gradient backgrounds and smooth animations

### Backend (Node.js + Express)
- **Port**: 5000 (internal)
- **Endpoints**:
  - `GET /api/greetings` - Fetch all greetings
  - `POST /api/greetings` - Add new greeting
  - `GET /health` - Health check
- **Database**: Connects to PostgreSQL using service name `db`

### Database (PostgreSQL)
- **Port**: 5432 (internal)
- **Database**: `greetings_db`
- **User**: `postgres`
- **Password**: `password`
- **Initial Data**: 3 sample greetings loaded via `init.sql`

### Nginx Reverse Proxy
- **Port**: 80 (internal), 8080 (external)
- **Routing**:
  - `/` → Frontend React app
  - `/api/*` → Backend API service

## 🌐 Network Configuration

All services run in the same Docker network (`app-network`) allowing them to communicate using service names:

- Frontend can reach backend via `http://backend:5000`
- Backend can reach database via `db:5432`
- Nginx routes traffic based on URL patterns

## 💾 Data Persistence

PostgreSQL data is stored in a named Docker volume (`db_data`) ensuring data persists between container restarts.

## 🛠️ Development & Management

### View Service Status

```bash
# All services
docker compose ps

# Specific service logs
docker compose logs backend
docker compose logs frontend
docker compose logs db
docker compose logs nginx
```

### Stop Services

```bash
# Stop and remove containers
docker compose down

# Stop and remove containers + volumes (fresh start)
docker compose down -v
```

### Rebuild Specific Service

```bash
docker compose build frontend
docker compose up frontend
```

### Test the Setup

```bash
# Run the test script
./test-app.sh

# Or test manually
curl http://localhost:8080/api/greetings
```

## 🔍 Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Check if ports 8080, 3000, 5000, or 5432 are available
   - Modify `docker-compose.yml` to use different ports

2. **Database Connection Issues**
   - Ensure database service is fully started before backend
   - Check database logs: `docker compose logs db`
   - Database initialization takes ~10-15 seconds

3. **Frontend Not Loading**
   - Verify nginx service is running: `docker compose ps`
   - Check nginx logs: `docker compose logs nginx`

4. **Backend API Errors**
   - Check backend logs: `docker compose logs backend`
   - Verify database is ready: `docker compose exec db pg_isready -U postgres`

### Health Checks

- **Frontend**: http://localhost:8080
- **Backend**: http://localhost:8080/api/health
- **Database**: Check logs for connection success

## 📝 API Documentation

### GET /api/greetings
Returns all greetings from the database.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "message": "Hello, World!",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

### POST /api/greetings
Adds a new greeting to the database.

**Request Body:**
```json
{
  "message": "Your greeting message"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "message": "Your greeting message",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🎯 Features

- **Modern React Frontend**: Built with create-react-app, responsive design
- **RESTful API**: Express.js backend with proper error handling
- **Database Integration**: PostgreSQL with automatic initialization
- **Reverse Proxy**: Nginx routing with proper headers
- **Container Orchestration**: Docker Compose for easy management
- **Persistent Storage**: Database data survives container restarts
- **Health Monitoring**: Built-in health check endpoints
- **Clean Architecture**: Separation of concerns between services

## 🚀 Production Considerations

This setup provides a solid foundation for:

- Adding more microservices
- Implementing authentication & authorization
- Adding monitoring and logging (Prometheus, Grafana)
- Implementing CI/CD pipelines
- Scaling services independently
- Adding load balancing
- Implementing SSL/TLS termination

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Issues?

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the logs: `docker compose logs`
3. Ensure all prerequisites are met
4. Try a fresh start: `docker compose down -v && docker compose up --build`

---

**Happy Containerizing! 🐳**
