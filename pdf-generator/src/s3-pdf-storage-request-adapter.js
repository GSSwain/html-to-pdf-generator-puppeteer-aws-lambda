import { PutObjectCommand } from '@aws-sdk/client-s3';
import FileService from './file-service';


export default class S3PdfStorageRequestAdapter {
    toPutObjectCommand(pdfStorageRequest) {
        return new PutObjectCommand({
            Bucket: pdfStorageRequest.s3BucketName,
            Key: pdfStorageRequest.s3BucketKey,
            Body: FileService.getReadStream(pdfStorageRequest.filePath),
            ContentType: 'application/pdf',
            ContentDisposition: 'attachment',
            CacheControl: 'no-cache',
            Metadata: pdfStorageRequest.metadata,
            Tagging: 'public=yes'
        });
    }
}