"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var routeHelper = {
  validateBody: function validateBody(schema) {
    return function (req, res, next) {
      var result = _joi["default"].validate(req.body, schema);

      if (result.error) {
        return res.json({
          status: 400,
          error: result.error.details[0].message
        }).status(400);
      }

      req.body = result.value;
      return next();
    };
  },
  schemas: {
    authSchema: _joi["default"].object().keys({
      email: _joi["default"].string().email().required().error(function () {
        return {
          message: 'A valid email address is required'
        };
      }),
      firstName: _joi["default"].string().required().error(function () {
        return {
          message: 'First Name is required'
        };
      }),
      lastName: _joi["default"].string().required().error(function () {
        return {
          message: 'Last Name is required'
        };
      }),
      password: _joi["default"].string().required().error(function () {
        return {
          message: 'Password is required'
        };
      }),
      type: _joi["default"].string(),
      isAdmin: _joi["default"]["boolean"]()
    }),
    authLoginSchema: _joi["default"].object().keys({
      email: _joi["default"].string().email().required().error(function () {
        return {
          message: 'A valid email address is required'
        };
      }),
      password: _joi["default"].string().required().error(function () {
        return {
          message: 'Password is required'
        };
      })
    }),
    createAccountSchema: _joi["default"].object().keys({
      type: _joi["default"].string().required().valid(['savings', 'current']).error(function () {
        return {
          message: 'Account type must be savings or current and is required'
        };
      })
    }),
    accountStatusSchema: _joi["default"].object().keys({
      status: _joi["default"].string().required().valid(['active', 'dormant']).error(function () {
        return {
          message: 'Status must be active or dormant and is required'
        };
      })
    }),
    debitCreditSchema: _joi["default"].object().keys({
      amount: _joi["default"].number().required().error(function () {
        return {
          message: 'Amount must be a number and is required'
        };
      })
    })
  }
};
var _default = routeHelper;
exports["default"] = _default;
//# sourceMappingURL=route.helper.js.map