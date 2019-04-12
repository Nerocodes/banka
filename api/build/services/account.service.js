"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dummyData = _interopRequireDefault(require("../utils/dummyData"));

var _account = _interopRequireDefault(require("../models/account.model"));

var _user = _interopRequireDefault(require("./user.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable eqeqeq */
var AccountService = {
  createAccount: function createAccount(userId, accountType) {
    var account = new _account["default"]();
    var accountResponse = {};

    var user = _user["default"].getAUser(userId);

    if (user.type !== 'client') {
      return {
        error: 'An account cannot be created for this user'
      };
    }

    var oldAccount = _dummyData["default"].accounts.find(function (singleAccount) {
      return singleAccount.owner == user.id;
    });

    if (oldAccount) {
      return {
        error2: 'User already has an account'
      };
    }

    var accountLength = _dummyData["default"].accounts.length;
    var lastId = _dummyData["default"].accounts[accountLength - 1].id;
    var lastAccountNumber = _dummyData["default"].accounts[accountLength - 1].accountNumber;
    var newAccountNumber = lastAccountNumber + 1;
    var newId = lastId + 1;
    account.id = newId;
    account.accountNumber = newAccountNumber;
    account.createdOn = new Date();
    account.owner = user.id;
    account.type = accountType;
    account.status = 'draft';
    account.balance = 0.00;

    _dummyData["default"].accounts.push(account);

    accountResponse.accountNumber = account.accountNumber;
    accountResponse.firstName = user.firstName;
    accountResponse.lastName = user.lastName;
    accountResponse.email = user.email;
    accountResponse.type = account.type;
    accountResponse.openingBalance = 0.00;
    return accountResponse;
  },
  accountStatus: function accountStatus(_ref, _ref2, _ref3) {
    var userId = _ref.userId;
    var accountNumber = _ref2.accountNumber;
    var status = _ref3.status;

    var user = _user["default"].getAUser(userId);

    if (user.type === 'client') return {
      error: 'Unauthorized user'
    };

    var account = _dummyData["default"].accounts.find(function (singleAccount) {
      return singleAccount.accountNumber == accountNumber;
    });

    if (!account) return {
      error2: 'No account found'
    };
    account.status = status;
    return account;
  },
  fetchAllAccounts: function fetchAllAccounts(_ref4) {
    var userId = _ref4.userId;

    var user = _user["default"].getAUser(userId);

    if (user.type === 'client') return {
      error: 'Unauthorized user'
    };

    var validAccounts = _dummyData["default"].accounts.map(function (singleAccount) {
      var newAccount = new _account["default"]();
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
  deleteAccount: function deleteAccount(_ref5, _ref6) {
    var userId = _ref5.userId;
    var accountNumber = _ref6.accountNumber;

    var user = _user["default"].getAUser(userId);

    if (user.type === 'client') return {
      error: 'Unauthorized user'
    };

    var accountIndex = _dummyData["default"].accounts.findIndex(function (account) {
      return account.accountNumber == accountNumber;
    });

    if (!accountIndex) return {
      error2: 'No account found'
    };

    _dummyData["default"].accounts.splice(accountIndex, 1);

    var validAccounts = _dummyData["default"].accounts.map(function (account) {
      var newAccount = new _account["default"]();
      newAccount.id = account.id;
      newAccount.name = account.name;
      newAccount.description = account.description;
      newAccount.price = account.price;
      return newAccount;
    });

    return validAccounts;
  },
  getAnAccount: function getAnAccount(accountNumber) {
    var account = _dummyData["default"].accounts.find(function (singleAccount) {
      return singleAccount.accountNumber == accountNumber;
    });

    return account || {};
  }
};
var _default = AccountService;
exports["default"] = _default;
//# sourceMappingURL=account.service.js.map