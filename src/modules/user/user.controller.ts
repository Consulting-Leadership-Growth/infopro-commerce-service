import { NextFunction, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '../../constants/http-error.constants';
import { HttpStatus } from '../../constants/https-status';
import { User } from './user.model';
import { createUserBodySchema } from './user.schema';
import { UserService } from './user.service';

type CreateUserData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateUserData = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

export class UserController {
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await UserService.findById(Number(id));

      res.status(HttpStatus.OK).json(user);
    } catch (error: any) {
      res
        .status(error.status || HttpStatus.INTERNAL_ERROR)
        .json({ message: error.message || INTERNAL_SERVER_ERROR_MESSAGE });
      next(error);
    }
  }

  static async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.findAll();

      res.status(HttpStatus.OK).json(users);
    } catch (error: any) {
      res
        .status(error.status || HttpStatus.INTERNAL_ERROR)
        .json({ message: error.message || INTERNAL_SERVER_ERROR_MESSAGE });
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateUserData = createUserBodySchema.parse(req.body);
      const user = await UserService.create(data);

      res.status(HttpStatus.CREATED).json(user);
    } catch (error: any) {
      res
        .status(error.status || HttpStatus.INTERNAL_ERROR)
        .json({ message: error.message || INTERNAL_SERVER_ERROR_MESSAGE });
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data: UpdateUserData = req.body;
      const user = await UserService.update(Number(id), data);

      res.status(HttpStatus.OK).json(user);
    } catch (error: any) {
      res
        .status(error.status || HttpStatus.INTERNAL_ERROR)
        .json({ message: error.message || INTERNAL_SERVER_ERROR_MESSAGE });
      next(error);
    }
  }
}
