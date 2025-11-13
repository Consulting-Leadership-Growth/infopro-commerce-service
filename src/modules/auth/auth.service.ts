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

  public static generateSecretKey(): string {
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

      const token = jwt.sign(
        {
          userId: user.id,
          role: user.role,
        },
        ENV.SECRET,
        { expiresIn: '24h' }
      );

      return token;
    } catch (error) {
      throw new HttpError(
        this.ERROR_MESSAGES.FAIL_TO_GENERATE_TOKEN,
        HttpStatus.INTERNAL_ERROR
      );
    }
  }
}
