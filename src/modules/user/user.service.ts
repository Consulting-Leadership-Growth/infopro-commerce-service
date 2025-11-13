import { HttpStatus } from '../../constants/https-status';
import { createHttpError } from '../../utils/httpError';
import { User } from './user.model';
import { UserRepository } from './user.repository';

import logger from '../../utils/logger';
import { BycriptUtils } from '../../utils/bycript.utils';
import { UserProfile } from '../../constants/users-profiles';
import { th } from 'zod/v4/locales';
import { IAuthenticationRequest } from '../../types/autentication-request.types';

type CreateUserData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateUserData = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

export class UserService {
  private static readonly ERROR_MESSAGES = {
    NOT_FOUND: 'Usuário não encontrado',
    CREATE_ERROR: 'Erro ao criar usuário',
    UPDATE_ERROR: 'Erro ao atualizar usuário',
    DELETE_ERROR: 'Erro ao deletar usuário',
    FETCH_ERROR: 'Erro ao buscar usuários',
    VALIDADE_PASSWORD_ERROR: 'Erro ao validar senha do usuário',
    FIND_BY_USERNAME_AND_EMAIL_ERROR: 'Email ou userName deve ser fornecido',
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

      const hashedPassword = await BycriptUtils.hashPassword(data.password);

      const user = await UserRepository.create({
        ...data,
        password: hashedPassword,
        role: UserProfile.ADMIN,
      });

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

  static async validadePassword({
    password,
    email,
    userName,
  }: IAuthenticationRequest): Promise<User | null> {
    try {
      const user = email
        ? await UserRepository.findByEmail(email)
        : userName
          ? await UserRepository.findByUserName(userName)
          : new Error(this.ERROR_MESSAGES.FIND_BY_USERNAME_AND_EMAIL_ERROR);

      if (user instanceof Error) {
        throw user;
      }

      if (!user) {
        return null;
      }

      const isPasswordValid = await BycriptUtils.comparePassword(
        password,
        user.password
      );

      if (!isPasswordValid) {
        return null;
      }

      return user;
    } catch (error) {
      this.handleError(error, this.ERROR_MESSAGES.VALIDADE_PASSWORD_ERROR);
    }
  }
}
