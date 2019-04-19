"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var Transaction = function Transaction() {
  (0, _classCallCheck2["default"])(this, Transaction);
  this.id = null;
  this.createdOn = null;
  this.type = null;
  this.accountNumber = null;
  this.cashier = null;
  this.amount = null;
  this.oldBalance = null;
  this.newBalance = null;
};

var _default = Transaction;
exports["default"] = _default;
//# sourceMappingURL=transaction.model.js.map