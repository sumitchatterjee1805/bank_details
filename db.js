'use strict';
const {Pool} = require('pg');

let pool = null;

exports.connect = function (done) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: true
    });
    done();
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