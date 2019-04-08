import AccountService from '../services/account.service';


const AccountController = {
  createAnAccount(req, res) {
    const createdAccount = AccountService.createAccount(req.body.id, req.body.type);
    return res.json({
      status: 201,
      data: createdAccount,
    }).status(201);
  },
};

export default AccountController;
