"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _transaction = _interopRequireDefault(require("../models/transaction.model"));

var _user = _interopRequireDefault(require("./user.service"));

var _database = _interopRequireDefault(require("../database/database"));

/* eslint-disable eqeqeq */
var TransactionService = {
  debitAccount: function () {
    var _debitAccount = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(_ref, _ref2, _ref3) {
      var userId, accountNumber, amount, user, transaction, sql, client, res, account, sql2, sql3, sql4, res4, _res4$rows$, transactionId, cashier, transactionType, accountBalance;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userId = _ref.userId;
              accountNumber = _ref2.accountNumber;
              amount = _ref3.amount;
              _context.next = 5;
              return _user["default"].getAUser(userId);

            case 5:
              user = _context.sent;

              if (!(user.type !== 'staff' || user.isAdmin == true)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", {
                error: 'Unauthorized user'
              });

            case 8:
              transaction = new _transaction["default"]();
              sql = "\n        SELECT * FROM Accounts WHERE accountNumber=".concat(accountNumber, ";\n      ");
              _context.next = 12;
              return _database["default"].connect();

            case 12:
              client = _context.sent;
              _context.prev = 13;
              _context.next = 16;
              return client.query(sql);

            case 16:
              res = _context.sent;

              if (!(res.rowCount < 1)) {
                _context.next = 19;
                break;
              }

              return _context.abrupt("return", {
                error1: 'Account number does not match our records'
              });

            case 19:
              account = res.rows[0];
              transaction.type = 'debit';
              transaction.accountNumber = account.accountnumber;
              transaction.cashier = user.id;
              transaction.amount = amount;
              transaction.oldBalance = account.balance;

              if (!(account.balance - amount < 0)) {
                _context.next = 27;
                break;
              }

              return _context.abrupt("return", {
                error2: 'Transaction declined: Insufficient funds'
              });

            case 27:
              transaction.newBalance = account.balance - amount;
              account.balance = transaction.newBalance;
              sql2 = "\n      INSERT INTO Transactions(\n        type,\n        accountNumber,\n        cashier,\n        amount,\n        oldBalance,\n        newBalance\n        ) \n        VALUES (\n          '".concat(transaction.type, "',\n          '").concat(transaction.accountNumber, "',\n          '").concat(transaction.cashier, "',\n          '").concat(transaction.amount, "',\n          '").concat(transaction.oldBalance, "',\n          '").concat(transaction.newBalance, "'\n          );\n    ");
              _context.next = 32;
              return client.query(sql2);

            case 32:
              // update account balance
              sql3 = "\n        UPDATE Accounts SET balance = '".concat(transaction.newBalance, "' WHERE accountNumber = ").concat(accountNumber, ";\n      ");
              _context.next = 35;
              return client.query(sql3);

            case 35:
              sql4 = "\n        SELECT * FROM Transactions ORDER BY id DESC LIMIT 1; \n      ";
              _context.next = 38;
              return client.query(sql4);

            case 38:
              res4 = _context.sent;
              _res4$rows$ = res4.rows[0], transactionId = _res4$rows$.id, cashier = _res4$rows$.cashier, transactionType = _res4$rows$.type, accountBalance = _res4$rows$.newbalance;
              return _context.abrupt("return", {
                transactionId: transactionId,
                accountNumber: accountNumber,
                amount: amount,
                cashier: cashier,
                transactionType: transactionType,
                accountBalance: accountBalance
              });

            case 43:
              _context.prev = 43;
              _context.t0 = _context["catch"](13);
              return _context.abrupt("return", {
                error: _context.t0.detail
              });

            case 46:
              _context.prev = 46;
              client.release();
              return _context.finish(46);

            case 49:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[13, 43, 46, 49]]);
    }));

    function debitAccount(_x, _x2, _x3) {
      return _debitAccount.apply(this, arguments);
    }

    return debitAccount;
  }(),
  creditAccount: function () {
    var _creditAccount = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(_ref4, _ref5, _ref6) {
      var userId, accountNumber, amount, user, transaction, sql, client, res, account, sql2, sql3, sql4, res4, _res4$rows$2, transactionId, cashier, transactionType, accountBalance;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              userId = _ref4.userId;
              accountNumber = _ref5.accountNumber;
              amount = _ref6.amount;
              _context2.next = 5;
              return _user["default"].getAUser(userId);

            case 5:
              user = _context2.sent;

              if (!(user.type !== 'staff' || user.isAdmin == true)) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", {
                error: 'Unauthorized user'
              });

            case 8:
              transaction = new _transaction["default"]();
              sql = "\n        SELECT * FROM Accounts WHERE accountNumber=".concat(accountNumber, ";\n      ");
              _context2.next = 12;
              return _database["default"].connect();

            case 12:
              client = _context2.sent;
              _context2.prev = 13;
              _context2.next = 16;
              return client.query(sql);

            case 16:
              res = _context2.sent;

              if (!(res.rowCount < 1)) {
                _context2.next = 19;
                break;
              }

              return _context2.abrupt("return", {
                error1: 'Account number does not match our records'
              });

            case 19:
              account = res.rows[0];
              transaction.type = 'credit';
              transaction.accountNumber = account.accountnumber;
              transaction.cashier = user.id;
              transaction.amount = amount;
              transaction.oldBalance = account.balance;
              transaction.newBalance = account.balance + amount;
              account.balance = transaction.newBalance;
              sql2 = "\n      INSERT INTO Transactions(\n        type,\n        accountNumber,\n        cashier,\n        amount,\n        oldBalance,\n        newBalance\n        ) \n        VALUES (\n          '".concat(transaction.type, "',\n          '").concat(transaction.accountNumber, "',\n          '").concat(transaction.cashier, "',\n          '").concat(transaction.amount, "',\n          '").concat(transaction.oldBalance, "',\n          '").concat(transaction.newBalance, "'\n          );\n    ");
              _context2.next = 30;
              return client.query(sql2);

            case 30:
              // update account balance
              sql3 = "\n        UPDATE Accounts SET balance = '".concat(transaction.newBalance, "' WHERE accountNumber = ").concat(accountNumber, ";\n      ");
              _context2.next = 33;
              return client.query(sql3);

            case 33:
              sql4 = "\n        SELECT * FROM Transactions ORDER BY id DESC LIMIT 1; \n      ";
              _context2.next = 36;
              return client.query(sql4);

            case 36:
              res4 = _context2.sent;
              _res4$rows$2 = res4.rows[0], transactionId = _res4$rows$2.id, cashier = _res4$rows$2.cashier, transactionType = _res4$rows$2.type, accountBalance = _res4$rows$2.newbalance;
              return _context2.abrupt("return", {
                transactionId: transactionId,
                accountNumber: accountNumber,
                amount: amount,
                cashier: cashier,
                transactionType: transactionType,
                accountBalance: accountBalance
              });

            case 41:
              _context2.prev = 41;
              _context2.t0 = _context2["catch"](13);
              return _context2.abrupt("return", {
                error: _context2.t0.detail
              });

            case 44:
              _context2.prev = 44;
              client.release();
              return _context2.finish(44);

            case 47:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[13, 41, 44, 47]]);
    }));

    function creditAccount(_x4, _x5, _x6) {
      return _creditAccount.apply(this, arguments);
    }

    return creditAccount;
  }(),
  getATransaction: function () {
    var _getATransaction = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(_ref7) {
      var transactionId, sql, client, res, _res$rows$, createdOn, type, accountNumber, amount, oldBalance, newBalance;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              transactionId = _ref7.transactionId;
              sql = "\n        SELECT * FROM Transactions WHERE id='".concat(transactionId, "';\n      ");
              _context3.next = 4;
              return _database["default"].connect();

            case 4:
              client = _context3.sent;
              _context3.prev = 5;
              _context3.next = 8;
              return client.query(sql);

            case 8:
              res = _context3.sent;

              if (!(res.rowCount < 1)) {
                _context3.next = 11;
                break;
              }

              return _context3.abrupt("return", {
                error: 'No transaction with this id'
              });

            case 11:
              _res$rows$ = res.rows[0], createdOn = _res$rows$.createdon, type = _res$rows$.type, accountNumber = _res$rows$.accountnumber, amount = _res$rows$.amount, oldBalance = _res$rows$.oldbalance, newBalance = _res$rows$.newbalance;
              return _context3.abrupt("return", {
                transactionId: transactionId,
                createdOn: createdOn,
                type: type,
                accountNumber: accountNumber,
                amount: amount,
                oldBalance: oldBalance,
                newBalance: newBalance
              });

            case 15:
              _context3.prev = 15;
              _context3.t0 = _context3["catch"](5);
              return _context3.abrupt("return", {
                error: _context3.t0.detail
              });

            case 18:
              _context3.prev = 18;
              client.release();
              return _context3.finish(18);

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[5, 15, 18, 21]]);
    }));

    function getATransaction(_x7) {
      return _getATransaction.apply(this, arguments);
    }

    return getATransaction;
  }()
};
var _default = TransactionService;
exports["default"] = _default;
//# sourceMappingURL=transaction.service.js.map