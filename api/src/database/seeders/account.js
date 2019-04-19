import pool from '../database';


const insertAccountTable = () => {
  const sql = `
  TRUNCATE Accounts;

  INSERT INTO Accounts(
    accountNumber,
    createdOn,
    owner,
    type,
    status,
    balance
    ) 
    VALUES (
      23402001,
      '04/08/2019',
      '1',
      'savings',
      'active',
      '250000'
      ),
      (
        23402002,
        '09/03/2019',
        '2',
        'savings',
        'dormant',
        '50000'
      ),
      (
        23402003,
        '01/09/2019',
        '1',
        'current',
        'dormant',
        '20000'
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
  insertAccountTable,
};

// eslint-disable-next-line import/first
require('make-runnable');
