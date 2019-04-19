"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var DATABASE_URL;

if (process.env.NODE_ENV === 'DEV') {
  DATABASE_URL = process.env.DEVPG;
} else if (process.env.NODE_ENV === 'PROD') {
  DATABASE_URL = process.env.MAINPG;
} else {
  DATABASE_URL = process.env.TESTPG;
}

var pool = new _pg.Pool({
  connectionString: DATABASE_URL
});
pool.on('connect', function () {});
var _default = pool;
exports["default"] = _default;
//# sourceMappingURL=database.js.map