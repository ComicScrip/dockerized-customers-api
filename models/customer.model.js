const db = require('../db.js');

class Customer {
  constructor (customer) {
    this.email = customer.email;
    this.last_name = customer.last_name;
    this.first_name = customer.first_name;
    this.active = customer.active;
  }

  get fullName () {
    return `${this.first_name} ${this.last_name}`;
  }

  static async create (newCustomer) {
    return db.query('INSERT INTO customers SET ?', newCustomer).then(res => { newCustomer.id = res.insertId; return newCustomer; });
  }

  static async findById (id) {
    return db.query(`SELECT * FROM customers WHERE id = ${id}`)
      .then(rows => {
        if (rows.length) {
          return Promise.resolve(rows[0]);
        } else {
          return Promise.reject(new Error({ kind: 'not_found' }));
        }
      });
  }

  static async emailAlreadyExists (email) {
    return db.query('SELECT * FROM customers WHERE email = ?', [email])
      .then(rows => {
        if (rows.length) {
          return Promise.resolve(true);
        } else {
          return Promise.resolve(false);
        }
      });
  }

  static async getAll (result) {
    return db.query('SELECT * FROM customers');
  }

  static async updateById (id, customer) {
    return db.query(
      'UPDATE customers SET email = ?, first_name = ?, last_name = ?, active = ? WHERE id = ?',
      [customer.email, customer.first_name, customer.last_name, customer.active, id]
    );
  }

  static async remove (id) {
    return db.query('DELETE FROM customers WHERE id = ?', id).then(res => {
      if (res.affectedRows !== 0) {
        return Promise.resolve();
      } else {
        return Promise.reject(new Error({ kind: 'not_found' }));
      }
    });
  }

  static async removeAll (result) {
    return db.query('DELETE FROM customers');
  }
}

module.exports = Customer;
