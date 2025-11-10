import { User } from '@prisma/client';
import { UserRepository } from './user.repository';

export const UserService = {
  findById: async (id: number): Promise<User | null> => {
    return UserRepository.findById(id);
  },

  findAll: async (): Promise<User[]> => {
    return UserRepository.findAll();
  },

  create: async (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    UserRepository.create(data);
  },

  update: async (
    id: number,
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    UserRepository.update(id, data);
  },
};
