import { Router } from 'express';
import TransactionController from '../controllers/transaction.controller';
import routeHelper from '../helpers/route.helper';
import verifyToken from '../controllers/middleware/token.controller';
import permissions from '../controllers/middleware/roles.controller';

const router = Router();

router.post('/:accountNumber/debit',
  verifyToken.verify,
  permissions.staffOnly,
  routeHelper.validateParams(routeHelper.schemas.accNoSchema),
  routeHelper.validateBody(routeHelper.schemas.debitCreditSchema),
  TransactionController.debitAnAccount);

router.post('/:accountNumber/credit',
  verifyToken.verify,
  permissions.staffOnly,
  routeHelper.validateParams(routeHelper.schemas.accNoSchema),
  routeHelper.validateBody(routeHelper.schemas.debitCreditSchema),
  TransactionController.creditAnAccount);

router.get('/:transactionId',
  verifyToken.verify,
  routeHelper.validateParams(routeHelper.schemas.idSchema),
  TransactionController.getATransaction);

export default router;
