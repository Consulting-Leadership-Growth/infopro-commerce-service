import { Router } from 'express';
import { ProductController } from './product.controller';

const router = Router();

router.get('/', ProductController.getAll);

router.get('/slug/:slug', ProductController.getBySlug);

router.get('/:id', ProductController.getById);

router.post('/', ProductController.create);

router.put('/:id', ProductController.update);

router.delete('/:id', ProductController.delete);

export default router;
