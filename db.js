require('dotenv').config()
const mysql = require("mysql");

class Database {
  constructor(connection) {
    this.connection = connection;
  }

  query(...args) {
    return new Promise((resolve, reject) => {
      this.connection.query(...args, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      })
    });
  }
}

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3307',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'customer_api_database'
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = new Database(connection);