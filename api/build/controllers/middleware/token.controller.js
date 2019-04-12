"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var secret = process.env.SECRET || 'supersecret';
var verifyToken = {
  // eslint-disable-next-line consistent-return
  verify: function verify(req, res, next) {
    var token = req.headers['x-access-token'];

    if (!token) {
      return res.json({
        status: 403,
        error: 'No token provided.'
      });
    }

    _jsonwebtoken["default"].verify(token, secret, function (err, decoded) {
      if (err) {
        return res.json({
          status: 500,
          error: 'Failed to authenticate token.'
        });
      } // if everything good, save to request for use in other routes


      req.userId = decoded.id;
      return next();
    });
  }
};
var _default = verifyToken;
exports["default"] = _default;
//# sourceMappingURL=token.controller.js.map