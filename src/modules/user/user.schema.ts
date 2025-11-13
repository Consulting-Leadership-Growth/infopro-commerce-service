import { z } from 'zod';

export const createUserBodySchema = z.object({
  name: z
    .string({ error: "O campo 'name' é obrigatório." })
    .nonempty({ message: "O campo 'name' não pode estar vazio." }),
  userName: z
    .string({ error: "O campo 'userName' é obrigatório." })
    .nonempty({ message: "O campo 'userName' não pode estar vazio." }),
  email: z
    .email({ message: "O campo 'email' deve ser um email válido." })
    .nonempty({ message: "O campo 'email' é obrigatório." }),
  password: z
    .string({ error: "O campo 'password' é obrigatório." })
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    .nonempty({ message: "O campo 'password' não pode estar vazio." }),
});
