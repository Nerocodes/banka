"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _account = _interopRequireDefault(require("../models/account.model"));

var _user = _interopRequireDefault(require("./user.service"));

var _database = _interopRequireDefault(require("../database/database"));

var AccountService = {
  createAccount: function () {
    var _createAccount = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(userId, accountType) {
      var account, user, sql, client, res, newAccNo, sql2, sql3, res3, _res3$rows$, accountNumber, type, openingBalance;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              account = new _account["default"]();
              _context.next = 3;
              return _user["default"].getAUser(userId);

            case 3:
              user = _context.sent;

              if (!(user.type !== 'client')) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", {
                error: 'An account cannot be created for this user'
              });

            case 6:
              sql = "\n        SELECT accountNumber FROM Accounts ORDER BY id DESC LIMIT 1;\n      ";
              _context.next = 9;
              return _database["default"].connect();

            case 9:
              client = _context.sent;
              _context.prev = 10;
              _context.next = 13;
              return client.query(sql);

            case 13:
              res = _context.sent;
              newAccNo = res.rows[0].accountnumber + 1;
              account.accountNumber = newAccNo;
              account.owner = user.id;
              account.type = accountType;
              account.status = 'draft';
              account.balance = 0.00;
              sql2 = "\n      INSERT INTO Accounts(\n        accountNumber,\n        owner,\n        type,\n        status,\n        balance\n        ) \n        VALUES (\n          '".concat(account.accountNumber, "',\n          '").concat(account.owner, "',\n          '").concat(account.type, "',\n          '").concat(account.status, "',\n          '").concat(account.balance, "'\n          );\n    ");
              _context.next = 23;
              return client.query(sql2);

            case 23:
              sql3 = "\n        SELECT * FROM Accounts WHERE accountNumber=".concat(account.accountNumber, "; \n      ");
              _context.next = 26;
              return client.query(sql3);

            case 26:
              res3 = _context.sent;
              _res3$rows$ = res3.rows[0], accountNumber = _res3$rows$.accountnumber, type = _res3$rows$.type, openingBalance = _res3$rows$.balance;
              return _context.abrupt("return", {
                accountNumber: accountNumber,
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email,
                type: type,
                openingBalance: openingBalance
              });

            case 31:
              _context.prev = 31;
              _context.t0 = _context["catch"](10);
              return _context.abrupt("return", {
                error: _context.t0.detail
              });

            case 34:
              _context.prev = 34;
              client.release();
              return _context.finish(34);

            case 37:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[10, 31, 34, 37]]);
    }));

    function createAccount(_x, _x2) {
      return _createAccount.apply(this, arguments);
    }

    return createAccount;
  }(),
  accountStatus: function () {
    var _accountStatus = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(_ref, _ref2, _ref3) {
      var userId, accountNumber, status, user, sql, client, res, account, sql2;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              userId = _ref.userId;
              accountNumber = _ref2.accountNumber;
              status = _ref3.status;
              _context2.next = 5;
              return _user["default"].getAUser(userId);

            case 5:
              user = _context2.sent;

              if (!(user.type === 'client')) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", {
                error: 'Unauthorized user'
              });

            case 8:
              sql = "\n        SELECT * FROM Accounts WHERE accountNumber=".concat(accountNumber, ";\n      ");
              _context2.next = 11;
              return _database["default"].connect();

            case 11:
              client = _context2.sent;
              _context2.prev = 12;
              _context2.next = 15;
              return client.query(sql);

            case 15:
              res = _context2.sent;
              account = res.rows[0];

              if (account) {
                _context2.next = 19;
                break;
              }

              return _context2.abrupt("return", {
                error2: 'No account found'
              });

            case 19:
              sql2 = "\n        UPDATE Accounts SET status = '".concat(status, "' WHERE accountNumber = ").concat(accountNumber, ";\n      ");
              _context2.next = 22;
              return client.query(sql2);

            case 22:
              return _context2.abrupt("return", {
                accountNumber: accountNumber,
                status: status
              });

            case 25:
              _context2.prev = 25;
              _context2.t0 = _context2["catch"](12);
              return _context2.abrupt("return", {
                error: _context2.t0.detail
              });

            case 28:
              _context2.prev = 28;
              client.release();
              return _context2.finish(28);

            case 31:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[12, 25, 28, 31]]);
    }));

    function accountStatus(_x3, _x4, _x5) {
      return _accountStatus.apply(this, arguments);
    }

    return accountStatus;
  }(),
  deleteAccount: function () {
    var _deleteAccount = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(_ref4, _ref5) {
      var userId, accountNumber, user, sql, client, res;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              userId = _ref4.userId;
              accountNumber = _ref5.accountNumber;
              _context3.next = 4;
              return _user["default"].getAUser(userId);

            case 4:
              user = _context3.sent;

              if (!(user.type === 'client')) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", {
                error: 'Unauthorized user'
              });

            case 7:
              sql = "\n        DELETE FROM Accounts WHERE accountNumber='".concat(accountNumber, "';\n      ");
              _context3.next = 10;
              return _database["default"].connect();

            case 10:
              client = _context3.sent;
              _context3.prev = 11;
              _context3.next = 14;
              return client.query(sql);

            case 14:
              res = _context3.sent;

              if (!(res.rowCount < 1)) {
                _context3.next = 17;
                break;
              }

              return _context3.abrupt("return", {
                error2: 'No account found'
              });

            case 17:
              return _context3.abrupt("return", {
                deleted: 'Account successfully deleted'
              });

            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3["catch"](11);
              return _context3.abrupt("return", {
                error: _context3.t0.detail
              });

            case 23:
              _context3.prev = 23;
              client.release();
              return _context3.finish(23);

            case 26:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[11, 20, 23, 26]]);
    }));

    function deleteAccount(_x6, _x7) {
      return _deleteAccount.apply(this, arguments);
    }

    return deleteAccount;
  }(),
  transactionHistory: function () {
    var _transactionHistory = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(_ref6) {
      var accountNumber, sql, client, res, history;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              accountNumber = _ref6.accountNumber;
              sql = "\n    SELECT * FROM Transactions WHERE accountNumber='".concat(accountNumber, "' ORDER BY createdOn DESC;\n    ");
              _context4.next = 4;
              return _database["default"].connect();

            case 4:
              client = _context4.sent;
              _context4.prev = 5;
              _context4.next = 8;
              return client.query(sql);

            case 8:
              res = _context4.sent;

              if (!(res.rowCount < 1)) {
                _context4.next = 11;
                break;
              }

              return _context4.abrupt("return", {
                error1: 'No transaction history'
              });

            case 11:
              history = [];
              res.rows.map(function (transaction) {
                var transactionId = transaction.id,
                    createdOn = transaction.createdon,
                    type = transaction.type,
                    amount = transaction.amount,
                    oldBalance = transaction.oldbalance,
                    newBalance = transaction.newbalance;
                var transactionRes = {
                  transactionId: transactionId,
                  createdOn: createdOn,
                  type: type,
                  accountNumber: accountNumber,
                  amount: amount,
                  oldBalance: oldBalance,
                  newBalance: newBalance
                };
                return history.push(transactionRes);
              });
              return _context4.abrupt("return", history);

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](5);
              return _context4.abrupt("return", {
                error: _context4.t0.detail
              });

            case 19:
              _context4.prev = 19;
              client.release();
              return _context4.finish(19);

            case 22:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[5, 16, 19, 22]]);
    }));

    function transactionHistory(_x8) {
      return _transactionHistory.apply(this, arguments);
    }

    return transactionHistory;
  }(),
  getSingleAccount: function () {
    var _getSingleAccount = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5(_ref7) {
      var accountNumber, sql, client, res, _res$rows$, createdOn, userId, type, status, balance, user;

      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              accountNumber = _ref7.accountNumber;
              sql = "\n        SELECT * FROM Accounts WHERE accountNumber=".concat(accountNumber, ";\n      ");
              _context5.next = 4;
              return _database["default"].connect();

            case 4:
              client = _context5.sent;
              _context5.prev = 5;
              _context5.next = 8;
              return client.query(sql);

            case 8:
              res = _context5.sent;

              if (!(res.rowCount < 1)) {
                _context5.next = 11;
                break;
              }

              return _context5.abrupt("return", {
                error: 'No account with this account number'
              });

            case 11:
              _res$rows$ = res.rows[0], createdOn = _res$rows$.createdon, userId = _res$rows$.owner, type = _res$rows$.type, status = _res$rows$.status, balance = _res$rows$.balance;
              _context5.next = 14;
              return _user["default"].getAUser(userId);

            case 14:
              user = _context5.sent;
              return _context5.abrupt("return", {
                createdOn: createdOn,
                accountNumber: accountNumber,
                ownerEmail: user.email,
                type: type,
                status: status,
                balance: balance
              });

            case 18:
              _context5.prev = 18;
              _context5.t0 = _context5["catch"](5);
              return _context5.abrupt("return", {
                error: _context5.t0.detail
              });

            case 21:
              _context5.prev = 21;
              client.release();
              return _context5.finish(21);

            case 24:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[5, 18, 21, 24]]);
    }));

    function getSingleAccount(_x9) {
      return _getSingleAccount.apply(this, arguments);
    }

    return getSingleAccount;
  }(),
  getAllAccounts: function () {
    var _getAllAccounts = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7(_ref8) {
      var userId, query, staff, sql, client, res, accounts, accountsPromise;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              userId = _ref8.userId, query = _ref8.query;
              _context7.next = 3;
              return _user["default"].getAUser(userId);

            case 3:
              staff = _context7.sent;

              if (!(staff.type === 'client')) {
                _context7.next = 6;
                break;
              }

              return _context7.abrupt("return", {
                error: 'Unauthorized user'
              });

            case 6:
              sql = '';

              if (query.status) {
                sql = "\n        SELECT * FROM Accounts Where status='".concat(query.status, "';\n      ");
              } else {
                sql = "\n        SELECT * FROM Accounts;\n      ";
              }

              _context7.next = 10;
              return _database["default"].connect();

            case 10:
              client = _context7.sent;
              _context7.prev = 11;
              _context7.next = 14;
              return client.query(sql);

            case 14:
              res = _context7.sent;
              accounts = [];
              accountsPromise = res.rows.map(
              /*#__PURE__*/
              function () {
                var _ref9 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee6(account) {
                  var createdOn, id, type, accountNumber, status, balance, user;
                  return _regenerator["default"].wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          createdOn = account.createdon, id = account.owner, type = account.type, accountNumber = account.accountnumber, status = account.status, balance = account.balance;
                          _context6.next = 3;
                          return _user["default"].getAUser(id);

                        case 3:
                          user = _context6.sent;
                          return _context6.abrupt("return", accounts.push({
                            createdOn: createdOn,
                            accountNumber: accountNumber,
                            ownerEmail: user.email,
                            type: type,
                            status: status,
                            balance: balance
                          }));

                        case 5:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                }));

                return function (_x11) {
                  return _ref9.apply(this, arguments);
                };
              }());
              _context7.next = 19;
              return Promise.all(accountsPromise);

            case 19:
              return _context7.abrupt("return", accounts);

            case 22:
              _context7.prev = 22;
              _context7.t0 = _context7["catch"](11);
              return _context7.abrupt("return", {
                error: _context7.t0.detail
              });

            case 25:
              _context7.prev = 25;
              client.release();
              return _context7.finish(25);

            case 28:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[11, 22, 25, 28]]);
    }));

    function getAllAccounts(_x10) {
      return _getAllAccounts.apply(this, arguments);
    }

    return getAllAccounts;
  }()
};
var _default = AccountService;
exports["default"] = _default;
//# sourceMappingURL=account.service.js.map