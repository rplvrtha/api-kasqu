const mysql = require('mysql');
require('dotenv').config();

// Create the connection using environment variables
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Handle connection errors gracefully
conn.connect((err) => {
  if (err) {
    console.error('Connection failed:', err);
  }
});

module.exports = conn;
