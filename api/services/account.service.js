/* eslint-disable eqeqeq */
import dummyData from '../utils/dummyData';
import Account from '../models/account.model';
import UserService from './user.service';

const AccountService = {
  createAccount(userId, accountType) {
    const account = new Account();
    const accountResponse = {};
    const user = UserService.getAUser(userId);
    if (user.type !== 'client') {
      return { error: 'An account cannot be created for this user' };
    }
    const oldAccount = dummyData.accounts
      .find(singleAccount => singleAccount.owner == user.id);
    if (oldAccount) {
      return { error: 'User already has an account' };
    }
    const accountLength = dummyData.accounts.length;
    const lastId = dummyData.accounts[accountLength - 1].id;
    const lastAccountNumber = dummyData.accounts[accountLength - 1].accountNumber;
    const newAccountNumber = lastAccountNumber + 1;
    const newId = lastId + 1;
    account.id = newId;
    account.accountNumber = newAccountNumber;
    account.createdOn = new Date();
    account.owner = user.id;
    account.type = accountType;
    account.status = 'draft';
    account.balance = 0.00;
    dummyData.accounts.push(account);
    accountResponse.accountNumber = account.accountNumber;
    accountResponse.firstName = user.firstName;
    accountResponse.lastName = user.lastName;
    accountResponse.email = user.email;
    accountResponse.type = account.type;
    accountResponse.openingBalance = 0.00;
    return accountResponse;
  },

  accountStatus({ userId }, { accountNumber }, { status }) {
    const user = UserService.getAUser(userId);
    if (user.type === 'client') return { error: 'Unathorized user' };
    const account = dummyData.accounts
      .find(singleAccount => singleAccount.accountNumber == accountNumber);
    if (!account) return { error: 'No account found' };
    account.status = status;
    return account;
  },

  fetchAllAccounts({ userId }) {
    const user = UserService.getAUser(userId);
    if (user.type === 'client') return { error: 'Unathorized user' };
    const validAccounts = dummyData.accounts.map((singleAccount) => {
      const newAccount = new Account();
      newAccount.id = singleAccount.id;
      newAccount.accountNumber = singleAccount.accountNumber;
      newAccount.createdOn = singleAccount.createdOn;
      newAccount.owner = singleAccount.owner;
      newAccount.type = singleAccount.type;
      newAccount.status = singleAccount.status;
      newAccount.balance = singleAccount.balance;
      return newAccount;
    });
    return validAccounts;
  },

  deleteAccount({ userId }, { accountNumber }) {
    const user = UserService.getAUser(userId);
    if (user.type === 'client') return { error: 'Unathorized user' };
    const accountIndex = dummyData.accounts
      .findIndex(account => account.accountNumber == accountNumber);
    dummyData.accounts.splice(accountIndex, 1);
    const validAccounts = dummyData.accounts.map((account) => {
      const newAccount = new Account();
      newAccount.id = account.id;
      newAccount.name = account.name;
      newAccount.description = account.description;
      newAccount.price = account.price;
      return newAccount;
    });

    return validAccounts;
  },
};

export default AccountService;
