"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _database = _interopRequireDefault(require("../database"));

var createUserTable = function createUserTable() {
  var sql = "\n  DROP TABLE IF EXISTS Users;\n\n  CREATE TABLE Users(\n    id SERIAL PRIMARY KEY,\n    email VARCHAR UNIQUE NOT NULL,\n    firstName VARCHAR NOT NULL,\n    lastName VARCHAR NOT NULL,\n    password VARCHAR NOT NULL,\n    type VARCHAR NOT NULL,\n    isAdmin BOOLEAN\n  );\n  ";

  _database["default"].query(sql).then(function () {
    _database["default"].end();
  })["catch"](function () {
    _database["default"].end();
  });
};

module.exports = {
  createUserTable: createUserTable
}; // eslint-disable-next-line import/first

require('make-runnable');
//# sourceMappingURL=user.js.map