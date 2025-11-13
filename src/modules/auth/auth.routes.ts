import { Router } from 'express';
import { AuthController } from './auth.controller';
import { auth } from '../../middlewares/auth';

const router = Router();

router.post('/authentication', AuthController.authenticate);
router.get('/generate-key', AuthController.generateKey);

router.use(auth);
router.post('/validate-authentication', AuthController.validateAdminAuth);

export default router;
