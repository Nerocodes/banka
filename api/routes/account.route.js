import { Router } from 'express';
import AccountController from '../controllers/account.controller';
// import routeHelper from '../helpers/route.helper';
import verifyToken from '../controllers/middleware/token.controller';

const router = Router();

router.post('/', verifyToken.verify, AccountController.createAnAccount);
router.patch('/:accountNumber', AccountController.accountStatus);

export default router;
