const express = require('express');
const { Pool } = require('pg');
const app = express();

// PostgreSQL connection pool
const pool = new Pool({
  host: 'db',           // matches docker-compose service name
  user: 'devuser',
  password: 'devpass',
  database: 'devdb',
  port: 5432
});

// Root route
app.get('/', (req, res) => {
  res.send('Backend root working!');
});

// Get greetings from DB
app.get('/api/greetings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM greetings');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.listen(5000, () => {
  console.log('Backend running on port 5000');
});
