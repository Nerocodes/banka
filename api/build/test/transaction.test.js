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

_chai["default"].use(_chaiHttp["default"]); // Set global variables


var client = {
  email: 'neropaulej@gmail.com',
  password: 'password'
};
var staff = {
  email: 'yetundegeorge@gmail.com',
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
}();

var accountNumber = 23402001; // Test for credit transactions

describe('Testing credit transaction', function () {
  var transactionUrl = '/api/v1/transactions/';
  it('should credit account if all parameters are given',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var amount, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            amount = {
              amount: 80000
            };
            _context3.next = 3;
            return getStaffToken();

          case 3:
            token = _context3.sent;

            _chai["default"].request(_index["default"]).post("".concat(transactionUrl).concat(accountNumber, "/credit")).set('x-access-token', token).send(amount).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(200);
              responseStaff.body.should.be.a('object');
              responseStaff.body.data.should.have.property('transactionId');
              responseStaff.body.data.should.have.property('accountNumber');
              responseStaff.body.data.should.have.property('amount');
              responseStaff.body.data.should.have.property('cashier');
              responseStaff.body.data.should.have.property('transactionType');
              responseStaff.body.data.should.have.property('accountBalance');
            });

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('should not credit account if amount is not a number',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    var amount, token;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            amount = {
              amount: 'different'
            };
            _context4.next = 3;
            return getStaffToken();

          case 3:
            token = _context4.sent;

            _chai["default"].request(_index["default"]).post("".concat(transactionUrl).concat(accountNumber, "/credit")).set('x-access-token', token).send(amount).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(400);
              responseStaff.body.should.be.a('object');
              responseStaff.body.error.should.equal('Amount must be a number and is required');
            });

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('should not credit account if user is not cashier',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5() {
    var amount, token;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            amount = {
              amount: 80000
            };
            _context5.next = 3;
            return getClientToken();

          case 3:
            token = _context5.sent;

            _chai["default"].request(_index["default"]).post("".concat(transactionUrl).concat(accountNumber, "/credit")).set('x-access-token', token).send(amount).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(401);
              responseStaff.body.should.be.a('object');
              responseStaff.body.error.should.equal('Unauthorized user');
            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('should not credit account if account number does not exist',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6() {
    var amount, token;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            amount = {
              amount: 80000
            };
            _context6.next = 3;
            return getStaffToken();

          case 3:
            token = _context6.sent;

            _chai["default"].request(_index["default"]).post("".concat(transactionUrl, "123456/credit")).set('x-access-token', token).send(amount).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(404);
              responseStaff.body.should.be.a('object');
              responseStaff.body.error.should.equal('Account number does not match our records');
            });

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
}); // Test for debit transactions

describe('Testing debit transaction', function () {
  var transactionUrl = '/api/v1/transactions/';
  it('should debit account if all parameters are given',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7() {
    var debitAmount, token;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            debitAmount = {
              amount: 40000
            };
            _context7.next = 3;
            return getStaffToken();

          case 3:
            token = _context7.sent;

            _chai["default"].request(_index["default"]).post("".concat(transactionUrl).concat(accountNumber, "/debit")).set('x-access-token', token).send(debitAmount).end(function (debitErr, debitRes) {
              debitRes.body.should.have.status(200);
              debitRes.body.should.be.a('object');
              debitRes.body.data.should.have.property('transactionId');
              debitRes.body.data.should.have.property('accountNumber');
              debitRes.body.data.should.have.property('amount');
              debitRes.body.data.should.have.property('cashier');
              debitRes.body.data.should.have.property('transactionType');
              debitRes.body.data.should.have.property('accountBalance');
            });

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it('should not debit account if amount is not a number',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8() {
    var amount, token;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            amount = {
              amount: 'different'
            };
            _context8.next = 3;
            return getStaffToken();

          case 3:
            token = _context8.sent;

            _chai["default"].request(_index["default"]).post("".concat(transactionUrl).concat(accountNumber, "/debit")).set('x-access-token', token).send(amount).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(400);
              responseStaff.body.should.be.a('object');
              responseStaff.body.error.should.equal('Amount must be a number and is required');
            });

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  it('should not debit account if user is not cashier',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9() {
    var amount, token;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            amount = {
              amount: 80000
            };
            _context9.next = 3;
            return getClientToken();

          case 3:
            token = _context9.sent;

            _chai["default"].request(_index["default"]).post("".concat(transactionUrl).concat(accountNumber, "/debit")).set('x-access-token', token).send(amount).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(401);
              responseStaff.body.should.be.a('object');
              responseStaff.body.error.should.equal('Unauthorized user');
            });

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
  it('should not debit account if account number does not exist',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10() {
    var amount, token;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            amount = {
              amount: 80000
            };
            _context10.next = 3;
            return getStaffToken();

          case 3:
            token = _context10.sent;

            _chai["default"].request(_index["default"]).post("".concat(transactionUrl, "123456/debit")).set('x-access-token', token).send(amount).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(404);
              responseStaff.body.should.be.a('object');
              responseStaff.body.error.should.equal('Account number does not match our records');
            });

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
  it('should not debit account if account balance is not enough',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee11() {
    var amount, token;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            amount = {
              amount: 800000
            };
            _context11.next = 3;
            return getStaffToken();

          case 3:
            token = _context11.sent;

            _chai["default"].request(_index["default"]).post("".concat(transactionUrl).concat(accountNumber, "/debit")).set('x-access-token', token).send(amount).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(400);
              responseStaff.body.should.be.a('object');
              responseStaff.body.error.should.equal('Transaction declined: Insufficient funds');
            });

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
});
//# sourceMappingURL=transaction.test.js.map