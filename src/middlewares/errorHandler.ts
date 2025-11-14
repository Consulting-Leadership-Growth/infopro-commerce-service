import { Request, Response, NextFunction } from 'express';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '../constants/http-error.constants';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _: NextFunction
) {
  console.error(err);
  res.status(500).json({
    error: `${INTERNAL_SERVER_ERROR_MESSAGE} ${req && `\n Request: ${req}`}`,
  });
}
