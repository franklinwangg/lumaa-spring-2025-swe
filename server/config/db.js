const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables

// Create a new PostgreSQL connection pool

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: false,  // Make sure to use this for cloud providers that require SSL
    },
  });

// Test database connection
const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log('Database connected successfully.');
        client.release();
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

module.exports = { pool, connectDB };