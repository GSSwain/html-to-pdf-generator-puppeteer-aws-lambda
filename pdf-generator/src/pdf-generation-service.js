import chromium from 'chrome-aws-lambda';
const DEFAULT_PRINT_OPTIONS = {
  format: 'a4',
  printBackground: true,
  scale: 0.97
};
export default class PdfGenerationService {
  constructor(pdfGenerationRequest) {
    this.pdfGenerationRequest = pdfGenerationRequest;
  }

  async generatePDF(htmlToPDFPrintOptions = DEFAULT_PRINT_OPTIONS) {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();
    await page.goto(this.pdfGenerationRequest.url, {
      waitUntil: 'networkidle0'
    });
    const tempFilePath = `/tmp/${this.pdfGenerationRequest.fileName}`;
    await page.pdf({
      path: tempFilePath,
      ...htmlToPDFPrintOptions
    });
    await browser.close();
    return tempFilePath;
  }

}