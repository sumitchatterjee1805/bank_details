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
const auth = require('./function/auth');

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', async (req, res) => {
  const payload = req.body.payload;
  const $Options = {
    issuer: 'Sumit.Chatterjee.Fyle',
    subject: req.body.email,
    audience: req.baseUrl
  }
  const token = await auth.sign(payload, $Options);
  res.setHeader('x-access-token', token);
  res.status(200).send('success');
});


app.use('/branch/:ifsc', auth.verify, branch);
app.use('/bank/:bank/city/:city', auth.verify, bank);

app.use('*', function (req, res) {
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
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Instance started`);
    });
  }
});

module.exports = app;
// [END app]