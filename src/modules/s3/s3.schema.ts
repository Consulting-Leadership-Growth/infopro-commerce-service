import { z } from 'zod';

export const uploadBodySchema = z.object({
  key: z
    .string({
      error: "O campo 'key' é obrigatório.",
    })
    .min(3, "O 'key' deve ter pelo menos 3 caracteres."),
});

export const validateFile = (file?: Express.Multer.File) => {
  if (!file) throw new Error('Arquivo não enviado.');
  if (!file.mimetype.startsWith('image/'))
    throw new Error('Somente imagens são permitidas.');
};
