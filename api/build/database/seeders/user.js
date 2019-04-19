"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _database = _interopRequireDefault(require("../database"));

var insertUserTable = function insertUserTable() {
  var sql = "\n  TRUNCATE Users;\n\n  INSERT INTO Users(\n    firstName,\n    lastName,\n    email,\n    password,\n    type,\n    isAdmin\n    ) \n    VALUES (\n      'Nero',\n      'Paul',\n      'neropaulej@gmail.com',\n      '$2y$12$n6jFL050ZsssDIGQpHeN2uWHRae.9TiSeUdf8RoTwSO1zBjhFry4C',\n      'client',\n      'false'\n      ),\n      (\n        'Yetunde',\n        'George',\n        'yetundegeorge@gmail.com',\n        '$2y$12$n6jFL050ZsssDIGQpHeN2uWHRae.9TiSeUdf8RoTwSO1zBjhFry4C',\n        'staff',\n        'false'\n      ),\n      (\n        'Yoshi',\n        'Yama',\n        'yoshiyama@gmail.com',\n        '$2y$12$n6jFL050ZsssDIGQpHeN2uWHRae.9TiSeUdf8RoTwSO1zBjhFry4C',\n        'staff',\n        'true'\n      );\n  ";

  _database["default"].query(sql).then(function () {
    _database["default"].end();
  })["catch"](function () {
    _database["default"].end();
  });
};

module.exports = {
  insertUserTable: insertUserTable
}; // eslint-disable-next-line import/first

require('make-runnable');
//# sourceMappingURL=user.js.map