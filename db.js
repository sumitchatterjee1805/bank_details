'use strict';
const {pg} = require('pg');
const pg_user = require('./pg_users');

const state = {
  pool: null
}

exports.connect = function (done) {
    state.pool = new pg(pg_user.READ, {
      connectionString: process.env.DATABASE_URL
    });

    state.pool.on('connect', () => {
      done();
    });
}

exports.get = function (type, done) {
  if (!state.pool) return done(new Error('Missing database connection.'));

  if (type === pg_user.READ) {
    state.pool.getConnection(pg_user.READ, function (err, connection) {
      if (err){
        return done(err);
      }
      done(null, connection);
    });
  } else if (type === pg_user.WRITE) {
    state.pool.getConnection(pg_user.WRITE, function (err, connection) {
      if (err){
        return done(err);
      }
      done(null, connection);
    });
  }
}