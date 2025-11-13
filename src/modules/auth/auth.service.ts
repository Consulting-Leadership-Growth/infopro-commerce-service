import jwt from 'jsonwebtoken';
import { ENV } from '../../config/env';
import { HttpStatus } from '../../constants/https-status';
import { IAuthenticationRequest } from '../../types/autentication-request.types';
import { HttpError } from '../../utils/httpError';
import { UserService } from '../user/user.service';
import crypto from 'crypto';

export class AuthService {
  private static readonly ERROR_MESSAGES = {
    INVALID_CREDENTIALS: 'Credenciais inválidas.',
    FAIL_TO_GENERATE_TOKEN: 'Erro ao gerar o token de autenticação.',
  };

  static generateSecretKey(): string {
    return crypto.randomBytes(256).toString('hex');
  }

  public static async userAuthentication(
    authRequest: IAuthenticationRequest
  ): Promise<string> {
    try {
      const user = await UserService.validadePassword({ ...authRequest });

      if (!user) {
        throw new HttpError(
          this.ERROR_MESSAGES.INVALID_CREDENTIALS,
          HttpStatus.UNAUTHORIZED
        );
      }

      //TODO = Entender por que o token está sendo gerado inválido.
      const token = jwt.sign(
        {
          email: authRequest.email,
          userName: authRequest.userName,
          role: user.role,
        },
        ENV.SECRET,
        { algorithm: 'HS256', expiresIn: '1h' }
      );

      return token;
    } catch (error) {
      throw new HttpError(
        this.ERROR_MESSAGES.FAIL_TO_GENERATE_TOKEN,
        HttpStatus.INTERNAL_ERROR
      );
    }
  }

  private static verifyToken(token: string): Promise<jwt.JwtPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, ENV.SECRET, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded as jwt.JwtPayload);
      });
    });
  }
}
