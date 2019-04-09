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
    const accountNumber = req.params;
    const status = req.body;
    const modifiedAccount = AccountService.accountStatus(accountNumber, status);
    return res.json({
      status: 201,
      data: modifiedAccount,
    }).status(201);
  },
};

export default AccountController;
