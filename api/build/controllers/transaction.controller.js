"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _transaction = _interopRequireDefault(require("../services/transaction.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TransactionController = {
  debitAnAccount: function debitAnAccount(req, res) {
    var transaction = _transaction["default"].debitAccount(req, req.params, req.body);

    if (transaction.error) {
      return res.json({
        status: 401,
        error: transaction.error
      }).status(401);
    }

    if (transaction.error1) {
      return res.json({
        status: 404,
        error: transaction.error1
      }).status(404);
    }

    if (transaction.error2) {
      return res.json({
        status: 400,
        error: transaction.error2
      }).status(400);
    }

    return res.json({
      status: 200,
      data: transaction
    }).status(200);
  },
  creditAnAccount: function creditAnAccount(req, res) {
    var transaction = _transaction["default"].creditAccount(req, req.params, req.body);

    if (transaction.error) {
      return res.json({
        status: 401,
        error: transaction.error
      }).status(401);
    }

    if (transaction.error1) {
      return res.json({
        status: 404,
        error: transaction.error1
      }).status(404);
    }

    return res.json({
      status: 200,
      data: transaction
    }).status(200);
  }
};
var _default = TransactionController;
exports["default"] = _default;
//# sourceMappingURL=transaction.controller.js.map