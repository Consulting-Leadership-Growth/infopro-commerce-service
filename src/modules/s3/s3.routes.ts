import { Router } from 'express';
import multer from 'multer';
import { S3Controller } from './s3.controller';
import { auth } from '../../middlewares/auth';

const router = Router();
const upload = multer({ dest: 'tmp/' });

router.use(auth);
router.post('/upload', upload.single('file'), S3Controller.uploadImage);

export default router;
