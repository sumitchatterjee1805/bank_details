'use strict';
// [START app]
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./db');
const env = require('dotenv').config();
const bank = require('./routes/bank');
const branch = require('./routes/branch');

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/branch/:ifsc', branch);
app.use('/bank/:bank_name/city/:city', bank);

app.use('*', function (err, req, res) {
  res.status(404).json({
    'message': 'File not found'
  });
});

db.connect((err) => {
  if (err) {
    console.log('Unable to connect to pg.')
    //process.exit(1)
  } else {
    // Start the server
    console.log("DB connection established");
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Instance started`);
    });
  }
});

module.exports = app;
// [END app]