import {S3, PutObjectCommand} from '@aws-sdk/client-s3'
import { Readable } from 'stream'
import mime from 'mime-types'
import { v4 as uuidv4 } from 'uuid'

const s3Client = new S3({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: process.env.SPACES_ENDPOINT || '',
    region: process.env.SPACES_REGION || '',
    credentials: {
      accessKeyId: process.env.SPACES_KEY || '',
      secretAccessKey: process.env.SPACES_SECRET || ''
    }
});

async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

async function uploadImage(dataStream: Readable, filename: string, key: string): Promise<string> {
  try {
      const bucketName = process.env.SPACES_BUCKET || ''

      const fileContent = await streamToBuffer(dataStream)
      const contentType = mime.lookup(filename) || 'application/octet-stream';

      // Create the PutObjectCommand
      const command = new PutObjectCommand({
          Bucket: bucketName,
          Key: key,
          Body: fileContent,
          ContentType: contentType,
          ACL: 'public-read' // Make the file publicly accessible
      });

      // Send the command to upload the file
      await s3Client.send(command);

      // Construct the public URL of the uploaded image
      const imageUrl = `${process.env.SPACES_ENDPOINT}/${bucketName}/${key}`;
      console.log(`Image uploaded successfully: ${imageUrl}`);

      return imageUrl;
  } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
  }
}

export { uploadImage };