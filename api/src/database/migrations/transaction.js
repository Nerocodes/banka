import pool from '../database';


const createTransactionTable = () => {
  const sql = `
  DROP TABLE IF EXISTS Transactions;

  CREATE TABLE Transactions(
    id SERIAL PRIMARY KEY,
    createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
    type VARCHAR NOT NULL,
    accountNumber INT NOT NULL,
    cashier INT NOT NULL,
    amount FLOAT NOT NULL,
    oldBalance FLOAT,
    newBalance FLOAT
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
  createTransactionTable,
};

// eslint-disable-next-line import/first
require('make-runnable');
