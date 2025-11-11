import prisma from '../../config/database';

import { Product } from './product.model';

export const ProductRepository = {
  findById: async (id: number): Promise<Product | null> => {
    return prisma.product.findUnique({ where: { id } });
  },

  findBySlug: async (slug: string): Promise<Product | null> => {
    return prisma.product.findUnique({ where: { slug } });
  },

  findAll: async (): Promise<Product[]> => {
    return prisma.product.findMany();
  },

  create: async (
    data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Product> => {
    return prisma.product.create({ data });
  },

  update: async (
    id: number,
    data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Product> => {
    return prisma.product.update({
      where: { id },
      data,
    });
  },

  logicDelete: async (id: number): Promise<Product> => {
    return prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  },
};
