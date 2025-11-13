import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();

router.post('/authentication', AuthController.authenticate);
router.get('/generate-key', AuthController.generateKey);

export default router;
