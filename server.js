const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// parse requests of content-type: application/json
app.use(express.json());

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'It works' });
});

require('./routes/customer.routes.js')(app);

// set port, listen for requests
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
