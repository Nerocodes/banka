"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routeHelper = {
  validateBody: function validateBody(schema) {
    return function (req, res, next) {
      var result = _joi["default"].validate(req.body, schema);

      if (result.error) {
        return res.json({
          status: 400,
          error: result.error
        }).status(400);
      }

      req.body = result.value;
      return next();
    };
  },
  schemas: {
    authSchema: _joi["default"].object().keys({
      email: _joi["default"].string().email().required(),
      firstName: _joi["default"].string().required(),
      lastName: _joi["default"].string().required(),
      password: _joi["default"].string().required(),
      type: _joi["default"].string(),
      isAdmin: _joi["default"]["boolean"]()
    }),
    authLoginSchema: _joi["default"].object().keys({
      email: _joi["default"].string().email().required(),
      password: _joi["default"].string().required()
    }),
    createAccountSchema: _joi["default"].object().keys({
      type: _joi["default"].string().required()
    }),
    accountStatusSchema: _joi["default"].object().keys({
      status: _joi["default"].string().required()
    }),
    debitCreditSchema: _joi["default"].object().keys({
      amount: _joi["default"].number().required()
    })
  }
};
var _default = routeHelper;
exports["default"] = _default;
//# sourceMappingURL=route.helper.js.map