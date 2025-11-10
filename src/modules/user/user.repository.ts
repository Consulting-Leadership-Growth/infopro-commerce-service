import prisma from '../../config/database';
import { User } from './user.model';

export const UserRepository = {
  findById: async (id: number): Promise<User | null> => {
    return prisma.user.findUnique({ where: { id } });
  },

  findAll: async (): Promise<User[]> => {
    return prisma.user.findMany();
  },

  create: async (
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<User> => {
    return prisma.user.create({ data });
  },

  update: async (
    id: number,
    data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<User> => {
    return prisma.user.update({
      where: { id },
      data,
    });
  },
};
