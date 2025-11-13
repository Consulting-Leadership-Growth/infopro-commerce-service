import { NextFunction, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '../../constants/http-error.constants';
import { HttpStatus } from '../../constants/https-status';
import { IAuthenticationRequest } from '../../types/autentication-request.types';
import { authenticationBodySchema } from './auth.schema';
import { AuthService } from './auth.service';

export class AuthController {
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const authRequest: IAuthenticationRequest =
        authenticationBodySchema.parse(req.body);

      const authenticatedToken =
        await AuthService.userAuthentication(authRequest);

      return res.status(HttpStatus.OK).json({ token: authenticatedToken });
    } catch (error: any) {
      res
        .status(error.status || HttpStatus.INTERNAL_ERROR)
        .json({ message: error.message || INTERNAL_SERVER_ERROR_MESSAGE });
      next(error);
    }
  }

  static async generateKey(_: Request, res: Response, next: NextFunction) {
    try {
      const secretKey = AuthService.generateSecretKey();
      return res.status(HttpStatus.OK).json({ secretKey });
    } catch (error: any) {
      res
        .status(error.status || HttpStatus.INTERNAL_ERROR)
        .json({ message: error.message || INTERNAL_SERVER_ERROR_MESSAGE });
      next(error);
    }
  }

  static async validateAdminAuth(
    req: Request<{ userId: string; userRole: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.userId;
      const userRole = req.userRole;

      if (!userId || !userRole) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'User params are missing in the request.' });
      }

      if (userRole !== 'admin') {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: 'Access denied. Admins only.' });
      }

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Admin authentication validated successfully.' });
    } catch (error: any) {
      res
        .status(error.status || HttpStatus.INTERNAL_ERROR)
        .json({ message: error.message || INTERNAL_SERVER_ERROR_MESSAGE });
      next(error);
    }
  }
}
