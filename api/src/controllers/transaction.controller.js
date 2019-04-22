import TransactionService from '../services/transaction.service';

const TransactionController = {
  async debitAnAccount(req, res) {
    const transaction = await TransactionService.debitAccount(req, req.params, req.body);
    if (transaction.error) {
      return res.json({
        status: 401,
        error: transaction.error,
      });
    }
    if (transaction.error1) {
      return res.json({
        status: 404,
        error: transaction.error1,
      });
    }
    if (transaction.error2) {
      return res.json({
        status: 400,
        error: transaction.error2,
      });
    }
    return res.json({
      status: 200,
      data: transaction,
    });
  },

  async creditAnAccount(req, res) {
    const transaction = await TransactionService.creditAccount(req, req.params, req.body);
    if (transaction.error) {
      return res.json({
        status: 401,
        error: transaction.error,
      });
    }
    if (transaction.error1) {
      return res.json({
        status: 404,
        error: transaction.error1,
      });
    }
    return res.json({
      status: 200,
      data: transaction,
    });
  },

  async getATransaction(req, res) {
    const transaction = await TransactionService.getATransaction(req.params);
    if (transaction.error) {
      return res.json({
        status: 400,
        error: transaction.error,
      });
    }
    return res.json({
      status: 200,
      data: [transaction],
    });
  },
};

export default TransactionController;
