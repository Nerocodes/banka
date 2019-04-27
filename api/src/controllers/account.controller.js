import AccountService from '../services/account.service';
import responseHelper from '../helpers/response.helper';


const AccountController = {
  async createAnAccount(req, res) {
    const createdAccount = await AccountService.createAccount(req.userId, req.body.type);
    responseHelper(res, createdAccount);
  },

  async accountStatus(req, res) {
    const modifiedAccount = await AccountService.accountStatus(req.params, req.body);
    responseHelper(res, modifiedAccount);
  },

  async deleteAnAccount(req, res) {
    const deleteAccount = await AccountService.deleteAccount(req.params);
    responseHelper(res, deleteAccount);
  },

  async getTransactionHistory(req, res) {
    const transactionHistory = await AccountService.transactionHistory(req, req.params);
    responseHelper(res, transactionHistory);
  },

  async getSingleAccount(req, res) {
    const account = await AccountService.getSingleAccount(req, req.params);
    responseHelper(res, account);
  },

  async getAllAccounts(req, res) {
    const accounts = await AccountService.getAllAccounts(req);
    responseHelper(res, accounts);
  },
};

export default AccountController;
