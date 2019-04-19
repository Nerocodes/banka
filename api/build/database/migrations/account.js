"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _database = _interopRequireDefault(require("../database"));

var createAccountTable = function createAccountTable() {
  var sql = "\n  DROP TABLE IF EXISTS Accounts;\n\n  CREATE TABLE Accounts(\n    id SERIAL PRIMARY KEY,\n    accountNumber INT UNIQUE NOT NULL,\n    createdOn DATE NOT NULL DEFAULT CURRENT_DATE,\n    owner INT NOT NULL,\n    type VARCHAR NOT NULL,\n    status VARCHAR NOT NULL,\n    balance FLOAT\n  );\n  ";

  _database["default"].query(sql).then(function () {
    _database["default"].end();
  })["catch"](function () {
    _database["default"].end();
  });
};

module.exports = {
  createAccountTable: createAccountTable
}; // eslint-disable-next-line import/first

require('make-runnable');
//# sourceMappingURL=account.js.map