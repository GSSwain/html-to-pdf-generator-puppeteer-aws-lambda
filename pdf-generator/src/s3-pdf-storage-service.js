import { S3Client } from '@aws-sdk/client-s3';
import { PDF_STORAGE_BUCKET_NAME, PDF_STORAGE_BUCKET_REGION, MODE } from './config';
import S3PdfStorageRequestAdapter from './s3-pdf-storage-request-adapter';

const client = new S3Client({
  region: PDF_STORAGE_BUCKET_REGION
});
const s3BucketBaseUrl = `https://${PDF_STORAGE_BUCKET_NAME}.s3-${PDF_STORAGE_BUCKET_REGION}.amazonaws.com`

export default class S3PdfStorageService {

  constructor(){
    this.s3PdfStorageRequestAdapter = new S3PdfStorageRequestAdapter();
  }

  async store(pdfStorageRequest) {
    if (MODE == 'SAM_LOCAL') {
      return `https://dummyS3Url/${pdfStorageRequest.fileName}`;
    }
    const result = await client.send(this.s3PdfStorageRequestAdapter.toPutObjectCommand(pdfStorageRequest));
    console.log(result);
    return `${s3BucketBaseUrl}/${pdfStorageRequest.fileName}`;
  }
}