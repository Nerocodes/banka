"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _database = _interopRequireDefault(require("../database"));

var createAllTables = function createAllTables() {
  var sql = "\n  DROP TABLE IF EXISTS Users;\n\n  CREATE TABLE Users(\n    id SERIAL PRIMARY KEY,\n    email VARCHAR UNIQUE NOT NULL,\n    firstName VARCHAR NOT NULL,\n    lastName VARCHAR NOT NULL,\n    password VARCHAR NOT NULL,\n    type VARCHAR NOT NULL,\n    isAdmin BOOLEAN\n  );\n\n  DROP TABLE IF EXISTS Accounts;\n\n  CREATE TABLE Accounts(\n    id SERIAL PRIMARY KEY,\n    accountNumber INT UNIQUE NOT NULL,\n    createdOn TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n    owner INT NOT NULL,\n    type VARCHAR NOT NULL,\n    status VARCHAR NOT NULL,\n    balance FLOAT\n  );\n\n  DROP TABLE IF EXISTS Transactions;\n\n  CREATE TABLE Transactions(\n    id SERIAL PRIMARY KEY,\n    createdOn TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n    type VARCHAR NOT NULL,\n    accountNumber INT NOT NULL,\n    cashier INT NOT NULL,\n    amount FLOAT NOT NULL,\n    oldBalance FLOAT,\n    newBalance FLOAT\n  );\n  ";

  _database["default"].query(sql).then(function () {
    _database["default"].end();
  })["catch"](function () {
    _database["default"].end();
  });
};

createAllTables();
//# sourceMappingURL=createTables.js.map