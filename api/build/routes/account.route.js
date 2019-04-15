"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _account = _interopRequireDefault(require("../controllers/account.controller"));

var _route = _interopRequireDefault(require("../helpers/route.helper"));

var _token = _interopRequireDefault(require("../controllers/middleware/token.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/', _token["default"].verify, _route["default"].validateBody(_route["default"].schemas.createAccountSchema), _account["default"].createAnAccount);
router.patch('/:accountNumber', _token["default"].verify, _route["default"].validateBody(_route["default"].schemas.accountStatusSchema), _account["default"].accountStatus);
router["delete"]('/:accountNumber', _token["default"].verify, _account["default"].deleteAnAccount);
router.get('/', _token["default"].verify, _account["default"].fetchAllAccounts);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=account.route.js.map