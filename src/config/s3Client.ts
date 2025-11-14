import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';

const {
  INFOPRO_AWS_REGION,
  INFOPRO_AWS_ACCESS_KEY_ID,
  INFOPRO_AWS_SECRET_ACCESS_KEY,
  INFOPRO_S3_BUCKET,
} = process.env as {
  INFOPRO_AWS_REGION: string;
  INFOPRO_AWS_ACCESS_KEY_ID: string;
  INFOPRO_AWS_SECRET_ACCESS_KEY: string;
  INFOPRO_S3_BUCKET: string;
};

export const s3 = new S3Client({
  region: INFOPRO_AWS_REGION,
  credentials: {
    accessKeyId: INFOPRO_AWS_ACCESS_KEY_ID,
    secretAccessKey: INFOPRO_AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadToS3(
  filePath: string,
  key: string
): Promise<string> {
  const fileContent = fs.readFileSync(filePath);

  const command = new PutObjectCommand({
    Bucket: INFOPRO_S3_BUCKET,
    Key: key,
    Body: fileContent,
    ContentType: 'image/jpeg',
    Tagging: 'Project=infopro-commerse&Type=image',
  });

  await s3.send(command);

  return `https://${INFOPRO_S3_BUCKET}.s3.${INFOPRO_AWS_REGION}.amazonaws.com/${key}`;
}
