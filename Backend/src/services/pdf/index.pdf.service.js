const { makePDF, normalizeHtmlForPdf } = require('./render.pdf.service');
const { defaultPDFOptions, resolvePDFOptions } = require('./options.pdf.service');
const { PDFError, PDFValidationError, PDFGenerationError } = require('./errors.pdf.service');

module.exports = {
    makePDF,
    normalizeHtmlForPdf,
    defaultPDFOptions,
    resolvePDFOptions,
    PDFError,
    PDFValidationError,
    PDFGenerationError,
};
