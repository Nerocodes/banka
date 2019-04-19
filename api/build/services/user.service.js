"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _database = _interopRequireDefault(require("../database/database"));

var secret = process.env.SECRET || 'supersecret';
var UserService = {
  addUser: function () {
    var _addUser = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(user) {
      var newUser, sql, client;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              newUser = new _user["default"]();
              newUser = (0, _objectSpread2["default"])({}, user);
              sql = "\n    INSERT INTO Users(\n      firstName,\n      lastName,\n      email,\n      password,\n      type,\n      isAdmin\n      ) \n      VALUES (\n        '".concat(newUser.firstName, "',\n        '").concat(newUser.lastName, "',\n        '").concat(newUser.email, "',\n        '").concat(newUser.password, "',\n        '").concat(newUser.type, "',\n        '").concat(newUser.isAdmin, "'\n        );\n    ");
              _context.next = 5;
              return _database["default"].connect();

            case 5:
              client = _context.sent;
              _context.prev = 6;
              _context.next = 9;
              return client.query(sql);

            case 9:
              return _context.abrupt("return", this.signIn(newUser));

            case 10:
              _context.prev = 10;
              client.release();
              return _context.finish(10);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[6,, 10, 13]]);
    }));

    function addUser(_x) {
      return _addUser.apply(this, arguments);
    }

    return addUser;
  }(),
  signIn: function () {
    var _signIn = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(user) {
      var sql, client, res, _res$rows$, id, firstName, lastName, isAdmin, data, token;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              sql = "\n        SELECT * FROM Users WHERE email='".concat(user.email, "';\n      ");
              _context2.next = 3;
              return _database["default"].connect();

            case 3:
              client = _context2.sent;
              _context2.prev = 4;
              _context2.next = 7;
              return client.query(sql);

            case 7:
              res = _context2.sent;
              _res$rows$ = res.rows[0], id = _res$rows$.id, firstName = _res$rows$.firstname, lastName = _res$rows$.lastname, isAdmin = _res$rows$.isadmin, data = (0, _objectWithoutProperties2["default"])(_res$rows$, ["id", "firstname", "lastname", "isadmin"]);
              token = _jsonwebtoken["default"].sign({
                id: id
              }, secret, {
                expiresIn: 86400 // expires in 24 hours

              });
              return _context2.abrupt("return", {
                token: token,
                id: id,
                firstName: firstName,
                lastName: lastName,
                email: data.email,
                password: data.password,
                type: data.type,
                isAdmin: isAdmin
              });

            case 11:
              _context2.prev = 11;
              client.release();
              return _context2.finish(11);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[4,, 11, 14]]);
    }));

    function signIn(_x2) {
      return _signIn.apply(this, arguments);
    }

    return signIn;
  }(),
  getAUser: function () {
    var _getAUser = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(id) {
      var sql, client, res;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              sql = "\n        SELECT * FROM Users WHERE id='".concat(id, "';\n      ");
              _context3.next = 3;
              return _database["default"].connect();

            case 3:
              client = _context3.sent;
              _context3.prev = 4;
              _context3.next = 7;
              return client.query(sql);

            case 7:
              res = _context3.sent;
              return _context3.abrupt("return", res.rows[0]);

            case 9:
              _context3.prev = 9;
              client.release();
              return _context3.finish(9);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[4,, 9, 12]]);
    }));

    function getAUser(_x3) {
      return _getAUser.apply(this, arguments);
    }

    return getAUser;
  }()
};
var _default = UserService;
exports["default"] = _default;
//# sourceMappingURL=user.service.js.map