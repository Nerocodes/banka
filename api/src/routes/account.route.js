import { Router } from 'express';
import AccountController from '../controllers/account.controller';
import routeHelper from '../helpers/route.helper';
import verifyToken from '../controllers/middleware/token.controller';

const router = Router();

router.post('/', verifyToken.verify, routeHelper.validateBody(routeHelper.schemas.createAccountSchema), AccountController.createAnAccount);
router.patch('/:accountNumber', verifyToken.verify, routeHelper.validateBody(routeHelper.schemas.accountStatusSchema), AccountController.accountStatus);
router.delete('/:accountNumber', verifyToken.verify, AccountController.deleteAnAccount);
router.get('/', verifyToken.verify, AccountController.fetchAllAccounts);

export default router;