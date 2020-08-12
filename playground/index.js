require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const databook = require('./scripts/databook');

app.listen(port, () => {
  console.log(`App started on port ${port}!!`);
  databook.printDataBook();
});
