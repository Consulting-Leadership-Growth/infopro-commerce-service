import { Product } from './product.model';
import { ProcutRepository } from './product.repository';

export const ProductService = {
  findById: async (id: number): Promise<Product | null> => {
    return ProcutRepository.findById(id);
  },

  findAll: async (): Promise<Product[]> => {
    return ProcutRepository.findAll();
  },

  create: async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    ProcutRepository.create(data);
  },

  update: async (
    id: number,
    data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    ProcutRepository.update(id, data);
  },

  logicDelete: async (id: number) => {
    ProcutRepository.logicDelete(id);
  },
};
