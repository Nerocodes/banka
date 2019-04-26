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
};
var admin = {
  email: 'yoshiyama@gmail.com',
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

var getAdminToken =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var adminSignIn, adminToken;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user["default"].signIn(admin);

          case 2:
            adminSignIn = _context3.sent;
            adminToken = adminSignIn.token;
            return _context3.abrupt("return", adminToken);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getAdminToken() {
    return _ref3.apply(this, arguments);
  };
}();

var accountNumber = 23402001; // Test user create account

describe('Testing user creating an account', function () {
  var createAccUrl = '/api/v1/accounts';
  it('should create an account for user if all parameters are given',
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
            return getClientToken();

          case 3:
            token = _context4.sent;

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
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('should not create an account if account type is not savings or current',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5() {
    var accType, token;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            accType = {
              type: 'different'
            };
            _context5.next = 3;
            return getClientToken();

          case 3:
            token = _context5.sent;

            _chai["default"].request(_index["default"]).post(createAccUrl).set('x-access-token', token).send(accType).end(function (error, response) {
              response.body.should.have.status(400);
              response.body.should.be.a('object');
              response.body.error.should.equal('Account type must be savings or current and is required');
            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('should not create an account if user is not a client',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6() {
    var accType, token;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            accType = {
              type: 'savings'
            };
            _context6.next = 3;
            return getStaffToken();

          case 3:
            token = _context6.sent;

            _chai["default"].request(_index["default"]).post(createAccUrl).set('x-access-token', token).send(accType).end(function (error, response) {
              response.body.should.have.status(401);
              response.body.should.be.a('object');
              response.body.error.should.equal('An account cannot be created for this user');
            });

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
}); // Test Admin/Staff activate or deactivate account

describe('Testing admin or staff activating and deactivating account', function () {
  var accStatusUrl = '/api/v1/accounts/';
  it('should change account status if all parameters are provided',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7() {
    var accStatus, tokenStaff;
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
            tokenStaff = _context7.sent;

            _chai["default"].request(_index["default"]).patch("".concat(accStatusUrl).concat(accountNumber)).set('x-access-token', tokenStaff).send(accStatus).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(200);
              responseStaff.body.should.be.a('object');
              responseStaff.body.data.should.have.property('accountNumber');
              responseStaff.body.data.should.have.property('status');
            });

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it('should not change account status if status is not active or dormant',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8() {
    var accStatus, token;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            accStatus = {
              status: 'different'
            };
            _context8.next = 3;
            return getStaffToken();

          case 3:
            token = _context8.sent;

            _chai["default"].request(_index["default"]).patch("".concat(accStatusUrl).concat(accountNumber)).set('x-access-token', token).send(accStatus).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(400);
              responseStaff.body.should.be.a('object');
              responseStaff.body.error.should.equal('Status must be active or dormant and is required');
            });

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  it('should not change account status if user is not staff',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9() {
    var accStatus, token;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            accStatus = {
              status: 'active'
            };
            _context9.next = 3;
            return getClientToken();

          case 3:
            token = _context9.sent;

            _chai["default"].request(_index["default"]).patch("".concat(accStatusUrl).concat(accountNumber)).set('x-access-token', token).send(accStatus).end(function (errorStaff, responseStaff) {
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
  it('should not change account status if account is not found',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10() {
    var accStatus, token;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            accStatus = {
              status: 'active'
            };
            _context10.next = 3;
            return getStaffToken();

          case 3:
            token = _context10.sent;

            _chai["default"].request(_index["default"]).patch("".concat(accStatusUrl, "123456")).set('x-access-token', token).send(accStatus).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(404);
              responseStaff.body.should.be.a('object');
              responseStaff.body.error.should.equal('No account found');
            });

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
}); // Test for Admin/Staff delete account

describe('Testing admin or staff deleting account', function () {
  var delAccUrl = '/api/v1/accounts/';
  it('should delete account if all parameters are given',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee11() {
    var token;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return getStaffToken();

          case 2:
            token = _context11.sent;

            _chai["default"].request(_index["default"])["delete"]("".concat(delAccUrl).concat(accountNumber + 1)).set('x-access-token', token).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(200);
              responseStaff.body.should.be.a('object');
              responseStaff.body.message.should.equal('Account successfully deleted');
            });

          case 4:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
  it('should not delete account if user is not staff',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee12() {
    var token;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return getClientToken();

          case 2:
            token = _context12.sent;

            _chai["default"].request(_index["default"])["delete"]("".concat(delAccUrl).concat(accountNumber + 2)).set('x-access-token', token).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(403);
              responseStaff.body.should.be.a('object');
              responseStaff.body.error.should.equal('Unauthorized user');
            });

          case 4:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
  it('should not delete account if account does not exist',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee13() {
    var token;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return getStaffToken();

          case 2:
            token = _context13.sent;

            _chai["default"].request(_index["default"])["delete"]("".concat(delAccUrl, "123456")).set('x-access-token', token).end(function (errorStaff, responseStaff) {
              responseStaff.body.should.have.status(400);
              responseStaff.body.should.be.a('object');
              responseStaff.body.error.should.equal('No account found');
            });

          case 4:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  })));
}); // Test for account transaction history

describe('Testing get transaction history', function () {
  var historyUrl = "/api/v1/accounts/".concat(accountNumber, "/transactions");
  it('should get all transaction history belonging to specified account number',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee14() {
    var token;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return getAdminToken();

          case 2:
            token = _context14.sent;

            _chai["default"].request(_index["default"]).get(historyUrl).set('x-access-token', token).end(function (error, response) {
              response.body.should.have.status(200);
              response.body.data.should.be.a('array');
              response.body.data[0].should.be.a('object');
              response.body.data[0].should.have.property('transactionId');
              response.body.data[0].should.have.property('createdOn');
              response.body.data[0].should.have.property('type');
              response.body.data[0].should.have.property('accountNumber');
              response.body.data[0].should.have.property('amount');
              response.body.data[0].should.have.property('oldBalance');
              response.body.data[0].should.have.property('newBalance');
            });

          case 4:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  })));
}); // Test for get account details

describe('Testing get account details', function () {
  var getAccUrl = '/api/v1/accounts/23402004';
  it('should get account details',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee15() {
    var token;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return getClientToken();

          case 2:
            token = _context15.sent;

            _chai["default"].request(_index["default"]).get(getAccUrl).set('x-access-token', token).end(function (error, response) {
              response.body.should.have.status(200);
              response.body.should.be.a('object');
              response.body.data.should.have.property('createdOn');
              response.body.data.should.have.property('accountNumber');
              response.body.data.should.have.property('ownerEmail');
              response.body.data.should.have.property('type');
              response.body.data.should.have.property('status');
              response.body.data.should.have.property('balance');
            });

          case 4:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  })));
  it('should not get account details if account number is wrong',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee16() {
    var token;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            getAccUrl = '/api/v1/accounts/2340200';
            _context16.next = 3;
            return getClientToken();

          case 3:
            token = _context16.sent;

            _chai["default"].request(_index["default"]).get(getAccUrl).set('x-access-token', token).end(function (error, response) {
              response.body.should.have.status(400);
              response.body.should.be.a('object');
              response.body.error.should.equal('No account with this account number');
            });

          case 5:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  })));
  it('should not get account details if no token',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee17() {
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            getAccUrl = '/api/v1/accounts/2340200';

            _chai["default"].request(_index["default"]).get(getAccUrl).end(function (error, response) {
              response.body.should.have.status(403);
              response.body.should.be.a('object');
              response.body.error.should.equal('No token provided.');
            });

          case 2:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  })));
}); // Test for get all accounts

describe('Testing get account details', function () {
  var getAccUrl = '/api/v1/accounts';
  it('should get all accounts',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee18() {
    var token;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return getStaffToken();

          case 2:
            token = _context18.sent;

            _chai["default"].request(_index["default"]).get(getAccUrl).set('x-access-token', token).end(function (error, response) {
              response.body.should.have.status(200);
              response.body.should.be.a('object');
              response.body.data.should.be.a('array');
              response.body.data[0].should.have.property('createdOn');
              response.body.data[0].should.have.property('accountNumber');
              response.body.data[0].should.have.property('ownerEmail');
              response.body.data[0].should.have.property('type');
              response.body.data[0].should.have.property('status');
              response.body.data[0].should.have.property('balance');
            });

          case 4:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  })));
  it('should get all active accounts',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee19() {
    var getActiveAccUrl, token;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            getActiveAccUrl = '/api/v1/accounts?status=active';
            _context19.next = 3;
            return getStaffToken();

          case 3:
            token = _context19.sent;

            _chai["default"].request(_index["default"]).get(getActiveAccUrl).set('x-access-token', token).end(function (error, response) {
              response.body.should.have.status(200);
              response.body.should.be.a('object');
              response.body.data.should.be.a('array');
              response.body.data[0].should.have.property('createdOn');
              response.body.data[0].should.have.property('accountNumber');
              response.body.data[0].should.have.property('ownerEmail');
              response.body.data[0].should.have.property('type');
              response.body.data[0].should.have.property('status');
              response.body.data[0].should.have.property('balance');
            });

          case 5:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  })));
  it('should get all dormant accounts',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee20() {
    var getDormantAccUrl, token;
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            getDormantAccUrl = '/api/v1/accounts?status=dormant';
            _context20.next = 3;
            return getStaffToken();

          case 3:
            token = _context20.sent;

            _chai["default"].request(_index["default"]).get(getDormantAccUrl).set('x-access-token', token).end(function (error, response) {
              response.body.should.have.status(200);
              response.body.should.be.a('object');
              response.body.data.should.be.a('array');
              response.body.data[0].should.have.property('createdOn');
              response.body.data[0].should.have.property('accountNumber');
              response.body.data[0].should.have.property('ownerEmail');
              response.body.data[0].should.have.property('type');
              response.body.data[0].should.have.property('status');
              response.body.data[0].should.have.property('balance');
            });

          case 5:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  })));
  it('should not get accounts if user is not a staff',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee21() {
    var token;
    return _regenerator["default"].wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.next = 2;
            return getClientToken();

          case 2:
            token = _context21.sent;

            _chai["default"].request(_index["default"]).get(getAccUrl).set('x-access-token', token).end(function (error, response) {
              response.body.should.have.status(403);
              response.body.should.be.a('object');
              response.body.error.should.equal('Unauthorized user');
            });

          case 4:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21);
  })));
});
//# sourceMappingURL=account.test.js.map