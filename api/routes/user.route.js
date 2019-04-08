import { Router } from 'express';
import UserController from '../controllers/user.controller';
import routeHelper from '../helpers/route.helper';

const router = Router();

router.post('/signup', routeHelper.validateBody(routeHelper.schemas.authSchema), UserController.addAUser);
router.post('/signin', routeHelper.validateBody(routeHelper.schemas.authLoginSchema), UserController.signIn);

export default router;
