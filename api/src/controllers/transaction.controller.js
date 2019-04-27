import TransactionService from '../services/transaction.service';
import responseHelper from '../helpers/response.helper';

const TransactionController = {
  async debitAnAccount(req, res) {
    const transaction = await TransactionService.debitAccount(req, req.params, req.body);
    responseHelper(res, transaction);
  },

  async creditAnAccount(req, res) {
    const transaction = await TransactionService.creditAccount(req, req.params, req.body);
    responseHelper(res, transaction);
  },

  async getATransaction(req, res) {
    const transaction = await TransactionService.getATransaction(req, req.params);
    responseHelper(res, transaction);
  },
};

export default TransactionController;
