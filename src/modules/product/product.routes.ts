import { Router } from 'express';
import { ProductController } from './product.controller';

const router = Router();

router.get('/:id', async (req, res, next) => {
  try {
    const product = await ProductController.findBy(Number(req.params.id));
    res.json(product);
  } catch (error) {
    next(error);
  }
});
router.get('/', ProductController.findAll);
router.post('/', async (req, res, next) => {
  try {
    await ProductController.create(req.body);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
});
router.put('/:id', async (req, res, next) => {
  try {
    await ProductController.update(Number(req.params.id), req.body);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    await ProductController.logicDelete(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
