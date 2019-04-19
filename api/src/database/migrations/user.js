import pool from '../database';


const createUserTable = () => {
  const sql = `
  DROP TABLE IF EXISTS Users;

  CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    firstName VARCHAR NOT NULL,
    lastName VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    isAdmin BOOLEAN
  );
  `;
  pool.query(sql)
    .then(() => {
      pool.end();
    })
    .catch(() => {
      pool.end();
    });
};

module.exports = {
  createUserTable,
};

// eslint-disable-next-line import/first
require('make-runnable');
