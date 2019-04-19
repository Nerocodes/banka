"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _transaction = _interopRequireDefault(require("../services/transaction.service"));

var TransactionController = {
  debitAnAccount: function () {
    var _debitAnAccount = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res) {
      var transaction;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _transaction["default"].debitAccount(req, req.params, req.body);

            case 2:
              transaction = _context.sent;

              if (!transaction.error) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", res.json({
                status: 401,
                error: transaction.error
              }).status(401));

            case 5:
              if (!transaction.error1) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.json({
                status: 404,
                error: transaction.error1
              }).status(404));

            case 7:
              if (!transaction.error2) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", res.json({
                status: 400,
                error: transaction.error2
              }).status(400));

            case 9:
              return _context.abrupt("return", res.json({
                status: 200,
                data: transaction
              }).status(200));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function debitAnAccount(_x, _x2) {
      return _debitAnAccount.apply(this, arguments);
    }

    return debitAnAccount;
  }(),
  creditAnAccount: function () {
    var _creditAnAccount = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res) {
      var transaction;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _transaction["default"].creditAccount(req, req.params, req.body);

            case 2:
              transaction = _context2.sent;

              if (!transaction.error) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", res.json({
                status: 401,
                error: transaction.error
              }).status(401));

            case 5:
              if (!transaction.error1) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.json({
                status: 404,
                error: transaction.error1
              }).status(404));

            case 7:
              return _context2.abrupt("return", res.json({
                status: 200,
                data: transaction
              }).status(200));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function creditAnAccount(_x3, _x4) {
      return _creditAnAccount.apply(this, arguments);
    }

    return creditAnAccount;
  }()
};
var _default = TransactionController;
exports["default"] = _default;
//# sourceMappingURL=transaction.controller.js.map