import logger from '../../utils/logger';
import { uploadToS3 } from '../../config/s3Client';
import { createHttpError } from '../../utils/httpError';
import { HttpStatus } from '../../constants/https-status';

export class S3Service {
  private static readonly ERROR_MESSAGES = {
    NOT_FOUND: 'Imagem não encontrada',
    UPLOAD_ERROR: 'Erro ao tentar fazer upload da imagem',
    GET_ERROR: 'Erro ao buscar a imagem',
  };

  private static handleError(error: any, context: string): never {
    const isHttpError = error.status;

    if (!isHttpError) {
      logger.error({ error, context }, `${context} - Erro não tratado`);
    }

    throw error;
  }

  static async uploadImage(filePath: string, key: string): Promise<string> {
    try {
      const imagePath = await uploadToS3(filePath, key);

      if (!imagePath) {
        throw createHttpError(
          this.ERROR_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND
        );
      }

      return imagePath;
    } catch (error) {
      this.handleError(error, this.ERROR_MESSAGES.UPLOAD_ERROR);
    }
  }
}
