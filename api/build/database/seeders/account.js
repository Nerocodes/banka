"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _database = _interopRequireDefault(require("../database"));

var insertAccountTable = function insertAccountTable() {
  var sql = "\n  TRUNCATE Accounts;\n\n  INSERT INTO Accounts(\n    accountNumber,\n    createdOn,\n    owner,\n    type,\n    status,\n    balance\n    ) \n    VALUES (\n      23402001,\n      '04/08/2019',\n      '1',\n      'savings',\n      'active',\n      '250000'\n      ),\n      (\n        23402002,\n        '09/03/2019',\n        '2',\n        'savings',\n        'dormant',\n        '50000'\n      ),\n      (\n        23402003,\n        '01/09/2019',\n        '1',\n        'current',\n        'dormant',\n        '20000'\n      );\n  ";

  _database["default"].query(sql).then(function () {
    _database["default"].end();
  })["catch"](function () {
    _database["default"].end();
  });
};

module.exports = {
  insertAccountTable: insertAccountTable
}; // eslint-disable-next-line import/first

require('make-runnable');
//# sourceMappingURL=account.js.map