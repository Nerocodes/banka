import pool from '../database';


const insertTransactionTable = () => {
  const sql = `
  TRUNCATE Transactions;

  INSERT INTO Transactions(
    createdOn,
    type,
    accountNumber,
    cashier,
    amount,
    oldBalance,
    newBalance
    ) 
    VALUES (
      '04/08/2019',
      'credit',
      23402001,
      '2',
      '50000',
      '200000',
      '250000'
      ),
      (
        '02/03/2019',
        'debit',
        23402002,
        '2',
        '50000',
        '200000',
        '150000'
      ),
      (
        '09/09/2019',
        'credit',
        23402001,
        '2',
        '50000',
        '250000',
        '270000'
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
  insertTransactionTable,
};

// eslint-disable-next-line import/first
require('make-runnable');
