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
    owner,
    type,
    status,
    balance
    ) 
    VALUES (
      23402001,
      '1',
      'savings',
      'active',
      '250000'
      ),
      (
        23402002,
        '2',
        'savings',
        'dormant',
        '50000'
      ),
      (
        23402003,
        '1',
        'current',
        'dormant',
        '20000'
      );

      TRUNCATE Transactions;

  INSERT INTO Transactions(
    type,
    accountNumber,
    cashier,
    amount,
    oldBalance,
    newBalance
    ) 
    VALUES (
      'credit',
      23402001,
      '2',
      '50000',
      '200000',
      '250000'
      ),
      (
        'debit',
        23402002,
        '2',
        '50000',
        '200000',
        '150000'
      ),
      (
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
    });
};

insertAllTables();
