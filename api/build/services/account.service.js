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
      var account, user, sql, client, res, rowNum, lastAccNo, newAccNo, sql2, sql3, res3, _res3$rows$, accountNumber, type, openingBalance;

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
              sql = "\n        SELECT accountNumber FROM Accounts;\n      ";
              _context.next = 9;
              return _database["default"].connect();

            case 9:
              client = _context.sent;
              _context.prev = 10;
              _context.next = 13;
              return client.query(sql);

            case 13:
              res = _context.sent;
              rowNum = res.rowCount;
              lastAccNo = res.rows[rowNum - 1];
              newAccNo = lastAccNo.accountnumber + 1;
              account.accountNumber = newAccNo;
              account.owner = user.id;
              account.type = accountType;
              account.status = 'draft';
              account.balance = 0.00;
              sql2 = "\n      INSERT INTO Accounts(\n        accountNumber,\n        owner,\n        type,\n        status,\n        balance\n        ) \n        VALUES (\n          '".concat(account.accountNumber, "',\n          '").concat(account.owner, "',\n          '").concat(account.type, "',\n          '").concat(account.status, "',\n          '").concat(account.balance, "'\n          );\n    ");
              _context.next = 25;
              return client.query(sql2);

            case 25:
              sql3 = "\n        SELECT * FROM Accounts WHERE accountNumber=".concat(account.accountNumber, "; \n      ");
              _context.next = 28;
              return client.query(sql3);

            case 28:
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
              client.release();
              return _context.finish(31);

            case 34:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[10,, 31, 34]]);
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

            case 23:
              _context2.prev = 23;
              client.release();
              return _context2.finish(23);

            case 26:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[12,, 23, 26]]);
    }));

    function accountStatus(_x3, _x4, _x5) {
      return _accountStatus.apply(this, arguments);
    }

    return accountStatus;
  }(),
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

            case 18:
              _context3.prev = 18;
              client.release();
              return _context3.finish(18);

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[11,, 18, 21]]);
    }));

    function deleteAccount(_x6, _x7) {
      return _deleteAccount.apply(this, arguments);
    }

    return deleteAccount;
  }()
};
var _default = AccountService;
exports["default"] = _default;
//# sourceMappingURL=account.service.js.map