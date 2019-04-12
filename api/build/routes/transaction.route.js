"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _transaction = _interopRequireDefault(require("../controllers/transaction.controller"));

var _route = _interopRequireDefault(require("../helpers/route.helper"));

var _token = _interopRequireDefault(require("../controllers/middleware/token.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/:accountNumber/debit', _token["default"].verify, _route["default"].validateBody(_route["default"].schemas.debitCreditSchema), _transaction["default"].debitAnAccount);
router.post('/:accountNumber/credit', _token["default"].verify, _route["default"].validateBody(_route["default"].schemas.debitCreditSchema), _transaction["default"].creditAnAccount);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=transaction.route.js.map