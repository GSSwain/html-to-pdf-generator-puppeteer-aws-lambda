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
        const { pdfGenerationRequest } = this;
        const tempFilePath = await new PdfGenerationService().generate(pdfGenerationRequest);
        console.log('PDF generated');
        const pdfStorageRequest = new PdfStorageRequest(pdfGenerationRequest.fileName, tempFilePath, {
            url: pdfGenerationRequest.url
        });
        const pdfUrl = await new S3PdfStorageService().store(pdfStorageRequest);
        console.log('Pdf stored on S3');
        return PdfGenerationResponseAdapter.toCreated(pdfUrl);
    }
}