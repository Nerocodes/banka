import { Router } from 'express';
import AccountController from '../controllers/account.controller';
// import routeHelper from '../helpers/route.helper';

const router = Router();

router.post('/', AccountController.createAnAccount);

export default router;
