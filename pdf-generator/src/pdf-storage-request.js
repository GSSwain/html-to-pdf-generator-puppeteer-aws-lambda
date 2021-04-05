export default class PdfStorageRequest {
    constructor(s3BucketName, s3BucketKey, filePath, metadata) {
        this.s3BucketName = s3BucketName;
        this.s3BucketKey = s3BucketKey;
        this.filePath = filePath;
        this.metadata = metadata;
    }
}