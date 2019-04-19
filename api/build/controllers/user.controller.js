"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _user = _interopRequireDefault(require("../services/user.service"));

var UserController = {
  // fetchAllUsers(req, res) {
  //   const allUsers = UserService.fetchAllUsers();
  //   // eslint-disable-next-line array-callback-return
  //   allUsers.map((userObj) => {
  //     Object.defineProperty(userObj, 'password', {
  //       enumerable: false,
  //       writable: true,
  //     });
  //   });
  //   return res.json({
  //     status: 200,
  //     data: allUsers,
  //   }).status(200);
  // },
  addAUser: function () {
    var _addAUser = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res) {
      var newUser, hashedPassword, createdUser;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              newUser = req.body;

              if (!newUser.type && !newUser.isAdmin) {
                newUser.type = 'client';
                newUser.isAdmin = false;
              }

              if (newUser.firstName) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.json({
                status: 400,
                error: 'First Name field is required'
              }));

            case 4:
              if (newUser.lastName) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.json({
                status: 400,
                error: 'Last Name field is required'
              }));

            case 6:
              if (newUser.email) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.json({
                status: 400,
                error: 'Email field is required'
              }));

            case 8:
              if (newUser.password) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", res.json({
                status: 400,
                error: 'Password field is required'
              }));

            case 10:
              hashedPassword = _bcryptjs["default"].hashSync(newUser.password, 8);
              newUser.password = hashedPassword;
              _context.next = 14;
              return _user["default"].addUser(newUser);

            case 14:
              createdUser = _context.sent;
              Object.defineProperty(createdUser, 'password', {
                enumerable: false,
                writable: true
              });
              return _context.abrupt("return", res.json({
                status: 201,
                data: createdUser
              }));

            case 17:
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
      var oldUser, foundUser, validPassword;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              oldUser = req.body;

              if (oldUser.email) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", res.json({
                status: 400,
                error: 'Email field is required'
              }));

            case 3:
              if (oldUser.password) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", res.json({
                status: 400,
                error: 'Password field is required'
              }));

            case 5:
              _context2.next = 7;
              return _user["default"].signIn(oldUser);

            case 7:
              foundUser = _context2.sent;

              if (foundUser.email) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", res.json({
                status: 404,
                error: 'no user with this email'
              }).status(404));

            case 10:
              validPassword = _bcryptjs["default"].compareSync(oldUser.password, foundUser.password);

              if (validPassword) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt("return", res.json({
                status: 401,
                error: 'wrong password'
              }).status(401));

            case 13:
              Object.defineProperty(foundUser, 'password', {
                enumerable: false,
                writable: true
              });
              return _context2.abrupt("return", res.json({
                status: 201,
                data: foundUser
              }).status(201));

            case 15:
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