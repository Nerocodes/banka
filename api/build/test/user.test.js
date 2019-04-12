"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireDefault(require("chai"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line no-unused-vars
var should = _chai["default"].should();

_chai["default"].use(_chaiHttp["default"]); // Test user sign up


describe('Testing user signup', function () {
  var signUpUrl = '/api/v1/auth/signup';
  it('should register new user when all required fields are given', function (done) {
    var user = {
      firstName: 'Oghenero',
      lastName: 'Paul-Ejukorlem',
      email: 'neropaulej@gmail.com',
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
      res.body.error.name.should.equal('ValidationError');
      res.body.error.should.have.property('details');
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
      res.body.error.name.should.equal('ValidationError');
      res.body.error.should.have.property('details');
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
      res.body.error.name.should.equal('ValidationError');
      res.body.error.should.have.property('details');
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
      res.body.error.name.should.equal('ValidationError');
      res.body.error.should.have.property('details');
      done();
    });
  });
}); // Test for user sign in

describe('Testing user signin', function () {
  var signInUrl = '/api/v1/auth/signin';
  it('should sign in a user when all required fields are given', function (done) {
    var user = {
      email: 'neropaulej@gmail.com',
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
      res.body.error.name.should.equal('ValidationError');
      res.body.error.should.have.property('details');
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
      res.body.error.name.should.equal('ValidationError');
      res.body.error.should.have.property('details');
      done();
    });
  });
});
//# sourceMappingURL=user.test.js.map