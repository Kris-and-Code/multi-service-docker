-- Connect to the database (it's already created by environment variables)
\c greetings_db;

-- Create greetings table
CREATE TABLE IF NOT EXISTS greetings (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample greetings
INSERT INTO greetings (message) VALUES 
    ('Hello, World!'),
    ('Welcome to our Multi-Service Docker App!'),
    ('Greetings from PostgreSQL!');

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE greetings_db TO postgres;
GRANT ALL PRIVILEGES ON TABLE greetings TO postgres;
GRANT USAGE, SELECT ON SEQUENCE greetings_id_seq TO postgres;
