import { HttpStatus } from '../../constants/https-status';
import { createHttpError } from '../../utils/httpError';
import logger from '../../utils/logger';
import { User } from './user.model';
import { UserRepository } from './user.repository';

type CreateUserData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateUserData = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

export class UserService {
  private static readonly ERROR_MESSAGES = {
    NOT_FOUND: 'Usuário não encontrado',
    CREATE_ERROR: 'Erro ao criar usuário',
    UPDATE_ERROR: 'Erro ao atualizar usuário',
    DELETE_ERROR: 'Erro ao deletar usuário',
    FETCH_ERROR: 'Erro ao buscar usuários',
  };

  private static handleError(error: any, context: string): never {
    const isHttpError = error.status;

    if (!isHttpError) {
      logger.error({ error, context }, `${context} - Erro não tratado`);
    }

    throw error;
  }

  static async findById(id: number): Promise<User> {
    try {
      const user = await UserRepository.findById(id);

      if (!user) {
        throw createHttpError(
          this.ERROR_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND
        );
      }

      return user;
    } catch (error) {
      this.handleError(error, this.ERROR_MESSAGES.FETCH_ERROR);
    }
  }

  static async findAll(): Promise<User[]> {
    try {
      return await UserRepository.findAll();
    } catch (error) {
      this.handleError(error, this.ERROR_MESSAGES.FETCH_ERROR);
    }
  }

  static async create(data: CreateUserData): Promise<User> {
    try {
      logger.info('Criando novo usuário');
      const user = await UserRepository.create(data);
      logger.info({ userId: user.id }, 'Usuário criado com sucesso');
      return user;
    } catch (error) {
      this.handleError(error, this.ERROR_MESSAGES.CREATE_ERROR);
    }
  }

  static async update(id: number, data: UpdateUserData): Promise<User> {
    try {
      await this.findById(id);

      logger.info({ userId: id }, 'Atualizando usuário');
      const user = await UserRepository.update(id, data);
      logger.info({ userId: id }, 'Usuário atualizado com sucesso');
      return user;
    } catch (error) {
      this.handleError(error, this.ERROR_MESSAGES.UPDATE_ERROR);
    }
  }
}
