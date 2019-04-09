import AccountService from '../services/account.service';


const AccountController = {
  createAnAccount(req, res) {
    const createdAccount = AccountService.createAccount(req.userId, req.body.type);
    if (createdAccount.error) {
      return res.json({
        status: 401,
        error: createdAccount.error,
      }).status(401);
    }
    return res.json({
      status: 201,
      data: createdAccount,
    }).status(201);
  },

  accountStatus(req, res) {
    const modifiedAccount = AccountService.accountStatus(req, req.params, req.body);
    if (modifiedAccount.error) {
      return res.json({
        status: 404,
        error: modifiedAccount.error,
      }).status(404);
    }
    return res.json({
      status: 200,
      data: modifiedAccount,
    }).status(200);
  },

  fetchAllAccounts(req, res) {
    const allAccounts = AccountService.fetchAllAccounts(req);
    // eslint-disable-next-line array-callback-return
    return res.json({
      status: 200,
      data: allAccounts,
    }).status(200);
  },

  deleteAnAccount(req, res) {
    const deleteAccount = AccountService.deleteAccount(req, req.params);
    if (deleteAccount.error) {
      return res.json({
        status: 401,
        error: deleteAccount.error,
      }).status(401);
    }
    return res.json({
      status: 200,
      message: 'Account successfully deleted',
    }).status(200);
  },
};

export default AccountController;
