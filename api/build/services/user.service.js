"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dummyData = _interopRequireDefault(require("../utils/dummyData"));

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable eqeqeq */

/* eslint no-param-reassign: ["error", { "props": false }] */
var UserService = {
  fetchAllUsers: function fetchAllUsers() {
    var validUsers = _dummyData["default"].users.map(function (user) {
      var newUser = new _user["default"]();
      newUser.id = user.id;
      newUser.email = user.email;
      newUser.firstName = user.firstName;
      newUser.lastName = user.lastName;
      newUser.password = user.password;
      newUser.type = user.type;
      newUser.isAdmin = user.isAdmin;
      return newUser;
    });

    return validUsers;
  },
  addUser: function addUser(user) {
    var userLength = _dummyData["default"].users.length;
    var lastId = _dummyData["default"].users[userLength - 1].id;
    var newId = lastId + 1;
    user.id = newId;

    _dummyData["default"].users.push(user);

    return user;
  },
  signIn: function signIn(user) {
    var foundUser = _dummyData["default"].users.find(function (singleUser) {
      return singleUser.email == user.email;
    });

    return foundUser || {};
  },
  getAUser: function getAUser(id) {
    var user = _dummyData["default"].users.find(function (singleUser) {
      return singleUser.id == id;
    });

    return user || {};
  }
};
var _default = UserService;
exports["default"] = _default;
//# sourceMappingURL=user.service.js.map