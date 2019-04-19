"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _database = _interopRequireDefault(require("../database"));

var createTransactionTable = function createTransactionTable() {
  var sql = "\n  DROP TABLE IF EXISTS Transactions;\n\n  CREATE TABLE Transactions(\n    id SERIAL PRIMARY KEY,\n    createdOn DATE NOT NULL DEFAULT CURRENT_DATE,\n    type VARCHAR NOT NULL,\n    accountNumber INT NOT NULL,\n    cashier INT NOT NULL,\n    amount FLOAT NOT NULL,\n    oldBalance FLOAT,\n    newBalance FLOAT\n  );\n  ";

  _database["default"].query(sql).then(function () {
    _database["default"].end();
  })["catch"](function () {
    _database["default"].end();
  });
};

module.exports = {
  createTransactionTable: createTransactionTable
}; // eslint-disable-next-line import/first

require('make-runnable');
//# sourceMappingURL=transaction.js.map