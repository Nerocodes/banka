"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _account = _interopRequireDefault(require("../services/account.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AccountController = {
  createAnAccount: function createAnAccount(req, res) {
    var createdAccount = _account["default"].createAccount(req.userId, req.body.type);

    if (createdAccount.error) {
      return res.json({
        status: 401,
        error: createdAccount.error
      });
    }

    if (createdAccount.error2) {
      return res.json({
        status: 400,
        error: createdAccount.error2
      });
    }

    return res.json({
      status: 201,
      data: createdAccount
    });
  },
  accountStatus: function accountStatus(req, res) {
    var modifiedAccount = _account["default"].accountStatus(req, req.params, req.body);

    if (modifiedAccount.error) {
      return res.json({
        status: 401,
        error: modifiedAccount.error
      });
    }

    if (modifiedAccount.error2) {
      return res.json({
        status: 404,
        error: modifiedAccount.error2
      });
    }

    return res.json({
      status: 200,
      data: modifiedAccount
    });
  },
  fetchAllAccounts: function fetchAllAccounts(req, res) {
    var allAccounts = _account["default"].fetchAllAccounts(req);

    if (allAccounts.error) {
      return res.json({
        status: 401,
        error: allAccounts.error
      });
    } // eslint-disable-next-line array-callback-return


    return res.json({
      status: 200,
      data: allAccounts
    });
  },
  deleteAnAccount: function deleteAnAccount(req, res) {
    var deleteAccount = _account["default"].deleteAccount(req, req.params);

    if (deleteAccount.error) {
      return res.json({
        status: 401,
        error: deleteAccount.error
      });
    }

    if (deleteAccount.error2) {
      return res.json({
        status: 404,
        error: deleteAccount.error2
      });
    }

    return res.json({
      status: 200,
      message: 'Account successfully deleted'
    });
  }
};
var _default = AccountController;
exports["default"] = _default;
//# sourceMappingURL=account.controller.js.map