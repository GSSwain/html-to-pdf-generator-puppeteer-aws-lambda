import { ALLOWED_CORS_DOMAIN } from "./config";

export default class PdfGenerationResponseAdapter {

  static toCreated(pdfUrl) {
    return {
      'statusCode': 201,
      "headers": {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': ALLOWED_CORS_DOMAIN,
        "location": pdfUrl
      },
      "body": JSON.stringify({ pdfUrl })
    }
  }
}