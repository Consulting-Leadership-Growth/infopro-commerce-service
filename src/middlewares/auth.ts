import { Request, Response, NextFunction } from 'express';
import { ENV } from '../config/env';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: string;
    }
  }
}

export function auth(
  req: Request<{ userId: string; userRole: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization missing' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, ENV.SECRET) as jwt.JwtPayload;

    req.userId = decoded.userId;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    next(error);
  }
}
