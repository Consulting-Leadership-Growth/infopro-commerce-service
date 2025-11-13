import { Router } from 'express';
import { UserController } from './user.controller';
import { auth } from '../../middlewares/auth';

const router = Router();

router.use(auth);

router.get('/', UserController.getAll);

router.get('/:id', UserController.getById);

router.post('/', UserController.create);

router.put('/:id', UserController.update);

export default router;
