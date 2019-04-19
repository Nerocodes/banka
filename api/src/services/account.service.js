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
        SELECT accountNumber FROM Accounts;
      `;

    const client = await pool.connect();
    try {
      const res = await client.query(sql);
      const rowNum = res.rowCount;
      const lastAccNo = res.rows[rowNum - 1];
      const newAccNo = lastAccNo.accountnumber + 1;
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
    } finally {
      client.release();
    }
  },

  // fetchAllAccounts({ userId }) {
  //   const user = UserService.getAUser(userId);
  //   if (user.type === 'client') return { error: 'Unauthorized user' };
  //   const validAccounts = dummyData.accounts.map((singleAccount) => {
  //     const newAccount = new Account();
  //     newAccount.id = singleAccount.id;
  //     newAccount.accountNumber = singleAccount.accountNumber;
  //     newAccount.createdOn = singleAccount.createdOn;
  //     newAccount.owner = singleAccount.owner;
  //     newAccount.type = singleAccount.type;
  //     newAccount.status = singleAccount.status;
  //     newAccount.balance = singleAccount.balance;
  //     return newAccount;
  //   });
  //   return validAccounts;
  // },

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
    } finally {
      client.release();
    }
  },

  // getAnAccount(accountNumber) {
  //   const account = dummyData.accounts
  //     .find(singleAccount => singleAccount.accountNumber == accountNumber);
  //   return account || {};
  // },
};

export default AccountService;
