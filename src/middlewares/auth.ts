import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function auth(
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization missing' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, '') as jwt.JwtPayload;

    req.params.userId = decoded.id;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    next(error);
  }
}
