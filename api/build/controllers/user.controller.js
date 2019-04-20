"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../services/user.service"));

var UserController = {
  addAUser: function () {
    var _addAUser = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res) {
      var newUser, createdUser;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              newUser = req.body;

              if (!newUser.type && !newUser.isAdmin) {
                newUser.type = 'client';
                newUser.isAdmin = false;
              }

              _context.next = 4;
              return _user["default"].addUser(newUser);

            case 4:
              createdUser = _context.sent;

              if (!createdUser.error) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.json({
                status: 400,
                data: createdUser.error
              }));

            case 7:
              return _context.abrupt("return", res.json({
                status: 201,
                data: createdUser
              }));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function addAUser(_x, _x2) {
      return _addAUser.apply(this, arguments);
    }

    return addAUser;
  }(),
  signIn: function () {
    var _signIn = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res) {
      var oldUser, foundUser;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              oldUser = req.body;
              _context2.next = 3;
              return _user["default"].signIn(oldUser);

            case 3:
              foundUser = _context2.sent;

              if (foundUser.email) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", res.json({
                status: 404,
                error: 'no user with this email'
              }));

            case 6:
              if (foundUser.error) {
                res.json({
                  status: 400,
                  error: 'wrong password'
                });
              }

              return _context2.abrupt("return", res.json({
                status: 201,
                data: foundUser
              }));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function signIn(_x3, _x4) {
      return _signIn.apply(this, arguments);
    }

    return signIn;
  }()
};
var _default = UserController;
exports["default"] = _default;
//# sourceMappingURL=user.controller.js.map