import pool from '../database';


const createAccountTable = () => {
  const sql = `
  DROP TABLE IF EXISTS Accounts;

  CREATE TABLE Accounts(
    id SERIAL PRIMARY KEY,
    accountNumber INT UNIQUE NOT NULL,
    createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
    owner INT NOT NULL,
    type VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    balance FLOAT
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
  createAccountTable,
};

// eslint-disable-next-line import/first
require('make-runnable');
