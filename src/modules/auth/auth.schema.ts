import { z } from 'zod';

const userNameSchema = z.string({
  error: "O campo 'userName' é obrigatório quando 'email' não é fornecido.",
});

const emailSchema = z
  .email({
    message: "O campo 'email' deve ser um email válido.",
  })
  .nonempty({
    message: "O campo 'email' é obrigatório quando 'userName' não é fornecido.",
  });

const passwordSchema = z
  .string({
    error: "O campo 'password' é obrigatório.",
  })
  .min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  .nonempty({ message: "O campo 'password' não pode estar vazio." });

const authWithEmail = z.object({
  email: emailSchema,
  password: passwordSchema,
  userName: z.string().optional(),
});

const authWithUserName = z.object({
  userName: userNameSchema,
  password: passwordSchema,
  email: z.string().optional(),
});

export const authenticationBodySchema = authWithEmail
  .or(authWithUserName)
  .superRefine((val, ctx) => {
    if (!val.email && !val.userName) {
      ctx.addIssue({
        code: 'custom',
        message:
          "Pelo menos um dos campos 'email' ou 'userName' deve ser fornecido.",
        path: ['email_or_userName'],
      });
    }
  });

export type AuthenticationBody = z.infer<typeof authenticationBodySchema>;
