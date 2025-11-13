import { Router } from 'express';
import auth from '../modules/auth/auth.routes';
import productRoutes from '../modules/product/product.routes';
import s3 from '../modules/s3/s3.routes';
import userRoutes from '../modules/user/user.routes';

const router = Router();

router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/s3', s3);
router.use('/auth', auth);

export default router;
