import PdfGenerationRequestAdapter from "./pdf-generation-request-adapter";
import PdfGenerationResponseAdapter from "./pdf-generation-response-adapter";
import PdfGenerationService from "./pdf-generation-service";
import PdfStorageRequest from "./pdf-storage-request";
import S3PdfStorageService from "./s3-pdf-storage-service";

export default class PdfGenerationRequestHandler {

    constructor(event) {
        this.pdfGenerationRequest = new PdfGenerationRequestAdapter(event).toPdfGenerationRequest();
    }

    async handleRequest() {
        const generatedPdfFilePath = await new PdfGenerationService().generate(this.pdfGenerationRequest);
        console.log('PDF generated');
        const pdfUrl = await new S3PdfStorageService().store(this.getPdfStorageRequest(generatedPdfFilePath));
        console.log('Pdf stored on S3');
        return PdfGenerationResponseAdapter.toCreated(pdfUrl);
    }

    getPdfStorageRequest(pdfFilePath) {
        return new PdfStorageRequest(this.pdfGenerationRequest.fileName, pdfFilePath, {
            url: this.pdfGenerationRequest.url
        });
    }
}