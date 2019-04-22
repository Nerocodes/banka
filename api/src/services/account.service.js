import Account from '../models/account.model';
import UserService from './user.service';
import pool from '../database/database';

const AccountService = {
  async createAccount(userId, accountType) {
    const account = new Account();
    const user = await UserService.getAUser(userId);
    if (user.type !== 'client') {
      return { error: 'An account cannot be created for this user' };
    }
    const sql = `
        SELECT accountNumber FROM Accounts ORDER BY id DESC LIMIT 1;
      `;

    const client = await pool.connect();
    try {
      const res = await client.query(sql);
      const newAccNo = res.rows[0].accountnumber + 1;
      account.accountNumber = newAccNo;
      account.owner = user.id;
      account.type = accountType;
      account.status = 'draft';
      account.balance = 0.00;
      const sql2 = `
      INSERT INTO Accounts(
        accountNumber,
        owner,
        type,
        status,
        balance
        ) 
        VALUES (
          '${account.accountNumber}',
          '${account.owner}',
          '${account.type}',
          '${account.status}',
          '${account.balance}'
          );
    `;
      await client.query(sql2);
      const sql3 = `
        SELECT * FROM Accounts WHERE accountNumber=${account.accountNumber}; 
      `;
      const res3 = await client.query(sql3);
      const {
        accountnumber: accountNumber,
        type,
        balance: openingBalance,
      } = res3.rows[0];
      return {
        accountNumber,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
        type,
        openingBalance,
      };
    } catch (err) {
      return { error: err.detail };
    } finally {
      client.release();
    }
  },

  async accountStatus({ userId }, { accountNumber }, { status }) {
    const user = await UserService.getAUser(userId);
    if (user.type === 'client') return { error: 'Unauthorized user' };
    const sql = `
        SELECT * FROM Accounts WHERE accountNumber=${accountNumber};
      `;
    const client = await pool.connect();
    try {
      const res = await client.query(sql);
      const account = res.rows[0];
      if (!account) return { error2: 'No account found' };
      const sql2 = `
        UPDATE Accounts SET status = '${status}' WHERE accountNumber = ${accountNumber};
      `;
      await client.query(sql2);
      return {
        accountNumber,
        status,
      };
    } catch (err) {
      return { error: err.detail };
    } finally {
      client.release();
    }
  },

  async deleteAccount({ userId }, { accountNumber }) {
    const user = await UserService.getAUser(userId);
    if (user.type === 'client') return { error: 'Unauthorized user' };
    const sql = `
        DELETE FROM Accounts WHERE accountNumber='${accountNumber}';
      `;
    const client = await pool.connect();
    try {
      const res = await client.query(sql);
      if (res.rowCount < 1) return { error2: 'No account found' };
      return {
        deleted: 'Account successfully deleted',
      };
    } catch (err) {
      return { error: err.detail };
    } finally {
      client.release();
    }
  },

  async transactionHistory({ accountNumber }) {
    const sql = `
    SELECT * FROM Transactions WHERE accountNumber='${accountNumber}' ORDER BY createdOn DESC;
    `;
    const client = await pool.connect();
    try {
      const res = await client.query(sql);
      if (res.rowCount < 1) {
        return { error1: 'No transaction history' };
      }
      const history = [];
      res.rows.map((transaction) => {
        const {
          id: transactionId,
          createdon: createdOn,
          type,
          amount,
          oldbalance: oldBalance,
          newbalance: newBalance,
        } = transaction;
        const transactionRes = {
          transactionId,
          createdOn,
          type,
          accountNumber,
          amount,
          oldBalance,
          newBalance,
        };
        return history.push(transactionRes);
      });
      return history;
    } catch (err) {
      return { error: err.detail };
    } finally {
      client.release();
    }
  },

  async getSingleAccount({ accountNumber }) {
    const sql = `
        SELECT * FROM Accounts WHERE accountNumber=${accountNumber};
      `;
    const client = await pool.connect();
    try {
      const res = await client.query(sql);
      if (res.rowCount < 1) return { error: 'No account with this account number' };
      const {
        createdon: createdOn,
        owner: userId,
        type,
        status,
        balance,
      } = res.rows[0];
      const user = await UserService.getAUser(userId);
      return {
        createdOn,
        accountNumber,
        ownerEmail: user.email,
        type,
        status,
        balance,
      };
    } catch (err) {
      return { error: err.detail };
    } finally {
      client.release();
    }
  },
};

export default AccountService;
