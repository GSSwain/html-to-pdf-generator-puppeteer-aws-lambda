import { PutObjectCommand } from '@aws-sdk/client-s3';
import FileService from './file-service';
import { PDF_STORAGE_BUCKET_NAME } from "./config";


export default class S3PdfStorageRequestAdapter {
    toPutObjectCommand(pdfStorageRequest) {
        return new PutObjectCommand({
            Bucket: PDF_STORAGE_BUCKET_NAME,
            Key: pdfStorageRequest.fileName,
            Body: FileService.getReadStream(pdfStorageRequest.filePath),
            ContentType: 'application/pdf',
            ContentDisposition: 'attachment',
            CacheControl: 'no-cache',
            Metadata: pdfStorageRequest.metadata,
            Tagging: 'public=yes'
        });
    }
}