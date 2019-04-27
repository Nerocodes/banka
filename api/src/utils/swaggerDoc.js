import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const router = Router();

const options = {
  customCss: `.swagger-ui .topbar {display: none}
     .swagger-ui .info {margin-top: 1rem}`,
};

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
router.get('/', swaggerUi.setup(swaggerDocument));

export default router;
