import { HttpStatus } from '../../constants/https-status';
import { createHttpError } from '../../utils/httpError';
import { logger } from '../../utils/logger';
import { Product } from './product.model';
import { ProductRepository } from './product.repository';

type CreateProductData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateProductData = Partial<
  Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
>;

export class ProductService {
  private static readonly ERROR_MESSAGES = {
    NOT_FOUND: 'Produto não encontrado',
    CREATE_ERROR: 'Erro ao criar produto',
    UPDATE_ERROR: 'Erro ao atualizar produto',
    DELETE_ERROR: 'Erro ao deletar produto',
    FETCH_ERROR: 'Erro ao buscar produtos',
  };

  private static handleError(error: any, context: string): never {
    const isHttpError = error.status;

    if (!isHttpError) {
      logger.error({ error, context }, `${context} - Erro não tratado`);
    }

    throw error;
  }

  static async findById(id: number): Promise<Product> {
    try {
      const product = await ProductRepository.findById(id);

      if (!product) {
        throw createHttpError(
          this.ERROR_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND
        );
      }

      return product;
    } catch (error) {
      this.handleError(error, this.ERROR_MESSAGES.FETCH_ERROR);
    }
  }

  static async findBySlug(slug: string): Promise<Product> {
    try {
      const product = await ProductRepository.findBySlug(slug);

      if (!product) {
        throw createHttpError(
          this.ERROR_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND
        );
      }

      return product;
    } catch (error) {
      this.handleError(error, this.ERROR_MESSAGES.FETCH_ERROR);
    }
  }

  static async findAll(): Promise<Product[]> {
    try {
      return await ProductRepository.findAll();
    } catch (error) {
      this.handleError(error, this.ERROR_MESSAGES.FETCH_ERROR);
    }
  }

  static async create(data: CreateProductData): Promise<Product> {
    try {
      logger.info('Criando novo produto');
      const product = await ProductRepository.create(data);
      logger.info({ productId: product.id }, 'Produto criado com sucesso');
      return product;
    } catch (error) {
      this.handleError(error, this.ERROR_MESSAGES.CREATE_ERROR);
    }
  }

  static async update(id: number, data: UpdateProductData): Promise<Product> {
    try {
      await this.findById(id);

      logger.info({ productId: id }, 'Atualizando produto');
      const product = await ProductRepository.update(id, data);
      logger.info({ productId: id }, 'Produto atualizado com sucesso');
      return product;
    } catch (error) {
      this.handleError(error, this.ERROR_MESSAGES.UPDATE_ERROR);
    }
  }

  static async logicDelete(id: number): Promise<Product> {
    try {
      await this.findById(id);

      logger.info({ productId: id }, 'Deletando produto (remoção lógica)');
      const product = await ProductRepository.logicDelete(id);
      logger.info({ productId: id }, 'Produto deletado com sucesso');
      return product;
    } catch (error) {
      this.handleError(error, this.ERROR_MESSAGES.DELETE_ERROR);
    }
  }

  static async hardDelete(id: number): Promise<Product> {
    try {
      await this.findById(id);

      logger.warn({ productId: id }, 'Deletando produto permanentemente');
      const product = await ProductRepository.hardDelete(id);
      logger.info({ productId: id }, 'Produto permanentemente deletado');
      return product;
    } catch (error) {
      this.handleError(error, this.ERROR_MESSAGES.DELETE_ERROR);
    }
  }

  static async findByIds(ids: number[]): Promise<Product[]> {
    try {
      if (!ids || ids.length === 0) {
        return [];
      }

      return await ProductRepository.findByIds(ids);
    } catch (error) {
      this.handleError(error, this.ERROR_MESSAGES.FETCH_ERROR);
    }
  }

  static async count(): Promise<number> {
    try {
      return await ProductRepository.count();
    } catch (error) {
      this.handleError(error, this.ERROR_MESSAGES.FETCH_ERROR);
    }
  }

  static async exists(id: number): Promise<boolean> {
    try {
      return await ProductRepository.exists(id);
    } catch (error) {
      this.handleError(error, this.ERROR_MESSAGES.FETCH_ERROR);
    }
  }
}
