import { ProductService } from './product.service';
import { Product } from './product.model';

export const ProductController = {
  findBy: async (id: number) => {
    return ProductService.findById(id);
  },

  findAll: async () => {
    return ProductService.findAll();
  },

  create: async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    ProductService.create(data);
  },

  update: async (
    id: number,
    data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    ProductService.update(id, data);
  },

  logicDelete: async (id: number) => {
    ProductService.logicDelete(id);
  },
};
