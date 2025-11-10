import { User } from './user.model';
import { UserService } from './user.service';

export const UserController = {
  findById: async (id: number) => {
    return UserService.findById(id);
  },

  findAll: async () => {
    return UserService.findAll();
  },

  create: async (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    UserService.create(data);
  },

  update: async (
    id: number,
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    UserService.update(id, data);
  },
};
