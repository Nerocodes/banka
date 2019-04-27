import { Router } from 'express';
import AccountController from '../controllers/account.controller';
import routeHelper from '../helpers/route.helper';
import verifyToken from '../controllers/middleware/token.controller';
import permissions from '../controllers/middleware/roles.controller';

const router = Router();

router.post('/', verifyToken.verify,
  routeHelper.validateBody(routeHelper.schemas.createAccountSchema),
  AccountController.createAnAccount);

router.patch('/:accountNumber',
  verifyToken.verify,
  permissions.staffAndAdmin,
  routeHelper.validateParams(routeHelper.schemas.accNoSchema),
  routeHelper.validateBody(routeHelper.schemas.accountStatusSchema),
  AccountController.accountStatus);

router.delete('/:accountNumber',
  verifyToken.verify,
  permissions.staffAndAdmin,
  routeHelper.validateParams(routeHelper.schemas.accNoSchema),
  AccountController.deleteAnAccount);

router.get('/:accountNumber',
  verifyToken.verify,
  routeHelper.validateParams(routeHelper.schemas.accNoSchema),
  AccountController.getSingleAccount);

router.get('/:accountNumber/transactions',
  verifyToken.verify,
  routeHelper.validateParams(routeHelper.schemas.accNoSchema),
  AccountController.getTransactionHistory);

router.get('/', verifyToken.verify,
  verifyToken.verify,
  permissions.staffAndAdmin,
  routeHelper.validateQuery(routeHelper.schemas.statusSchema),
  AccountController.getAllAccounts);

export default router;
