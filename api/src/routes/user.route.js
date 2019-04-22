import { Router } from 'express';
import UserController from '../controllers/user.controller';
import routeHelper from '../helpers/route.helper';
import verifyToken from '../controllers/middleware/token.controller';

const router = Router();

router.post('/auth/signup',
  routeHelper.validateBody(routeHelper.schemas.authSchema),
  UserController.addAUser);

router.post('/auth/signin',
  routeHelper.validateBody(routeHelper.schemas.authLoginSchema),
  UserController.signIn);

router.get('/user/:email/accounts',
  verifyToken.verify,
  UserController.getUserAccounts);

export default router;
