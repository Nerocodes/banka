import Account from '../models/account.model';
import UserService from './user.service';
import pool from '../database/database';

const AccountService = {
  async createAccount(userId, accountType) {
    const account = new Account();
    const user = await UserService.getAUser(userId);
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
        status: 201,
        message: 'Account created successfully',
        data: {
          accountNumber,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
          type,
          openingBalance: openingBalance.toFixed(2),
        },
      };
    } finally {
      client.release();
    }
  },

  async accountStatus({ accountNumber }, { status }) {
    const sql = `
        SELECT * FROM Accounts WHERE accountNumber=${accountNumber};
      `;
    const client = await pool.connect();
    try {
      const res = await client.query(sql);
      const account = res.rows[0];
      if (!account) {
        return {
          status: 400,
          error: 'No account found',
        };
      }
      const sql2 = `
        UPDATE Accounts SET status = '${status}' WHERE accountNumber = ${accountNumber};
      `;
      await client.query(sql2);
      return {
        status: 200,
        message: 'Request Successful',
        data: {
          accountNumber,
          status,
        },
      };
    } finally {
      client.release();
    }
  },

  async deleteAccount({ accountNumber }) {
    const sql = `
        DELETE FROM Accounts WHERE accountNumber='${accountNumber}';
      `;
    const client = await pool.connect();
    try {
      const res = await client.query(sql);
      if (res.rowCount < 1) {
        return {
          status: 400,
          error: 'No account found',
        };
      }
      return {
        status: 200,
        message: 'Account successfully deleted',
      };
    } finally {
      client.release();
    }
  },

  async transactionHistory({ userId, userType }, { accountNumber }) {
    const sql1 = `
        SELECT * FROM Accounts WHERE accountNumber=${accountNumber};
      `;
    const sql = `
    SELECT * FROM Transactions WHERE accountNumber='${accountNumber}' ORDER BY createdOn DESC;
    `;
    const client = await pool.connect();
    try {
      const res1 = await client.query(sql1);
      if (res1.rowCount < 1) {
        return {
          status: 400,
          error: 'No account with this account number',
        };
      }
      if (userType === 'client') {
        if (userId !== res1.rows[0].owner) {
          return {
            status: 403,
            error: 'Unauthorized Access',
          };
        }
      }
      const res = await client.query(sql);
      if (res.rowCount < 1) {
        return {
          status: 400,
          error: 'No transaction history',
        };
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
          amount: amount.toFixed(2),
          oldBalance: oldBalance.toFixed(2),
          newBalance: newBalance.toFixed(2),
        };
        return history.push(transactionRes);
      });
      return {
        status: 200,
        message: 'Request Successful',
        data: history,
      };
    } finally {
      client.release();
    }
  },

  async getSingleAccount({ userId, userType }, { accountNumber }) {
    const sql = `
        SELECT * FROM Accounts WHERE accountNumber=${accountNumber};
      `;
    const client = await pool.connect();
    try {
      const res = await client.query(sql);
      if (res.rowCount < 1) {
        return {
          status: 404,
          error: 'No account with this account number',
        };
      }
      const {
        createdon: createdOn,
        owner: id,
        type,
        status,
        balance,
      } = res.rows[0];
      if (userType === 'client') {
        if (userId !== id) {
          return {
            status: 403,
            error: 'Unauthorized Access',
          };
        }
      }
      const user = await UserService.getAUser(id);
      return {
        status: 200,
        message: 'Request Successful',
        data: {
          createdOn,
          accountNumber,
          ownerEmail: user.email,
          type,
          status,
          balance: balance.toFixed(2),
        },
      };
    } finally {
      client.release();
    }
  },

  async getAllAccounts({ query }) {
    let sql = '';
    if (query.status) {
      sql = `
        SELECT * FROM Accounts Where status='${query.status}';
      `;
    } else {
      sql = `
        SELECT * FROM Accounts;
      `;
    }
    const client = await pool.connect();
    try {
      const res = await client.query(sql);
      const accounts = [];
      const accountsPromise = res.rows.map(async (account) => {
        const {
          createdon: createdOn,
          owner: id,
          type,
          accountnumber: accountNumber,
          status,
          balance,
        } = account;
        const user = await UserService.getAUser(id);
        return accounts.push({
          createdOn,
          accountNumber,
          ownerEmail: user.email,
          type,
          status,
          balance: balance.toFixed(2),
        });
      });
      await Promise.all(accountsPromise);
      return {
        status: 200,
        message: 'Request Successful',
        data: accounts,
      };
    } finally {
      client.release();
    }
  },
};

export default AccountService;
