"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _database = _interopRequireDefault(require("../database"));

var insertTransactionTable = function insertTransactionTable() {
  var sql = "\n  TRUNCATE Transactions;\n\n  INSERT INTO Transactions(\n    createdOn,\n    type,\n    accountNumber,\n    cashier,\n    amount,\n    oldBalance,\n    newBalance\n    ) \n    VALUES (\n      '04/08/2019',\n      'credit',\n      23402001,\n      '2',\n      '50000',\n      '200000',\n      '250000'\n      ),\n      (\n        '02/03/2019',\n        'debit',\n        23402002,\n        '2',\n        '50000',\n        '200000',\n        '150000'\n      ),\n      (\n        '09/09/2019',\n        'credit',\n        23402001,\n        '2',\n        '50000',\n        '250000',\n        '270000'\n      );\n  ";

  _database["default"].query(sql).then(function () {
    _database["default"].end();
  })["catch"](function () {
    _database["default"].end();
  });
};

module.exports = {
  insertTransactionTable: insertTransactionTable
}; // eslint-disable-next-line import/first

require('make-runnable');
//# sourceMappingURL=transaction.js.map