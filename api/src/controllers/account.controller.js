import AccountService from '../services/account.service';


const AccountController = {
  async createAnAccount(req, res) {
    const createdAccount = await AccountService.createAccount(req.userId, req.body.type);
    if (createdAccount.error) {
      return res.json({
        status: 401,
        error: createdAccount.error,
      });
    }
    if (createdAccount.error2) {
      return res.json({
        status: 400,
        error: createdAccount.error2,
      });
    }
    return res.json({
      status: 201,
      data: createdAccount,
    });
  },

  async accountStatus(req, res) {
    const modifiedAccount = await AccountService.accountStatus(req, req.params, req.body);
    if (modifiedAccount.error) {
      return res.json({
        status: 401,
        error: modifiedAccount.error,
      });
    }
    if (modifiedAccount.error2) {
      return res.json({
        status: 404,
        error: modifiedAccount.error2,
      });
    }
    return res.json({
      status: 200,
      data: modifiedAccount,
    });
  },

  async deleteAnAccount(req, res) {
    const deleteAccount = await AccountService.deleteAccount(req, req.params);
    if (deleteAccount.error) {
      return res.json({
        status: 403,
        error: deleteAccount.error,
      });
    }

    if (deleteAccount.error2) {
      return res.json({
        status: 400,
        error: deleteAccount.error2,
      });
    }

    return res.json({
      status: 200,
      message: 'Account successfully deleted',
    });
  },

  async getTransactionHistory(req, res) {
    const transactionHistory = await AccountService.transactionHistory(req.params);
    if (transactionHistory.error) {
      return res.json({
        status: 400,
        error: transactionHistory.error,
      });
    }
    if (transactionHistory.error1) {
      return res.json({
        status: 400,
        error: transactionHistory.error1,
      });
    }
    return res.json({
      status: 200,
      data: transactionHistory,
    });
  },

  async getSingleAccount(req, res) {
    const account = await AccountService.getSingleAccount(req.params);
    if (account.error) {
      return res.json({
        status: 400,
        error: account.error,
      });
    }
    return res.json({
      status: 200,
      data: account,
    });
  },
};

export default AccountController;
