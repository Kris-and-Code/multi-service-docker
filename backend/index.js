const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'greetings_db',
  password: 'password',
  port: 5432,
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to PostgreSQL database');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend service is running' });
});

// Greetings endpoint
app.get('/api/greetings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM greetings ORDER BY id');
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching greetings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch greetings from database'
    });
  }
});

// Add new greeting endpoint
app.post('/api/greetings', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    const result = await pool.query(
      'INSERT INTO greetings (message) VALUES ($1) RETURNING *',
      [message]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error adding greeting:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add greeting to database'
    });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend server running on port ${port}`);
});
