import TransactionService from '../services/transaction.service';

const TransactionController = {
  debitAnAccount(req, res) {
    const transaction = TransactionService.debitAccount(req, req.params, req.body);
    if (transaction.error) {
      return res.json({
        status: 401,
        error: transaction.error,
      }).status(401);
    }
    if (transaction.error1) {
      return res.json({
        status: 404,
        error: transaction.error1,
      }).status(404);
    }
    if (transaction.error2) {
      return res.json({
        status: 400,
        error: transaction.error2,
      }).status(400);
    }
    return res.json({
      status: 200,
      data: transaction,
    }).status(200);
  },

  creditAnAccount(req, res) {
    const transaction = TransactionService.creditAccount(req, req.params, req.body);
    if (transaction.error) {
      return res.json({
        status: 401,
        error: transaction.error,
      }).status(401);
    }
    if (transaction.error1) {
      return res.json({
        status: 404,
        error: transaction.error1,
      }).status(404);
    }
    return res.json({
      status: 200,
      data: transaction,
    }).status(200);
  },
};

export default TransactionController;
