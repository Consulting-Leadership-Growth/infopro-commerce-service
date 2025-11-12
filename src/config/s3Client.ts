import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';

// Tipagem para variáveis de ambiente
const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET } =
  process.env as {
    AWS_REGION: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    S3_BUCKET: string;
  };

export const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadToS3(
  filePath: string,
  key: string
): Promise<string> {
  const fileContent = fs.readFileSync(filePath);

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    Body: fileContent,
    ContentType: 'image/jpeg',
    Tagging: 'Project=infopro-commerse&Type=image',
  });

  await s3.send(command);

  return `https://${S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${key}`;
}
