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

  // fetchAllAccounts(req, res) {
  //   const allAccounts = AccountService.fetchAllAccounts(req);
  //   if (allAccounts.error) {
  //     return res.json({
  //       status: 401,
  //       error: allAccounts.error,
  //     });
  //   }
  //   // eslint-disable-next-line array-callback-return
  //   return res.json({
  //     status: 200,
  //     data: allAccounts,
  //   });
  // },

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
};

export default AccountController;
