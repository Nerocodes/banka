"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("../controllers/user.controller"));

var _route = _interopRequireDefault(require("../helpers/route.helper"));

var _token = _interopRequireDefault(require("../controllers/middleware/token.controller"));

var router = (0, _express.Router)();
router.post('/auth/signup', _route["default"].validateBody(_route["default"].schemas.authSchema), _user["default"].addAUser);
router.post('/auth/signin', _route["default"].validateBody(_route["default"].schemas.authLoginSchema), _user["default"].signIn);
router.get('/user/:email/accounts', _token["default"].verify, _user["default"].getUserAccounts);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=user.route.js.map