import pool from '../database';


const insertAllTables = () => {
  const sql = `
  TRUNCATE Users;

  INSERT INTO Users(
    firstName,
    lastName,
    email,
    password,
    type,
    isAdmin
    ) 
    VALUES (
      'Nero',
      'Paul',
      'neropaulej@gmail.com',
      '$2y$12$n6jFL050ZsssDIGQpHeN2uWHRae.9TiSeUdf8RoTwSO1zBjhFry4C',
      'client',
      'false'
      ),
      (
        'Yetunde',
        'George',
        'yetundegeorge@gmail.com',
        '$2y$12$n6jFL050ZsssDIGQpHeN2uWHRae.9TiSeUdf8RoTwSO1zBjhFry4C',
        'staff',
        'false'
      ),
      (
        'Yoshi',
        'Yama',
        'yoshiyama@gmail.com',
        '$2y$12$n6jFL050ZsssDIGQpHeN2uWHRae.9TiSeUdf8RoTwSO1zBjhFry4C',
        'staff',
        'true'
      );

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
  insertAllTables,
};

// eslint-disable-next-line import/first
require('make-runnable');
