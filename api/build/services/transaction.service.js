"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dummyData = _interopRequireDefault(require("../utils/dummyData"));

var _transaction = _interopRequireDefault(require("../models/transaction.model"));

var _user = _interopRequireDefault(require("./user.service"));

var _account = _interopRequireDefault(require("./account.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable eqeqeq */
var TransactionService = {
  debitAccount: function debitAccount(_ref, _ref2, _ref3) {
    var userId = _ref.userId;
    var accountNumber = _ref2.accountNumber;
    var amount = _ref3.amount;

    var user = _user["default"].getAUser(userId);

    if (user.type !== 'staff' || user.isAdmin == true) return {
      error: 'Unauthorized user'
    };

    var account = _account["default"].getAnAccount(accountNumber);

    if (!account.id) return {
      error1: 'Account number does not match our records'
    };
    var transaction = new _transaction["default"]();
    var transactionResponse = {};
    var transactionLength = _dummyData["default"].transactions.length;
    var lastId = _dummyData["default"].transactions[transactionLength - 1].id;
    var newId = lastId + 1;
    transaction.id = newId;
    transaction.createdOn = new Date();
    transaction.type = 'debit';
    transaction.accountNumber = account.accountNumber;
    transaction.cashier = user.id;
    transaction.amount = amount;
    transaction.oldBalance = account.balance;
    if (account.balance - amount < 0) return {
      error2: 'Transaction declined: Insufficient funds'
    };
    transaction.newBalance = account.balance - amount;
    account.balance = transaction.newBalance;

    _dummyData["default"].transactions.push(transaction);

    transactionResponse.transactionId = transaction.id;
    transactionResponse.accountNumber = transaction.accountNumber;
    transactionResponse.amount = transaction.amount;
    transactionResponse.cashier = transaction.cashier;
    transactionResponse.transactionType = transaction.type;
    transactionResponse.accountBalance = "".concat(transaction.newBalance);
    return transactionResponse;
  },
  creditAccount: function creditAccount(_ref4, _ref5, _ref6) {
    var userId = _ref4.userId;
    var accountNumber = _ref5.accountNumber;
    var amount = _ref6.amount;

    var user = _user["default"].getAUser(userId);

    if (user.type !== 'staff' || user.isAdmin == true) return {
      error: 'Unauthorized user'
    };

    var account = _account["default"].getAnAccount(accountNumber);

    if (!account.id) return {
      error1: 'Account number does not match our records'
    };
    var transaction = new _transaction["default"]();
    var transactionResponse = {};
    var transactionLength = _dummyData["default"].transactions.length;
    var lastId = _dummyData["default"].transactions[transactionLength - 1].id;
    var newId = lastId + 1;
    transaction.id = newId;
    transaction.createdOn = new Date();
    transaction.type = 'credit';
    transaction.accountNumber = account.accountNumber;
    transaction.cashier = user.id;
    transaction.amount = amount;
    transaction.oldBalance = account.balance;
    transaction.newBalance = account.balance + amount;
    account.balance = transaction.newBalance;

    _dummyData["default"].transactions.push(transaction);

    transactionResponse.transactionId = transaction.id;
    transactionResponse.accountNumber = transaction.accountNumber;
    transactionResponse.amount = transaction.amount;
    transactionResponse.cashier = transaction.cashier;
    transactionResponse.transactionType = transaction.type;
    transactionResponse.accountBalance = "".concat(transaction.newBalance);
    return transactionResponse;
  }
};
var _default = TransactionService;
exports["default"] = _default;
//# sourceMappingURL=transaction.service.js.map