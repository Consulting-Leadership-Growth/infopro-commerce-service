import { Router } from 'express';
import productRoutes from '../modules/product/product.routes';
import userRoutes from '../modules/user/user.routes';

const router = Router();

router.use('/products', productRoutes);
router.use('/users', userRoutes);

export default router;
