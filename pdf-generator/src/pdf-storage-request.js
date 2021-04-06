export default class PdfStorageRequest {
    constructor(fileName, filePath, metadata) {
        this.fileName = fileName;
        this.filePath = filePath;
        this.metadata = metadata;
    }
}