module.exports = app => {
  const customersController = require('../controllers/customer.controller.js');
  app.post('/customers', customersController.create);
  app.get('/customers', customersController.findAll);
  app.get('/customers/:customerId', customersController.findOne);
  app.put('/customers/:customerId', customersController.update);
  app.delete('/customers/:customerId', customersController.delete);
  app.delete('/customers', customersController.deleteAll);
};
