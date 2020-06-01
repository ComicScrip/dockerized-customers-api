require('dotenv').config();
const mysql = require('mysql');

class Database {
  init () {
    this.connection = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || '3307',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'customer_api_database',
      connectionLimit: 10
    });

    return this;
  }

  query (...args) {
    return new Promise((resolve, reject) => {
      this.connection.query(...args, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}

module.exports = (new Database()).init();
