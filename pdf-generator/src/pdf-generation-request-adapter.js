import PdfGenerationRequest from "./pdf-generation-request";
const randomNumber = _ => Math.round(Math.random() * 999999999999999999);
const randomFileName = _ => `${Date.now()}_${randomNumber()}`;

export default class PdfGenerationRequestAdapter {
  constructor(event) {
    this.requestBody = JSON.parse(event.body);
    this.fileName = `${event.requestContext.requestId}_${randomFileName()}.pdf`;
  }

  toPDFGenerationRequest() {
    return new PdfGenerationRequest(this.requestBody.url, this.fileName);
  }

}