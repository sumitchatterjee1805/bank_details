'use strict';
// [START app]
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./db');

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req, res) => {
    res.send("Test");
});

db.connect((err) => {
  if (err) {
    console.log('Unable to connect to pg.')
    //process.exit(1)
  } else {
    // Start the server
    console.log("DB connected");
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Instance started`);
    });
  }
});

module.exports = app;
// [END app]