"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireDefault(require("chai"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line no-unused-vars
var should = _chai["default"].should();

_chai["default"].use(_chaiHttp["default"]); // Test for credit transactions


describe('Testing credit transaction', function () {
  var signUpUrl = '/api/v1/auth/signup';
  var signInUrl = '/api/v1/auth/signin';
  var createAccUrl = '/api/v1/accounts';
  var transactionUrl = '/api/v1/transactions/';
  it('should credit account if all parameters are given', function (done) {
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
        var amount = {
          amount: 80000
        };

        _chai["default"].request(_index["default"]).post(signInUrl).send(staff).end(function (errStaff, resStaff) {
          // console.log(res.body);
          resStaff.body.should.have.status(201);
          resStaff.body.should.be.a('object');
          resStaff.body.data.should.have.property('token');
          var tokenStaff = resStaff.body.data.token;

          _chai["default"].request(_index["default"]).post("".concat(transactionUrl).concat(accountNumber, "/credit")).set('x-access-token', tokenStaff).send(amount).end(function (errorStaff, responseStaff) {
            responseStaff.body.should.have.status(200);
            responseStaff.body.should.be.a('object');
            responseStaff.body.data.should.have.property('transactionId');
            responseStaff.body.data.should.have.property('accountNumber');
            responseStaff.body.data.should.have.property('amount');
            responseStaff.body.data.should.have.property('cashier');
            responseStaff.body.data.should.have.property('transactionType');
            responseStaff.body.data.should.have.property('accountBalance');
            done();
          });
        });
      });
    });
  });
  it('should not credit account if user is not cashier', function (done) {
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
        var amount = {
          amount: 80000
        };

        _chai["default"].request(_index["default"]).post(signInUrl).send(staff).end(function (errStaff, resStaff) {
          // console.log(res.body);
          resStaff.body.should.have.status(201);
          resStaff.body.should.be.a('object');
          resStaff.body.data.should.have.property('token');
          var tokenStaff = resStaff.body.data.token;

          _chai["default"].request(_index["default"]).post("".concat(transactionUrl).concat(accountNumber, "/credit")).set('x-access-token', tokenStaff).send(amount).end(function (errorStaff, responseStaff) {
            responseStaff.body.should.have.status(401);
            responseStaff.body.should.be.a('object');
            responseStaff.body.error.should.equal('Unauthorized user');
            done();
          });
        });
      });
    });
  });
  it('should not credit account if account number does not exist', function (done) {
    var staff = {
      email: 'nerocodes@gmail.com',
      password: 'password'
    };
    var amount = {
      amount: 80000
    };

    _chai["default"].request(_index["default"]).post(signInUrl).send(staff).end(function (errStaff, resStaff) {
      // console.log(res.body);
      resStaff.body.should.have.status(201);
      resStaff.body.should.be.a('object');
      resStaff.body.data.should.have.property('token');
      var tokenStaff = resStaff.body.data.token;

      _chai["default"].request(_index["default"]).post("".concat(transactionUrl, "123456/credit")).set('x-access-token', tokenStaff).send(amount).end(function (errorStaff, responseStaff) {
        responseStaff.body.should.have.status(404);
        responseStaff.body.should.be.a('object');
        responseStaff.body.error.should.equal('Account number does not match our records');
        done();
      });
    });
  });
}); // Test for debit transactions

describe('Testing debit transaction', function () {
  var signUpUrl = '/api/v1/auth/signup';
  var signInUrl = '/api/v1/auth/signin';
  var createAccUrl = '/api/v1/accounts';
  var transactionUrl = '/api/v1/transactions/';
  it('should debit account if all parameters are given', function (done) {
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
        var amount = {
          amount: 120000
        };

        _chai["default"].request(_index["default"]).post(signInUrl).send(staff).end(function (errStaff, resStaff) {
          // console.log(res.body);
          resStaff.body.should.have.status(201);
          resStaff.body.should.be.a('object');
          resStaff.body.data.should.have.property('token');
          var tokenStaff = resStaff.body.data.token;

          _chai["default"].request(_index["default"]).post("".concat(transactionUrl).concat(accountNumber, "/credit")).set('x-access-token', tokenStaff).send(amount).end(function (errorStaff, responseStaff) {
            responseStaff.body.should.have.status(200);
            var debitAmount = {
              amount: 40000
            };

            _chai["default"].request(_index["default"]).post("".concat(transactionUrl).concat(accountNumber, "/debit")).set('x-access-token', tokenStaff).send(debitAmount).end(function (debitErr, debitRes) {
              debitRes.body.should.have.status(200);
              debitRes.body.should.be.a('object');
              debitRes.body.data.should.have.property('transactionId');
              debitRes.body.data.should.have.property('accountNumber');
              debitRes.body.data.should.have.property('amount');
              debitRes.body.data.should.have.property('cashier');
              debitRes.body.data.should.have.property('transactionType');
              debitRes.body.data.should.have.property('accountBalance');
              done();
            });
          });
        });
      });
    });
  });
  it('should not debit account if user is not cashier', function (done) {
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
        var amount = {
          amount: 80000
        };

        _chai["default"].request(_index["default"]).post(signInUrl).send(staff).end(function (errStaff, resStaff) {
          // console.log(res.body);
          resStaff.body.should.have.status(201);
          resStaff.body.should.be.a('object');
          resStaff.body.data.should.have.property('token');
          var tokenStaff = resStaff.body.data.token;

          _chai["default"].request(_index["default"]).post("".concat(transactionUrl).concat(accountNumber, "/debit")).set('x-access-token', tokenStaff).send(amount).end(function (errorStaff, responseStaff) {
            responseStaff.body.should.have.status(401);
            responseStaff.body.should.be.a('object');
            responseStaff.body.error.should.equal('Unauthorized user');
            done();
          });
        });
      });
    });
  });
  it('should not debit account if account number does not exist', function (done) {
    var staff = {
      email: 'nerocodes@gmail.com',
      password: 'password'
    };
    var amount = {
      amount: 80000
    };

    _chai["default"].request(_index["default"]).post(signInUrl).send(staff).end(function (errStaff, resStaff) {
      // console.log(res.body);
      resStaff.body.should.have.status(201);
      resStaff.body.should.be.a('object');
      resStaff.body.data.should.have.property('token');
      var tokenStaff = resStaff.body.data.token;

      _chai["default"].request(_index["default"]).post("".concat(transactionUrl, "123456/debit")).set('x-access-token', tokenStaff).send(amount).end(function (errorStaff, responseStaff) {
        responseStaff.body.should.have.status(404);
        responseStaff.body.should.be.a('object');
        responseStaff.body.error.should.equal('Account number does not match our records');
        done();
      });
    });
  });
  it('should not debit account if account balance is not enough', function (done) {
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
        var amount = {
          amount: 80000
        };

        _chai["default"].request(_index["default"]).post(signInUrl).send(staff).end(function (errStaff, resStaff) {
          // console.log(res.body);
          resStaff.body.should.have.status(201);
          resStaff.body.should.be.a('object');
          resStaff.body.data.should.have.property('token');
          var tokenStaff = resStaff.body.data.token;

          _chai["default"].request(_index["default"]).post("".concat(transactionUrl).concat(accountNumber, "/debit")).set('x-access-token', tokenStaff).send(amount).end(function (errorStaff, responseStaff) {
            responseStaff.body.should.have.status(400);
            responseStaff.body.should.be.a('object');
            responseStaff.body.error.should.equal('Transaction declined: Insufficient funds');
            done();
          });
        });
      });
    });
  });
});
//# sourceMappingURL=transaction.test.js.map