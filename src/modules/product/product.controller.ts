import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../constants/https-status';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '../../constants/http-error.constants';

type CreateProductData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateProductData = Partial<
  Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
>;

export class ProductController {
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductService.findById(Number(id));

      res.status(HttpStatus.OK).json(product);
    } catch (error: any) {
      res
        .status(error.status || HttpStatus.INTERNAL_ERROR)
        .json({ message: error.message || INTERNAL_SERVER_ERROR_MESSAGE });
      next(error);
    }
  }

  static async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const product = await ProductService.findBySlug(slug);

      res.status(HttpStatus.OK).json(product);
    } catch (error: any) {
      res
        .status(error.status || HttpStatus.INTERNAL_ERROR)
        .json({ message: error.message || INTERNAL_SERVER_ERROR_MESSAGE });
      next(error);
    }
  }

  static async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.findAll();

      res.status(HttpStatus.OK).json(products);
    } catch (error: any) {
      res
        .status(error.status || HttpStatus.INTERNAL_ERROR)
        .json({ message: error.message || INTERNAL_SERVER_ERROR_MESSAGE });
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateProductData = req.body;
      const product = await ProductService.create(data);

      res.status(HttpStatus.CREATED).json(product);
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
      const data: UpdateProductData = req.body;
      const product = await ProductService.update(Number(id), data);

      res.status(HttpStatus.OK).json(product);
    } catch (error: any) {
      res
        .status(error.status || HttpStatus.INTERNAL_ERROR)
        .json({ message: error.message || INTERNAL_SERVER_ERROR_MESSAGE });
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await ProductService.logicDelete(Number(id));

      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error: any) {
      res
        .status(error.status || HttpStatus.INTERNAL_ERROR)
        .json({ message: error.message || INTERNAL_SERVER_ERROR_MESSAGE });
      next(error);
    }
  }
}
