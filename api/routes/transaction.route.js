import { Router } from 'express';
import TransactionController from '../controllers/transaction.controller';
import routeHelper from '../helpers/route.helper';
import verifyToken from '../controllers/middleware/token.controller';

const router = Router();

router.post('/:accountNumber/debit', verifyToken.verify, routeHelper.validateBody(routeHelper.schemas.debitCreditSchema), TransactionController.debitAnAccount);

export default router;
