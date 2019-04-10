/* eslint-disable eqeqeq */
import dummyData from '../utils/dummyData';
import Transaction from '../models/transaction.model';
import UserService from './user.service';
import AccountService from './account.service';

const TransactionService = {
  debitAccount({ userId }, { accountNumber }, { amount }) {
    const user = UserService.getAUser(userId);
    if (user.type !== 'staff' || user.isAdmin == true) return { error: 'Unathorized user' };
    const account = AccountService.getAnAccount(accountNumber);
    if (!account.id) return { error: 'Account number does not match our records' };
    const transaction = new Transaction();
    const transactionResponse = {};
    const transactionLength = dummyData.transactions.length;
    const lastId = dummyData.transactions[transactionLength - 1].id;
    const newId = lastId + 1;
    transaction.id = newId;
    transaction.createdOn = new Date();
    transaction.type = 'debit';
    transaction.accountNumber = account.accountNumber;
    transaction.cashier = user.id;
    transaction.amount = amount;
    transaction.oldBalance = account.balance;
    if (account.balance - amount < 0) return { error2: 'Transaction declined: Insufficient funds' };
    transaction.newBalance = account.balance - amount;
    account.balance = transaction.newBalance;
    dummyData.transactions.push(transaction);
    transactionResponse.transactionId = transaction.id;
    transactionResponse.accountNumber = transaction.accountNumber;
    transactionResponse.amount = transaction.amount;
    transactionResponse.cashier = transaction.cashier;
    transactionResponse.transactionType = transaction.type;
    transactionResponse.accountBalance = `${transaction.newBalance}`;
    return transactionResponse;
  },
};

export default TransactionService;
