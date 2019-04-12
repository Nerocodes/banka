"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireDefault(require("chai"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line no-unused-vars
var should = _chai["default"].should();

_chai["default"].use(_chaiHttp["default"]); // Test user create account


describe('Testing user creating an account', function () {
  var createAccUrl = '/api/v1/accounts';
  var signUpUrl = '/api/v1/auth/signup';
  var signInUrl = '/api/v1/auth/signin';
  it('should create an account for user if all parameters are given', function (done) {
    var user = {
      firstName: 'Oghenero',
      lastName: 'Paul-Ejukorlem',
      email: 'neropaulej@gmail.com',
      password: 'password'
    };
    var accType = {
      type: 'savings'
    };

    _chai["default"].request(_index["default"]).post(signUpUrl).send(user).end(function (err, res) {
      // console.log(res.body);
      res.body.should.have.status(201);
      res.body.should.be.a('object');
      res.body.data.should.have.property('token');
      var token = res.body.data.token;

      _chai["default"].request(_index["default"]).post(createAccUrl).set('x-access-token', token).send(accType).end(function (error, response) {
        response.body.should.have.status(201);
        response.body.should.be.a('object');
        response.body.data.should.have.property('accountNumber');
        response.body.data.should.have.property('firstName');
        response.body.data.should.have.property('lastName');
        response.body.data.should.have.property('email');
        response.body.data.should.have.property('type');
        response.body.data.should.have.property('openingBalance');
        done();
      });
    });
  });
  it('should not create an account if user is not a client', function (done) {
    var user = {
      firstName: 'Nero',
      lastName: 'Codes',
      email: 'nerocodes@gmail.com',
      password: 'password',
      type: 'staff',
      isAdmin: 'false'
    };
    var accType = {
      type: 'savings'
    };

    _chai["default"].request(_index["default"]).post(signUpUrl).send(user).end(function (err, res) {
      // console.log(res.body);
      res.body.should.have.status(201);
      res.body.should.be.a('object');
      res.body.data.should.have.property('token');
      var token = res.body.data.token;

      _chai["default"].request(_index["default"]).post(createAccUrl).set('x-access-token', token).send(accType).end(function (error, response) {
        response.body.should.have.status(401);
        response.body.should.be.a('object');
        response.body.error.should.equal('An account cannot be created for this user');
        done();
      });
    });
  });
  it('should not create account if user already has account', function (done) {
    var user = {
      email: 'neropaulej@gmail.com',
      password: 'password'
    };
    var accType = {
      type: 'savings'
    };

    _chai["default"].request(_index["default"]).post(signInUrl).send(user).end(function (err, res) {
      // console.log(res.body);
      res.body.should.have.status(201);
      res.body.should.be.a('object');
      res.body.data.should.have.property('token');
      var token = res.body.data.token;

      _chai["default"].request(_index["default"]).post(createAccUrl).set('x-access-token', token).send(accType).end(function (error, response) {
        response.body.should.have.status(400);
        response.body.should.be.a('object');
        response.body.error.should.equal('User already has an account');
        done();
      });
    });
  });
}); // Test Admin/Staff activate or deactivate account

describe('Testing admin or staff activating and deactivating account', function () {
  var createAccUrl = '/api/v1/accounts';
  var accStatusUrl = '/api/v1/accounts/';
  var signUpUrl = '/api/v1/auth/signup';
  var signInUrl = '/api/v1/auth/signin';
  it('should change account status if all parameters are provided', function (done) {
    var user = {
      firstName: 'Yoshi',
      lastName: 'Yama',
      email: 'yoshiyama@gmail.com',
      password: 'password'
    };
    var accType = {
      type: 'savings'
    };

    _chai["default"].request(_index["default"]).post(signUpUrl).send(user).end(function (err, res) {
      // console.log(res.body);
      res.body.should.have.status(201);
      res.body.should.be.a('object');
      res.body.data.should.have.property('token');
      var token = res.body.data.token;

      _chai["default"].request(_index["default"]).post(createAccUrl).set('x-access-token', token).send(accType).end(function (error, response) {
        response.body.should.have.status(201);
        response.body.should.be.a('object');
        response.body.data.should.have.property('accountNumber');
        var accountNumber = response.body.data.accountNumber;
        var staff = {
          email: 'nerocodes@gmail.com',
          password: 'password'
        };
        var accStatus = {
          status: 'active'
        };

        _chai["default"].request(_index["default"]).post(signInUrl).send(staff).end(function (errStaff, resStaff) {
          // console.log(res.body);
          resStaff.body.should.have.status(201);
          resStaff.body.should.be.a('object');
          resStaff.body.data.should.have.property('token');
          var tokenStaff = resStaff.body.data.token;

          _chai["default"].request(_index["default"]).patch("".concat(accStatusUrl).concat(accountNumber)).set('x-access-token', tokenStaff).send(accStatus).end(function (errorStaff, responseStaff) {
            responseStaff.body.should.have.status(200);
            responseStaff.body.should.be.a('object');
            responseStaff.body.data.should.have.property('accountNumber');
            responseStaff.body.data.should.have.property('status');
            done();
          });
        });
      });
    });
  });
  it('should not change account status if user is not staff', function (done) {
    var user = {
      firstName: 'Yoshi',
      lastName: 'Yama',
      email: 'yoshiyama@gmail.com',
      password: 'password'
    };
    var accType = {
      type: 'savings'
    };

    _chai["default"].request(_index["default"]).post(signUpUrl).send(user).end(function (err, res) {
      // console.log(res.body);
      res.body.should.have.status(201);
      res.body.should.be.a('object');
      res.body.data.should.have.property('token');
      var token = res.body.data.token;

      _chai["default"].request(_index["default"]).post(createAccUrl).set('x-access-token', token).send(accType).end(function (error, response) {
        response.body.should.have.status(201);
        response.body.should.be.a('object');
        response.body.data.should.have.property('accountNumber');
        var accountNumber = response.body.data.accountNumber;
        var staff = {
          email: 'yoshiyama@gmail.com',
          password: 'password'
        };
        var accStatus = {
          status: 'active'
        };

        _chai["default"].request(_index["default"]).post(signInUrl).send(staff).end(function (errStaff, resStaff) {
          // console.log(res.body);
          resStaff.body.should.have.status(201);
          resStaff.body.should.be.a('object');
          resStaff.body.data.should.have.property('token');
          var tokenStaff = resStaff.body.data.token;

          _chai["default"].request(_index["default"]).patch("".concat(accStatusUrl).concat(accountNumber)).set('x-access-token', tokenStaff).send(accStatus).end(function (errorStaff, responseStaff) {
            responseStaff.body.should.have.status(401);
            responseStaff.body.should.be.a('object');
            responseStaff.body.error.should.equal('Unauthorized user');
            done();
          });
        });
      });
    });
  });
  it('should not change account status if account is not found', function (done) {
    var staff = {
      email: 'nerocodes@gmail.com',
      password: 'password'
    };
    var accStatus = {
      status: 'active'
    };

    _chai["default"].request(_index["default"]).post(signInUrl).send(staff).end(function (errStaff, resStaff) {
      // console.log(res.body);
      resStaff.body.should.have.status(201);
      resStaff.body.should.be.a('object');
      resStaff.body.data.should.have.property('token');
      var tokenStaff = resStaff.body.data.token;

      _chai["default"].request(_index["default"]).patch("".concat(accStatusUrl, "123456")).set('x-access-token', tokenStaff).send(accStatus).end(function (errorStaff, responseStaff) {
        responseStaff.body.should.have.status(404);
        responseStaff.body.should.be.a('object');
        responseStaff.body.error.should.equal('No account found');
        done();
      });
    });
  });
}); // Test for Admin/Staff delete account

describe('Testing admin or staff deleting account', function () {
  var createAccUrl = '/api/v1/accounts';
  var delAccUrl = '/api/v1/accounts/';
  var signUpUrl = '/api/v1/auth/signup';
  var signInUrl = '/api/v1/auth/signin';
  it('should delete account if all parameters are given', function (done) {
    var user = {
      firstName: 'Yoshi',
      lastName: 'Yama',
      email: 'yoshiyama@gmail.com',
      password: 'password'
    };
    var accType = {
      type: 'savings'
    };

    _chai["default"].request(_index["default"]).post(signUpUrl).send(user).end(function (err, res) {
      // console.log(res.body);
      res.body.should.have.status(201);
      res.body.should.be.a('object');
      res.body.data.should.have.property('token');
      var token = res.body.data.token;

      _chai["default"].request(_index["default"]).post(createAccUrl).set('x-access-token', token).send(accType).end(function (error, response) {
        response.body.should.have.status(201);
        response.body.should.be.a('object');
        response.body.data.should.have.property('accountNumber');
        var accountNumber = response.body.data.accountNumber;
        var staff = {
          email: 'nerocodes@gmail.com',
          password: 'password'
        };

        _chai["default"].request(_index["default"]).post(signInUrl).send(staff).end(function (errStaff, resStaff) {
          // console.log(res.body);
          resStaff.body.should.have.status(201);
          resStaff.body.should.be.a('object');
          resStaff.body.data.should.have.property('token');
          var tokenStaff = resStaff.body.data.token;

          _chai["default"].request(_index["default"])["delete"]("".concat(delAccUrl).concat(accountNumber)).set('x-access-token', tokenStaff).end(function (errorStaff, responseStaff) {
            responseStaff.body.should.have.status(200);
            responseStaff.body.should.be.a('object');
            responseStaff.body.message.should.equal('Account successfully deleted');
            done();
          });
        });
      });
    });
  });
  it('should not delete account if user is not staff', function (done) {
    var user = {
      firstName: 'Yoshi',
      lastName: 'Yama',
      email: 'yoshiyama@gmail.com',
      password: 'password'
    };
    var accType = {
      type: 'savings'
    };

    _chai["default"].request(_index["default"]).post(signUpUrl).send(user).end(function (err, res) {
      // console.log(res.body);
      res.body.should.have.status(201);
      res.body.should.be.a('object');
      res.body.data.should.have.property('token');
      var token = res.body.data.token;

      _chai["default"].request(_index["default"]).post(createAccUrl).set('x-access-token', token).send(accType).end(function (error, response) {
        response.body.should.have.status(201);
        response.body.should.be.a('object');
        response.body.data.should.have.property('accountNumber');
        var accountNumber = response.body.data.accountNumber;
        var staff = {
          email: 'yoshiyama@gmail.com',
          password: 'password'
        };

        _chai["default"].request(_index["default"]).post(signInUrl).send(staff).end(function (errStaff, resStaff) {
          // console.log(res.body);
          resStaff.body.should.have.status(201);
          resStaff.body.should.be.a('object');
          resStaff.body.data.should.have.property('token');
          var tokenStaff = resStaff.body.data.token;

          _chai["default"].request(_index["default"])["delete"]("".concat(delAccUrl).concat(accountNumber)).set('x-access-token', tokenStaff).end(function (errorStaff, responseStaff) {
            responseStaff.body.should.have.status(401);
            responseStaff.body.should.be.a('object');
            responseStaff.body.error.should.equal('Unauthorized user');
            done();
          });
        });
      });
    });
  });
  it('should not delete account if account does not exist', function (done) {
    var staff = {
      email: 'nerocodes@gmail.com',
      password: 'password'
    };
    var accStatus = {
      status: 'active'
    };

    _chai["default"].request(_index["default"]).post(signInUrl).send(staff).end(function (errStaff, resStaff) {
      // console.log(res.body);
      resStaff.body.should.have.status(201);
      resStaff.body.should.be.a('object');
      resStaff.body.data.should.have.property('token');
      var tokenStaff = resStaff.body.data.token;

      _chai["default"].request(_index["default"]).patch("".concat(delAccUrl, "123456")).set('x-access-token', tokenStaff).send(accStatus).end(function (errorStaff, responseStaff) {
        responseStaff.body.should.have.status(404);
        responseStaff.body.should.be.a('object');
        responseStaff.body.error.should.equal('No account found');
        done();
      });
    });
  });
}); // Test for getting all bank accounts

describe('Testing fetch all bank accounts', function () {
  var signInUrl = '/api/v1/auth/signin';
  var fetchAccUrl = '/api/v1/accounts';
  it('should fetch all bank accounts', function (done) {
    var user = {
      email: 'nerocodes@gmail.com',
      password: 'password'
    };

    _chai["default"].request(_index["default"]).post(signInUrl).send(user).end(function (err, res) {
      res.body.should.have.status(201);
      res.body.should.be.a('object');
      res.body.data.should.have.property('token');
      var token = res.body.data.token;

      _chai["default"].request(_index["default"]).get(fetchAccUrl).set('x-access-token', token).end(function (error, response) {
        response.body.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('data');
        done();
      });
    });
  });
  it('should not fetch accounts if user is not staff', function (done) {
    var user = {
      email: 'yoshiyama@gmail.com',
      password: 'password'
    };

    _chai["default"].request(_index["default"]).post(signInUrl).send(user).end(function (err, res) {
      res.body.should.have.status(201);
      res.body.should.be.a('object');
      res.body.data.should.have.property('token');
      var token = res.body.data.token;

      _chai["default"].request(_index["default"]).get(fetchAccUrl).set('x-access-token', token).end(function (error, response) {
        response.body.should.have.status(401);
        response.body.should.be.a('object');
        response.body.error.should.equal('Unauthorized user');
        done();
      });
    });
  });
});
//# sourceMappingURL=account.test.js.map