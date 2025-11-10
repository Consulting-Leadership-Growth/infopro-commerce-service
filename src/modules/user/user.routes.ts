import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.get('/:id', async (req, res, next) => {
  try {
    const user = await UserController.findById(Number(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
});
router.get('/', UserController.findAll);
router.post('/', async (req, res, next) => {
  try {
    await UserController.create(req.body);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
});
router.put('/:id', async (req, res, next) => {
  try {
    await UserController.update(Number(req.params.id), req.body);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
