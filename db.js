'use strict';
const mysql = require('mysql');
const mysql_user = require('./mysql_users');

const state = {
  pool: null
}

exports.connect = function (done) {
    state.pool = mysql.createPoolCluster();

    state.pool.add(mysql_user.READ, {
      user: process.env.READ_USER,
      password: process.env.READ_USER_PASSWORD,
      database: process.env.SQL_DATABASE,
      socketPath: process.env.INSTANCE_CONNECTION_NAME,
      charset: 'utf8mb4'
    });
  done()
}

exports.get = function (type, done) {
  if (!state.pool) return done(new Error('Missing database connection.'));

  if (type === mysql_user.READ) {
    state.pool.getConnection(mysql_user.READ, function (err, connection) {
      if (err){
        return done(err);
      }
      done(null, connection);
    });
  } else if (type === mysql_user.WRITE) {
    state.pool.getConnection(mysql_user.WRITE, function (err, connection) {
      if (err){
        return done(err);
      }
      done(null, connection);
    });
  }
}