"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _database = _interopRequireDefault(require("../database"));

var insertAllTables = function insertAllTables() {
  var sql = "\n  TRUNCATE Users;\n\n  INSERT INTO Users(\n    firstName,\n    lastName,\n    email,\n    password,\n    type,\n    isAdmin\n    ) \n    VALUES (\n      'Nero',\n      'Paul',\n      'neropaulej@gmail.com',\n      '$2y$12$n6jFL050ZsssDIGQpHeN2uWHRae.9TiSeUdf8RoTwSO1zBjhFry4C',\n      'client',\n      'false'\n      ),\n      (\n        'Yetunde',\n        'George',\n        'yetundegeorge@gmail.com',\n        '$2y$12$n6jFL050ZsssDIGQpHeN2uWHRae.9TiSeUdf8RoTwSO1zBjhFry4C',\n        'staff',\n        'false'\n      ),\n      (\n        'Yoshi',\n        'Yama',\n        'yoshiyama@gmail.com',\n        '$2y$12$n6jFL050ZsssDIGQpHeN2uWHRae.9TiSeUdf8RoTwSO1zBjhFry4C',\n        'staff',\n        'true'\n      );\n\n      TRUNCATE Accounts;\n\n  INSERT INTO Accounts(\n    accountNumber,\n    createdOn,\n    owner,\n    type,\n    status,\n    balance\n    ) \n    VALUES (\n      23402001,\n      '04/08/2019',\n      '1',\n      'savings',\n      'active',\n      '250000'\n      ),\n      (\n        23402002,\n        '09/03/2019',\n        '2',\n        'savings',\n        'dormant',\n        '50000'\n      ),\n      (\n        23402003,\n        '01/09/2019',\n        '1',\n        'current',\n        'dormant',\n        '20000'\n      );\n\n      TRUNCATE Transactions;\n\n  INSERT INTO Transactions(\n    createdOn,\n    type,\n    accountNumber,\n    cashier,\n    amount,\n    oldBalance,\n    newBalance\n    ) \n    VALUES (\n      '04/08/2019',\n      'credit',\n      23402001,\n      '2',\n      '50000',\n      '200000',\n      '250000'\n      ),\n      (\n        '02/03/2019',\n        'debit',\n        23402002,\n        '2',\n        '50000',\n        '200000',\n        '150000'\n      ),\n      (\n        '09/09/2019',\n        'credit',\n        23402001,\n        '2',\n        '50000',\n        '250000',\n        '270000'\n      );\n  ";

  _database["default"].query(sql).then(function () {
    _database["default"].end();
  })["catch"](function () {
    _database["default"].end();
  });
};

module.exports = {
  insertAllTables: insertAllTables
}; // eslint-disable-next-line import/first

require('make-runnable');
//# sourceMappingURL=insertTableData.js.map