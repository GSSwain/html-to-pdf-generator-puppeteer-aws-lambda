import PdfGenerationRequestHandler from "./pdf-generation-request-handler";

exports.handler = async (event, context) => {
  try {
    return new PdfGenerationRequestHandler(event).handleRequest();
  } catch (err) {
    console.log(err);
    return err;
  }
};