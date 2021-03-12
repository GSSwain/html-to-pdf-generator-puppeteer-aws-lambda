import { PDF_STORAGE_BUCKET_NAME } from "./config";
import PdfGenerationRequestAdapter from "./pdf-generation-request-adapter";
import PdfGenerationResponseAdapter from "./pdf-generation-response-adapter";
import PdfGenerationService from "./pdf-generation-service";
import PdfStorageService from "./pdf-storage-service";

export default class PdfGenerationRequestHandler {

    constructor(event) {
        this.pdfGenerationRequest = new PdfGenerationRequestAdapter(event).toPDFGenerationRequest();
    }

    async handleRequest() {
        const pdfGenerationRequest = this.pdfGenerationRequest;
        const tempFilePath = await new PdfGenerationService(pdfGenerationRequest).generatePDF();
        console.log('PDF generated');
        const pdfUrl = await new PdfStorageService(PDF_STORAGE_BUCKET_NAME, pdfGenerationRequest.fileName, tempFilePath, {
            url: pdfGenerationRequest.url
        }).store();
        console.log('Pdf stored on S3');
        return PdfGenerationResponseAdapter.toPDFCreated(pdfUrl);
    }
}