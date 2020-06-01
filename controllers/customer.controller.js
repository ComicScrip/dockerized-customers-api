const Customer = require('../models/customer.model.js');

class CustomersController {
  static async create (req, res) {
    if (!req.body) {
      return res.status(400).send({ errorMessage: 'Content can not be empty!' });
    }

    try {
      const customer = new Customer(req.body);
      if (await Customer.emailAlreadyExists(customer.email)) {
        res.status(400).send({ errorMessage: 'A customer with this email already exists !' });
      } else {
        const data = await Customer.create(customer);
        res.status(201).send({ data });
      }
    } catch (err) {
      res.status(500).send({
        errorMessage: err.message || 'Some error occurred while creating the Customer.'
      });
    }
  }

  static async findAll (req, res) {
    try {
      const data = (await Customer.getAll()).map(c => new Customer(c)).map(c => ({
        name: c.fullName,
        email: c.email,
        active: c.active
      }));
      res.send({ data });
    } catch (err) {
      res.status(500).send({
        errorMessage: err.message || 'Some error occurred while retrieving customers.'
      });
    }
  }

  static async findOne (req, res) {
    try {
      const data = await Customer.findById(req.params.customerId);
      res.send({ data });
    } catch (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({ errorMessage: `Customer with id ${req.params.customerId} not found.` });
      } else {
        res.status(500).send({ errorMessage: 'Error retrieving Customer with id ' + req.params.customerId });
      }
    }
  }

  static async update (req, res) {
    if (!req.body) {
      res.status(400).send({ errorMessage: 'Content can not be empty!' });
    }

    try {
      const data = await Customer.updateById(req.params.customerId, new Customer(req.body));
      res.send({ data });
    } catch (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({ errorMessage: `Customer with id ${req.params.customerId} not found.` });
      } else {
        res.status(500).send({ errorMessage: 'Error updating Customer with id ' + req.params.customerId });
      }
    }
  }

  static async delete (req, res) {
    try {
      await Customer.remove(req.params.customerId);
      res.send({ message: 'Customer was deleted successfully!' });
    } catch (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Customer with id ' + req.params.customerId
        });
      }
    }
  }
}

module.exports = CustomersController;
