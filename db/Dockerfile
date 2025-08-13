FROM postgres:15-alpine

# Set environment variables
ENV POSTGRES_DB=greetings_db
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=password

# Copy initialization script
COPY init.sql /docker-entrypoint-initdb.d/

# Expose port
EXPOSE 5432
