"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _account = _interopRequireDefault(require("../services/account.service"));

var AccountController = {
  createAnAccount: function () {
    var _createAnAccount = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res) {
      var createdAccount;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _account["default"].createAccount(req.userId, req.body.type);

            case 2:
              createdAccount = _context.sent;

              if (!createdAccount.error) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", res.json({
                status: 401,
                error: createdAccount.error
              }));

            case 5:
              if (!createdAccount.error2) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.json({
                status: 400,
                error: createdAccount.error2
              }));

            case 7:
              return _context.abrupt("return", res.json({
                status: 201,
                data: createdAccount
              }));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function createAnAccount(_x, _x2) {
      return _createAnAccount.apply(this, arguments);
    }

    return createAnAccount;
  }(),
  accountStatus: function () {
    var _accountStatus = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res) {
      var modifiedAccount;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _account["default"].accountStatus(req, req.params, req.body);

            case 2:
              modifiedAccount = _context2.sent;

              if (!modifiedAccount.error) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", res.json({
                status: 401,
                error: modifiedAccount.error
              }));

            case 5:
              if (!modifiedAccount.error2) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.json({
                status: 404,
                error: modifiedAccount.error2
              }));

            case 7:
              return _context2.abrupt("return", res.json({
                status: 200,
                data: modifiedAccount
              }));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function accountStatus(_x3, _x4) {
      return _accountStatus.apply(this, arguments);
    }

    return accountStatus;
  }(),
  deleteAnAccount: function () {
    var _deleteAnAccount = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res) {
      var deleteAccount;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _account["default"].deleteAccount(req, req.params);

            case 2:
              deleteAccount = _context3.sent;

              if (!deleteAccount.error) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", res.json({
                status: 403,
                error: deleteAccount.error
              }));

            case 5:
              if (!deleteAccount.error2) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", res.json({
                status: 400,
                error: deleteAccount.error2
              }));

            case 7:
              return _context3.abrupt("return", res.json({
                status: 200,
                message: 'Account successfully deleted'
              }));

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function deleteAnAccount(_x5, _x6) {
      return _deleteAnAccount.apply(this, arguments);
    }

    return deleteAnAccount;
  }()
};
var _default = AccountController;
exports["default"] = _default;
//# sourceMappingURL=account.controller.js.map