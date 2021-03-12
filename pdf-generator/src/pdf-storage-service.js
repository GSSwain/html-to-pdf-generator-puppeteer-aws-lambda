import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { PDF_STORAGE_BUCKET_NAME, PDF_STORAGE_BUCKET_REGION } from './config';
import FileService from './file-service';

const client = new S3Client({
  region: PDF_STORAGE_BUCKET_REGION
});
const s3BucketBaseUrl = `https://${PDF_STORAGE_BUCKET_NAME}.s3-${PDF_STORAGE_BUCKET_REGION}.amazonaws.com`

export default class PdfStorageService {
  constructor(s3BucketName, s3BucketKey, filePath, metadata) {
    this.s3BucketName = s3BucketName;
    this.s3BucketKey = s3BucketKey;
    this.fileReadStream = FileService.getReadStream(filePath);
    this.metadata = metadata;
  }

  async store() {
    const result = await client.send(this.toPutObjectCommandForPDF());
    console.log(result);
    return `${s3BucketBaseUrl}/${this.s3BucketKey}`;
  }

  toPutObjectCommandForPDF() {
    return new PutObjectCommand({
      Bucket: this.s3BucketName,
      Key: this.s3BucketKey,
      Body: this.fileReadStream,
      ContentType: 'application/pdf',
      ContentDisposition: 'attachment',
      CacheControl: 'no-cache',
      Metadata: this.metadata,
      Tagging: 'public=yes'
    });
  }

}