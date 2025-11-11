import { Product } from './product.model';
import { ProductRepository } from './product.repository';

export const ProductService = {
  findById: async (id: number): Promise<Product | null> => {
    return ProductRepository.findById(id);
  },

  findBySlug: async (slug: string): Promise<Product | null> => {
    return ProductRepository.findBySlug(slug);
  },

  findAll: async (): Promise<Product[]> => {
    return ProductRepository.findAll();
  },

  create: async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    ProductRepository.create(data);
  },

  update: async (
    id: number,
    data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    ProductRepository.update(id, data);
  },

  logicDelete: async (id: number) => {
    ProductRepository.logicDelete(id);
  },
};
