import pool from '../database';


const createAllTables = () => {
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
  createAllTables,
};

// eslint-disable-next-line import/first
require('make-runnable');
