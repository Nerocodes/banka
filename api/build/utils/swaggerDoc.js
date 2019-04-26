"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("./swagger.json"));

var router = (0, _express.Router)();
var options = {
  customCss: ".swagger-ui .topbar {display: none}\n     .swagger-ui .info {margin-top: 1rem}"
};
router.use('/', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"], options));
router.get('/', _swaggerUiExpress["default"].setup(_swagger["default"]));
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=swaggerDoc.js.map