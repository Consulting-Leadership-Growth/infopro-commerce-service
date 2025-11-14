import { Prisma } from '@prisma/client';
import prisma from '../../config/database';
import { User } from './user.model';
import logger from '../../utils/logger';

type CreateUserData = Omit<User, 'id' | 'createdAt' | 'updatedAt'> & {
  role: string;
};
type UpdateUserData = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

export class UserRepository {
  private static readonly TABLE = 'user';

  private static handleDatabaseError(error: any, context: string): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      logger.error(
        { error: error.code, context },
        `Erro de banco de dados: ${error.message}`
      );
    }
    throw error;
  }

  static async findById(id: number): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      this.handleDatabaseError(error, `${this.TABLE}.findById`);
    }
  }

  static async findAll(options?: {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    skip?: number;
    take?: number;
  }): Promise<User[]> {
    try {
      return await prisma.user.findMany({
        where: options?.where,
        orderBy: options?.orderBy || { createdAt: 'desc' },
        skip: options?.skip,
        take: options?.take,
      });
    } catch (error) {
      this.handleDatabaseError(error, `${this.TABLE}.findAll`);
    }
  }

  static async findByIds(ids: number[]): Promise<User[]> {
    try {
      return await prisma.user.findMany({
        where: { id: { in: ids } },
      });
    } catch (error) {
      this.handleDatabaseError(error, `${this.TABLE}.findByIds`);
    }
  }

  static async findByEmail(email: string): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      this.handleDatabaseError(error, `${this.TABLE}.findByEmail`);
    }
  }

  static async findByUserName(userName: string): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: { userName },
      });
    } catch (error) {
      this.handleDatabaseError(error, `${this.TABLE}.findByUserName`);
    }
  }

  static async create(data: CreateUserData): Promise<User> {
    try {
      logger.debug({ data }, 'Criando novo usuário no banco');
      return await prisma.user.create({ data });
    } catch (error) {
      this.handleDatabaseError(error, `${this.TABLE}.create`);
    }
  }

  static async update(id: number, data: UpdateUserData): Promise<User> {
    try {
      logger.debug({ id, data }, 'Atualizando usuário no banco');
      return await prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      this.handleDatabaseError(error, `${this.TABLE}.update`);
    }
  }

  static async delete(id: number): Promise<User> {
    try {
      logger.warn({ userId: id }, 'Deletando usuário permanentemente');
      return await prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      this.handleDatabaseError(error, `${this.TABLE}.delete`);
    }
  }
}
