import { Prisma } from '@prisma/client';
import prisma from '../../config/database';
import { logger } from '../../utils/logger';
import { Product } from './product.model';

type CreateProductData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateProductData = Partial<
  Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
>;

export class ProductRepository {
  private static readonly TABLE = 'product';

  private static handleDatabaseError(error: any, context: string): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      logger.error(
        { error: error.code, context },
        `Erro de banco de dados: ${error.message}`
      );
    }
    throw error;
  }

  static async findById(id: number): Promise<Product | null> {
    try {
      return await prisma.product.findUnique({
        where: { id },
      });
    } catch (error) {
      this.handleDatabaseError(error, `${this.TABLE}.findById`);
    }
  }

  static async findBySlug(slug: string): Promise<Product | null> {
    try {
      return await prisma.product.findUnique({
        where: { slug },
      });
    } catch (error) {
      this.handleDatabaseError(error, `${this.TABLE}.findBySlug`);
    }
  }

  static async findAll(options?: {
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
    skip?: number;
    take?: number;
  }): Promise<Product[]> {
    try {
      return await prisma.product.findMany({
        where: options?.where,
        orderBy: options?.orderBy || { createdAt: 'desc' },
        skip: options?.skip,
        take: options?.take,
      });
    } catch (error) {
      this.handleDatabaseError(error, `${this.TABLE}.findAll`);
    }
  }

  static async findByIds(ids: number[]): Promise<Product[]> {
    try {
      return await prisma.product.findMany({
        where: { id: { in: ids } },
      });
    } catch (error) {
      this.handleDatabaseError(error, `${this.TABLE}.findByIds`);
    }
  }

  static async create(data: CreateProductData): Promise<Product> {
    try {
      logger.debug({ data }, 'Criando novo produto no banco');
      return await prisma.product.create({ data });
    } catch (error) {
      this.handleDatabaseError(error, `${this.TABLE}.create`);
    }
  }

  static async update(id: number, data: UpdateProductData): Promise<Product> {
    try {
      logger.debug({ id, data }, 'Atualizando produto no banco');
      return await prisma.product.update({
        where: { id },
        data,
      });
    } catch (error) {
      this.handleDatabaseError(error, `${this.TABLE}.update`);
    }
  }

  static async logicDelete(id: number): Promise<Product> {
    try {
      logger.debug({ id }, 'Deletando produto (soft delete)');
      return await prisma.product.update({
        where: { id },
        data: { isActive: false },
      });
    } catch (error) {
      this.handleDatabaseError(error, `${this.TABLE}.logicDelete`);
    }
  }

  static async hardDelete(id: number): Promise<Product> {
    try {
      logger.debug({ id }, 'Deletando produto permanentemente');
      return await prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      this.handleDatabaseError(error, `${this.TABLE}.hardDelete`);
    }
  }

  static async count(where?: Prisma.ProductWhereInput): Promise<number> {
    try {
      return await prisma.product.count({ where });
    } catch (error) {
      this.handleDatabaseError(error, `${this.TABLE}.count`);
    }
  }

  static async exists(id: number): Promise<boolean> {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        select: { id: true },
      });
      return product !== null;
    } catch (error) {
      this.handleDatabaseError(error, `${this.TABLE}.exists`);
    }
  }
}
