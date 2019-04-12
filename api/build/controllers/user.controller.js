"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _user = _interopRequireDefault(require("../services/user.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var secret = process.env.SECRET || 'supersecret';
var UserController = {
  fetchAllUsers: function fetchAllUsers(req, res) {
    var allUsers = _user["default"].fetchAllUsers(); // eslint-disable-next-line array-callback-return


    allUsers.map(function (userObj) {
      Object.defineProperty(userObj, 'password', {
        enumerable: false,
        writable: true
      });
    });
    return res.json({
      status: 200,
      data: allUsers
    }).status(200);
  },
  addAUser: function addAUser(req, res) {
    var newUser = req.body;

    if (!newUser.type && !newUser.isAdmin) {
      newUser.type = 'client';
      newUser.isAdmin = false;
    }

    var hashedPassword = _bcryptjs["default"].hashSync(newUser.password, 8);

    newUser.password = hashedPassword;

    var createdUser = _user["default"].addUser(newUser);

    var token = _jsonwebtoken["default"].sign({
      id: createdUser.id
    }, secret, {
      expiresIn: 86400
    });

    createdUser.token = token;
    Object.defineProperty(createdUser, 'password', {
      enumerable: false,
      writable: true
    });
    return res.json({
      status: 201,
      data: createdUser
    }).status(201);
  },
  signIn: function signIn(req, res) {
    var oldUser = req.body;

    var foundUser = _user["default"].signIn(oldUser);

    if (!foundUser.email) {
      return res.json({
        status: 404,
        error: 'no user with this email'
      }).status(404);
    }

    var validPassword = _bcryptjs["default"].compareSync(oldUser.password, foundUser.password);

    if (!validPassword) {
      return res.json({
        status: 401,
        error: 'wrong password'
      }).status(401);
    }

    Object.defineProperty(foundUser, 'password', {
      enumerable: false,
      writable: true
    });

    var token = _jsonwebtoken["default"].sign({
      id: foundUser.id
    }, secret, {
      expiresIn: 86400 // expires in 24 hours

    });

    foundUser.token = token;
    return res.json({
      status: 201,
      data: foundUser
    }).status(201);
  },
  getSingleUser: function getSingleUser(req, res) {
    var id = req.params.id;

    var foundUser = _user["default"].getAUser(id);

    return res.json({
      status: 201,
      data: foundUser
    }).status(200);
  }
};
var _default = UserController;
exports["default"] = _default;
//# sourceMappingURL=user.controller.js.map