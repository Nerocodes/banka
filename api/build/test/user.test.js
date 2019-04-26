"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireDefault(require("chai"));

var _index = _interopRequireDefault(require("../index"));

var _user = _interopRequireDefault(require("../services/user.service"));

// eslint-disable-next-line no-unused-vars
var should = _chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

var client = {
  email: 'neropaulej@gmail.com',
  password: 'password'
};

var getClientToken =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var clientSignIn, clientToken;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].signIn(client);

          case 2:
            clientSignIn = _context.sent;
            clientToken = clientSignIn.token;
            return _context.abrupt("return", clientToken);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getClientToken() {
    return _ref.apply(this, arguments);
  };
}(); // Test user sign up


describe('Testing user signup', function () {
  var signUpUrl = '/api/v1/auth/signup';
  it('should register new user when all required fields are given', function (done) {
    var user = {
      firstName: 'Oghenero',
      lastName: 'Paul-Ejukorlem',
      email: 'paulej@gmail.com',
      password: 'password'
    };

    _chai["default"].request(_index["default"]).post(signUpUrl).send(user).end(function (err, res) {
      // console.log(res.body);
      res.body.should.have.status(201);
      res.body.should.be.a('object');
      res.body.data.should.have.property('id');
      res.body.data.should.have.property('email');
      res.body.data.should.have.property('firstName');
      res.body.data.should.have.property('lastName');
      res.body.data.should.have.property('type');
      res.body.data.should.have.property('isAdmin');
      res.body.data.should.have.property('token');
      done();
    });
  });
  it('should register new user when all fields are given', function (done) {
    var user = {
      firstName: 'Oghenero',
      lastName: 'Paul-Ejukorlem',
      email: 'paule@gmail.com',
      password: 'password',
      type: 'staff',
      isAdmin: 'true'
    };

    _chai["default"].request(_index["default"]).post(signUpUrl).send(user).end(function (err, res) {
      // console.log(res.body);
      res.body.should.have.status(201);
      res.body.should.be.a('object');
      res.body.data.should.have.property('id');
      res.body.data.should.have.property('email');
      res.body.data.should.have.property('firstName');
      res.body.data.should.have.property('lastName');
      res.body.data.should.have.property('type');
      res.body.data.should.have.property('isAdmin');
      res.body.data.should.have.property('token');
      done();
    });
  });
  it('should not register new user when first name field is missing', function (done) {
    var user = {
      lastName: 'Paul-Ejukorlem',
      email: 'neropaulej@gmail.com',
      password: 'password'
    };

    _chai["default"].request(_index["default"]).post(signUpUrl).send(user).end(function (err, res) {
      // console.log(res.body);
      res.body.should.have.status(400);
      res.body.should.be.a('object');
      res.body.error.should.equal('First Name is required');
      done();
    });
  });
  it('should not register new user when last name field is missing', function (done) {
    var user = {
      firstName: 'Oghenero',
      email: 'neropaulej@gmail.com',
      password: 'password'
    };

    _chai["default"].request(_index["default"]).post(signUpUrl).send(user).end(function (err, res) {
      // console.log(res.body);
      res.body.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.be.a('object');
      res.body.error.should.equal('Last Name is required');
      done();
    });
  });
  it('should not register new user when email field is missing', function (done) {
    var user = {
      firstName: 'Oghenero',
      lastName: 'Paul-Ejukorlem',
      password: 'password'
    };

    _chai["default"].request(_index["default"]).post(signUpUrl).send(user).end(function (err, res) {
      // console.log(res.body);
      res.body.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.be.a('object');
      res.body.error.should.equal('A valid email address is required');
      done();
    });
  });
  it('should not register new user when password field is missing', function (done) {
    var user = {
      firstName: 'Oghenero',
      lastName: 'Paul-Ejukorlem',
      email: 'neropaulej@gmail.com'
    };

    _chai["default"].request(_index["default"]).post(signUpUrl).send(user).end(function (err, res) {
      // console.log(res.body);
      res.body.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.be.a('object');
      res.body.error.should.equal('Password is required');
      done();
    });
  });
}); // Test for user sign in

describe('Testing user signin', function () {
  var signInUrl = '/api/v1/auth/signin';
  it('should sign in a user when all required fields are given', function (done) {
    var user = {
      email: 'paulej@gmail.com',
      password: 'password'
    };

    _chai["default"].request(_index["default"]).post(signInUrl).send(user).end(function (err, res) {
      // console.log(res.body);
      res.body.should.have.status(201);
      res.body.should.be.a('object');
      res.body.data.should.have.property('id');
      res.body.data.should.have.property('email');
      res.body.data.should.have.property('firstName');
      res.body.data.should.have.property('lastName');
      res.body.data.should.have.property('type');
      res.body.data.should.have.property('isAdmin');
      res.body.data.should.have.property('token');
      done();
    });
  });
  it('should not sign in user when email field is missing', function (done) {
    var user = {
      password: 'password'
    };

    _chai["default"].request(_index["default"]).post(signInUrl).send(user).end(function (err, res) {
      // console.log(res.body);
      res.body.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.be.a('object');
      res.body.error.should.equal('A valid email address is required');
      done();
    });
  });
  it('should not sign in user when password field is missing', function (done) {
    var user = {
      email: 'nerocodes@email.com'
    };

    _chai["default"].request(_index["default"]).post(signInUrl).send(user).end(function (err, res) {
      // console.log(res.body);
      res.body.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.be.a('object');
      res.body.error.should.equal('Password is required');
      done();
    });
  });
}); // Test for getting user accounts

describe('Testing get user accounts', function () {
  var userUrl = '/api/v1/user/neropaulej@gmail.com/accounts';
  it('should get all accounts belonging to user',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getClientToken();

          case 2:
            token = _context2.sent;

            _chai["default"].request(_index["default"]).get(userUrl).set('x-access-token', token).end(function (err, res) {
              res.body.should.have.status(200);
              res.body.data.should.be.a('array');
              res.body.data[0].should.be.a('object');
              res.body.data[0].should.have.property('createdOn');
              res.body.data[0].should.have.property('accountNumber');
              res.body.data[0].should.have.property('type');
              res.body.data[0].should.have.property('status');
              res.body.data[0].should.have.property('balance');
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('should not get all accounts if email does not exist',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userUrl = '/api/v1/user/neropaule@gmail.com/accounts';
            _context3.next = 3;
            return getClientToken();

          case 3:
            token = _context3.sent;

            _chai["default"].request(_index["default"]).get(userUrl).set('x-access-token', token).end(function (err, res) {
              res.body.should.have.status(400);
              res.body.should.be.a('object');
              res.body.error.should.equal('No user with this email');
            });

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('should not get all accounts if user does not have accounts',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    var token;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userUrl = '/api/v1/user/yoshiyama@gmail.com/accounts';
            _context4.next = 3;
            return getClientToken();

          case 3:
            token = _context4.sent;

            _chai["default"].request(_index["default"]).get(userUrl).set('x-access-token', token).end(function (err, res) {
              res.body.should.have.status(400);
              res.body.data.should.be.a('object');
              res.body.error.should.equal('User does not have any account');
            });

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
});
//# sourceMappingURL=user.test.js.map