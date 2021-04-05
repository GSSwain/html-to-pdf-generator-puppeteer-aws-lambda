import chromium from 'chrome-aws-lambda';
const DEFAULT_PRINT_OPTIONS = {
  format: 'a4',
  printBackground: true,
  scale: 0.97
};
export default class PdfGenerationService {

  async generate(pdfGenerationRequest, htmlToPdfPrintOptions = DEFAULT_PRINT_OPTIONS) {
    const browser = await this.launchBrowser();
    const page = await browser.newPage();
    await page.goto(pdfGenerationRequest.url, {
      waitUntil: 'networkidle0'
    });
    const tempFilePath = `/tmp/${pdfGenerationRequest.fileName}`;
    await page.pdf({
      path: tempFilePath,
      ...htmlToPdfPrintOptions
    });
    await browser.close();
    return tempFilePath;
  }


  async launchBrowser() {
    return await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true
    });
  }
}