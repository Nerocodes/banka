/* eslint-disable eqeqeq */
import Transaction from '../models/transaction.model';
import UserService from './user.service';
import AccountService from './account.service';
import pool from '../database/database';

const TransactionService = {
  async debitAccount({ userId }, { accountNumber }, { amount }) {
    const user = await UserService.getAUser(userId);
    const transaction = new Transaction();
    const sql = `
        SELECT * FROM Accounts WHERE accountNumber=${accountNumber};
      `;

    const client = await pool.connect();
    try {
      const res = await client.query(sql);
      if (res.rowCount < 1) {
        return {
          status: 400,
          error: 'Account number does not match our records',
        };
      }
      const account = res.rows[0];
      transaction.type = 'debit';
      transaction.accountNumber = account.accountnumber;
      transaction.cashier = user.id;
      transaction.amount = amount;
      transaction.oldBalance = account.balance;
      if (account.balance - amount < 0) {
        return {
          status: 400,
          error: 'Transaction declined: Insufficient funds',
        };
      }
      transaction.newBalance = account.balance - amount;
      account.balance = transaction.newBalance;
      const sql2 = `
      INSERT INTO Transactions(
        type,
        accountNumber,
        cashier,
        amount,
        oldBalance,
        newBalance
        ) 
        VALUES (
          '${transaction.type}',
          '${transaction.accountNumber}',
          '${transaction.cashier}',
          '${transaction.amount}',
          '${transaction.oldBalance}',
          '${transaction.newBalance}'
          );
    `;
      await client.query(sql2);
      // update account balance
      const sql3 = `
        UPDATE Accounts SET balance = '${transaction.newBalance}' WHERE accountNumber = ${accountNumber};
      `;
      await client.query(sql3);
      const sql4 = `
        SELECT * FROM Transactions ORDER BY id DESC LIMIT 1; 
      `;
      const res4 = await client.query(sql4);
      const {
        id: transactionId,
        cashier,
        type: transactionType,
        newbalance: accountBalance,
      } = res4.rows[0];
      return {
        status: 200,
        message: 'Transaction Successful',
        data: {
          transactionId,
          accountNumber,
          amount: amount.toFixed(2),
          cashier,
          transactionType,
          accountBalance: accountBalance.toFixed(2),
        },
      };
    } finally {
      client.release();
    }
  },

  async creditAccount({ userId }, { accountNumber }, { amount }) {
    const user = await UserService.getAUser(userId);
    const transaction = new Transaction();
    const sql = `
        SELECT * FROM Accounts WHERE accountNumber=${accountNumber};
      `;

    const client = await pool.connect();
    try {
      const res = await client.query(sql);
      if (res.rowCount < 1) {
        return {
          status: 400,
          error: 'Account number does not match our records',
        };
      }
      const account = res.rows[0];
      transaction.type = 'credit';
      transaction.accountNumber = account.accountnumber;
      transaction.cashier = user.id;
      transaction.amount = amount;
      transaction.oldBalance = account.balance;
      transaction.newBalance = account.balance + amount;
      account.balance = transaction.newBalance;
      const sql2 = `
      INSERT INTO Transactions(
        type,
        accountNumber,
        cashier,
        amount,
        oldBalance,
        newBalance
        ) 
        VALUES (
          '${transaction.type}',
          '${transaction.accountNumber}',
          '${transaction.cashier}',
          '${transaction.amount}',
          '${transaction.oldBalance}',
          '${transaction.newBalance}'
          );
    `;
      await client.query(sql2);
      // update account balance
      const sql3 = `
        UPDATE Accounts SET balance = '${transaction.newBalance}' WHERE accountNumber = ${accountNumber};
      `;
      await client.query(sql3);
      const sql4 = `
        SELECT * FROM Transactions ORDER BY id DESC LIMIT 1; 
      `;
      const res4 = await client.query(sql4);
      const {
        id: transactionId,
        cashier,
        type: transactionType,
        newbalance: accountBalance,
      } = res4.rows[0];
      return {
        status: 200,
        message: 'Transaction Successful',
        data: {
          transactionId,
          accountNumber,
          amount: amount.toFixed(2),
          cashier,
          transactionType,
          accountBalance: accountBalance.toFixed(2),
        },
      };
    } finally {
      client.release();
    }
  },

  async getATransaction({ userId, userType }, { transactionId }) {
    const sql = `
        SELECT * FROM Transactions WHERE id='${transactionId}';
      `;

    const client = await pool.connect();
    try {
      const res = await client.query(sql);
      if (res.rowCount < 1) {
        return {
          status: 400,
          error: 'No transaction with this id',
        };
      }
      const {
        createdon: createdOn,
        type,
        accountnumber: accountNumber,
        amount,
        oldbalance: oldBalance,
        newbalance: newBalance,
      } = res.rows[0];

      const authorize = await AccountService
        .getSingleAccount({ userId, userType }, { accountNumber });
      if (authorize.error) {
        return {
          status: 403,
          error: 'Unauthorized Access',
        };
      }
      return {
        status: 200,
        message: 'Request Successful',
        data: {
          transactionId,
          createdOn,
          type,
          accountNumber,
          amount: amount.toFixed(2),
          oldBalance: oldBalance.toFixed(2),
          newBalance: newBalance.toFixed(2),
        },
      };
    } finally {
      client.release();
    }
  },
};

export default TransactionService;
