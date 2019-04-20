"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _user = _interopRequireDefault(require("./routes/user.route"));

var _account = _interopRequireDefault(require("./routes/account.route"));

var _transaction = _interopRequireDefault(require("./routes/transaction.route"));

// routes
_dotenv["default"].config();

var app = (0, _express["default"])();
var PORT = process.env.PORT || 9000;
app.use(_bodyParser["default"].json());
app.get('/', function (req, res) {
  return res.send('The api is working');
}); // handle routes

app.use('/api/v1/auth', _user["default"]);
app.use('/api/v1/accounts', _account["default"]);
app.use('/api/v1/transactions', _transaction["default"]);
app.listen(PORT, function () {
  // eslint-disable-next-line no-console
  console.log("Server is running on PORT ".concat(PORT));
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=index.js.map