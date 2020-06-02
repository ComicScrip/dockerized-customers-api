const express = require('express');

const app = express();
const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' ? 3001 : 3000);

// middlewares
app.use(express.json());
app.use('/customers', require('./routes/customer.routes.js'));
app.use('/', (req, res) => { res.redirect('/customers'); });

// set port, listen for requests
const server = app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

module.exports = server;
