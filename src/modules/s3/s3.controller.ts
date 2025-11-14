import { NextFunction, Request, Response } from 'express';
import fs from 'fs/promises';
import { ZodError } from 'zod';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '../../constants/http-error.constants';
import { HttpStatus } from '../../constants/https-status';
import { uploadBodySchema, validateFile } from './s3.schema';
import { S3Service } from './s3.service';

export class S3Controller {
  static async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { key } = uploadBodySchema.parse(req.body);

      validateFile(req.file);

      const { path } = req.file!;

      const uploadResult = await S3Service.uploadImage(path, key);

      await fs.unlink(path);

      res.status(HttpStatus.OK).json(uploadResult);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: error.issues[0].message,
        });
      }

      res.status(error.status || HttpStatus.INTERNAL_ERROR).json({
        message:
          error.message ||
          error.error[0].message ||
          INTERNAL_SERVER_ERROR_MESSAGE,
      });
      next(error);
    }
  }
}
