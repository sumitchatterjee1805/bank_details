'use strict';
const {Pool} = require('pg');
const pg_user = require('./pg_users');

const state = {
  pool: null
}

exports.connect = function (done) {
    state.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: true
    });
    // state.pool.on('error', (err, client) => {
    //   console.error('Unexpected error on idle client', err)
    //   process.exit(-1)
    // });

    // state.pool.on('connect', () => {
    // done();
    // });
    done();
}

exports.get = async function (done) {
  // if (!state.pool) return done(new Error('Missing database connection.'));

  // if (type === pg_user.READ) {
  //   state.pool.getConnection(pg_user.READ, function (err, connection) {
  //     if (err){
  //       return done(err);
  //     }
  //     done(null, connection);
  //   });
  // } else if (type === pg_user.WRITE) {
  //   state.pool.getConnection(pg_user.WRITE, function (err, connection) {
  //     if (err){
  //       return done(err);
  //     }
  //     done(null, connection);
  //   });
  // }
  try {
    const client = await state.pool.connect()
    const result = await client.query('SELECT * FROM public.branches');
    //const results = { 'results': (result) ? result.rows : null};
    client.release();
    done(result, null);
  } catch (err) {
    console.error(err);
    done(null, err);
  }
}