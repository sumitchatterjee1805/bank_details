'use strict';
const {Pool} = require('pg');

let pool = null;

exports.connect = function (done) {
  try {
    pool = new Pool({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    });
    done(null);
  } catch (error) {
    done(error);
  }
}

exports.query = async function (query, params) {
  try {
    const client = await pool.connect();
    const result = await client.query(query, params);
    client.release();
    return result.rows;
  } catch (err) {
    return new Error(err);
  }
}