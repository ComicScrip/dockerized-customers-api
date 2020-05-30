require('dotenv').config()

const mysql = require("mysql");
// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || '3306',
  user: process.env.DB_USER || 'wilder',
  password: process.env.DB_PASS || 'W1ldPa$$W0rd',
  database: process.env.DB_NAME || 'database'
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;