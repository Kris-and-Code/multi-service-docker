multi-service-docker/
│
├── docker-compose.yml        # Defines frontend, backend, and db services
│
├── frontend/                 # React app (created by create-react-app)
│   ├── package.json
│   ├── public/
│   ├── src/
│   ├── Dockerfile             # Builds React → Nginx image
│   └── ...
│
├── backend/                  # Node.js + Express API
│   ├── index.js               # API routes
│   ├── package.json
│   ├── Dockerfile
│   └── ...
│
└── db/                       # PostgreSQL container build context
    ├── Dockerfile
    └── init.sql               # SQL script to initialize DB tables and data
