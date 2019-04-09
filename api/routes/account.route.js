import { Router } from 'express';
import AccountController from '../controllers/account.controller';
import routeHelper from '../helpers/route.helper';
import verifyToken from '../controllers/middleware/token.controller';

const router = Router();

router.post('/', verifyToken.verify, routeHelper.validateBody(routeHelper.schemas.createAccountSchema), AccountController.createAnAccount);
router.patch('/:accountNumber', verifyToken.verify, routeHelper.validateBody(routeHelper.schemas.accountStatusSchema), AccountController.accountStatus);

export default router;
