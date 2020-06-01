const express = require('express');

const app = express();
const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' ? 3001 : 3000);

// middlewares
app.use(express.json());
app.get('/', (req, res) => {
  res.redirect('/customers');
});

// routes
require('./routes/customer.routes.js')(app);

// set port, listen for requests
const server = app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

module.exports = server;
