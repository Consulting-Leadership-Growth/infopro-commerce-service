import { Router } from 'express';
import productRoutes from '../modules/product/product.routes';
import userRoutes from '../modules/user/user.routes';
import s3 from '../modules/s3/s3.routes';

const router = Router();

router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/s3', s3);

export default router;
