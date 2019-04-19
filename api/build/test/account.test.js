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

_chai["default"].use(_chaiHttp["default"]); // Set token variables


var client = {
  email: 'neropaulej@gmail.com',
  password: 'password'
};
var staff = {
  email: 'yetundegeorge@gmail.com',
  password: 'password'
}; // const admin = {
//   email: 'yoshiyama@gmail.com',
//   password: 'password',
// };

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
}();

var getStaffToken =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var staffSignIn, staffToken;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].signIn(staff);

          case 2:
            staffSignIn = _context2.sent;
            staffToken = staffSignIn.token;
            return _context2.abrupt("return", staffToken);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getStaffToken() {
    return _ref2.apply(this, arguments);
  };
}(); // const getAdminToken = async () => {
//   const adminSignIn = await UserService.signIn(admin);
//   const adminToken = adminSignIn.token;
//   return adminToken;
// };


var accountNumber = 23402001; // Test user create account

describe('Testing user creating an account', function () {
  var createAccUrl = '/api/v1/accounts';
  it('should create an account for user if all parameters are given',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var accType, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            accType = {
              type: 'savings'
            };
            _context3.next = 3;
            return getClientToken();

          case 3:
            token = _context3.sent;

            _chai["default"].request(_index["default"]).post(createAccUrl).set('x-access-token', token).send(accType).end(function (error, response) {
              response.body.should.have.status(201);
              response.body.should.be.a('object');
              response.body.data.should.have.property('accountNumber');
              response.body.data.should.have.property('firstName');
              response.body.data.should.have.property('lastName');
              response.body.data.should.have.property('email');
              response.body.data.should.have.property('type');
              response.body.data.should.have.property('openingBalance');
            });

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('should not create an account if user is not a client',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    var accType, token;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            accType = {
              type: 'savings'
            };
            _context4.next = 3;
            return getStaffToken();

          case 3:
            token = _context4.sent;

            _chai["default"].request(_index["default"]).post(createAccUrl).set('x-access-token', token).send(accType).end(function (error, response) {
              response.body.should.have.status(401);
              response.body.should.be.a('object');
              response.body.error.should.equal('An account cannot be created for this user');
            });

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
}); // Test Admin/Staff activate or deactivate account

describe('Testing admin or staff activating and deactivating account', function () {
  var accStatusUrl = '/api/v1/accounts/';
  it('should change account status if all parameters are provided',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5() {
    var accStatus, tokenStaff;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            accStatus = {
              status: 'active'
            };
            _context5.next = 3;
            return getStaffToken();

          case 3:
            tokenStaff = _context5.sent;

            _chai["default"].request(_index["default"]).patch("".concat(accStatusUrl).concat(accountNumber)).set('x-access-token', tokenStaff).send(accStatus).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(200);
              responseStaff.body.should.be.a('object');
              responseStaff.body.data.should.have.property('accountNumber');
              responseStaff.body.data.should.have.property('status');
            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('should not change account status if user is not staff',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6() {
    var accStatus, token;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            accStatus = {
              status: 'active'
            };
            _context6.next = 3;
            return getClientToken();

          case 3:
            token = _context6.sent;

            _chai["default"].request(_index["default"]).patch("".concat(accStatusUrl).concat(accountNumber)).set('x-access-token', token).send(accStatus).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(401);
              responseStaff.body.should.be.a('object');
              responseStaff.body.error.should.equal('Unauthorized user');
            });

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it('should not change account status if account is not found',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7() {
    var accStatus, token;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            accStatus = {
              status: 'active'
            };
            _context7.next = 3;
            return getStaffToken();

          case 3:
            token = _context7.sent;

            _chai["default"].request(_index["default"]).patch("".concat(accStatusUrl, "123456")).set('x-access-token', token).send(accStatus).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(404);
              responseStaff.body.should.be.a('object');
              responseStaff.body.error.should.equal('No account found');
            });

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
}); // Test for Admin/Staff delete account

describe('Testing admin or staff deleting account', function () {
  var delAccUrl = '/api/v1/accounts/';
  it('should delete account if all parameters are given',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8() {
    var token;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return getStaffToken();

          case 2:
            token = _context8.sent;

            _chai["default"].request(_index["default"])["delete"]("".concat(delAccUrl).concat(accountNumber + 1)).set('x-access-token', token).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(200);
              responseStaff.body.should.be.a('object');
              responseStaff.body.message.should.equal('Account successfully deleted');
            });

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  it('should not delete account if user is not staff',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9() {
    var token;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return getClientToken();

          case 2:
            token = _context9.sent;

            _chai["default"].request(_index["default"])["delete"]("".concat(delAccUrl).concat(accountNumber + 2)).set('x-access-token', token).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(403);
              responseStaff.body.should.be.a('object');
              responseStaff.body.error.should.equal('Unauthorized user');
            });

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
  it('should not delete account if account does not exist',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10() {
    var token;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return getStaffToken();

          case 2:
            token = _context10.sent;

            _chai["default"].request(_index["default"])["delete"]("".concat(delAccUrl, "123456")).set('x-access-token', token).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(400);
              responseStaff.body.should.be.a('object');
              responseStaff.body.error.should.equal('No account found');
            });

          case 4:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
}); // Test for getting all bank accounts
// describe('Testing fetch all bank accounts', () => {
//   const signInUrl = '/api/v1/auth/signin';
//   const fetchAccUrl = '/api/v1/accounts';
//   it('should fetch all bank accounts', (done) => {
//     const user = {
//       email: 'nerocodes@gmail.com',
//       password: 'password',
//     };
//     chai.request(app)
//       .post(signInUrl)
//       .send(user)
//       .end((err, res) => {
//         res.body.should.have.status(201);
//         res.body.should.be.a('object');
//         res.body.data.should.have.property('token');
//         const { token } = res.body.data;
//         chai.request(app)
//           .get(fetchAccUrl)
//           .set('x-access-token', token)
//           .end((error, response) => {
//             response.body.should.have.status(200);
//             response.body.should.be.a('object');
//             response.body.should.have.property('data');
//             done();
//           });
//       });
//   });
//   it('should not fetch accounts if user is not staff', (done) => {
//     const user = {
//       email: 'yoshiyama@gmail.com',
//       password: 'password',
//     };
//     chai.request(app)
//       .post(signInUrl)
//       .send(user)
//       .end((err, res) => {
//         res.body.should.have.status(201);
//         res.body.should.be.a('object');
//         res.body.data.should.have.property('token');
//         const { token } = res.body.data;
//         chai.request(app)
//           .get(fetchAccUrl)
//           .set('x-access-token', token)
//           .end((error, response) => {
//             response.body.should.have.status(401);
//             response.body.should.be.a('object');
//             response.body.error.should.equal('Unauthorized user');
//             done();
//           });
//       });
//   });
// });
//# sourceMappingURL=account.test.js.map