const { renderPdfFromHtml } = require('html-pdf-lite');
const { PDFValidationError, PDFGenerationError } = require('./errors.pdf.service');
const { resolvePDFOptions } = require('./options.pdf.service');

/**
 * Normalizes HTML and CSS to ensure reliable, clean rendering in PDFKit-based renderers.
 * Neutralizes flex/grid/absolute layouts and negative margins that cause text overlapping.
 *
 * @param {string} rawHtml
 * @returns {string} Sanitized and normalized HTML
 */
function normalizeHtmlForPdf(rawHtml) {
    if (!rawHtml || typeof rawHtml !== 'string') return rawHtml;

    let normalized = rawHtml;

    // Convert CSS flex and grid declarations which cause 0-height or coordinate overlap in PDFKit
    normalized = normalized.replace(/display\s*:\s*(?:inline-)?flex\s*;?/gi, 'display: block;');
    normalized = normalized.replace(/display\s*:\s*grid\s*;?/gi, 'display: block;');

    // Neutralize absolute/fixed positioning that can pull text out of normal document flow
    normalized = normalized.replace(/position\s*:\s*(?:absolute|fixed)\s*;?/gi, 'position: static;');

    // Remove negative margins that cause text to render on top of other text
    normalized = normalized.replace(/margin(?:-(?:top|bottom|left|right))?\s*:\s*-\s*\d+[^;]*;?/gi, '');

    // Replace collapsed or unstyled <hr> elements with clear dividers
    normalized = normalized.replace(/<hr\s*\/?>/gi, '<div style="border-bottom: 1px solid #d0d7de; margin: 8px 0; clear: both;"></div>');

    // Ensure common heading tags clear preceding content so titles never overlap body text
    normalized = normalized.replace(/<(h[1-6])([^>]*)>/gi, (match, tag, attrs) => {
        if (/style\s*=/i.test(attrs)) {
            return `<${tag}${attrs.replace(/style\s*=\s*(["'])/i, 'style=$1clear: both; ')}>`;
        }
        return `<${tag} style="clear: both;"${attrs}>`;
    });

    return normalized;
}

/**
 * Generates a PDF Buffer from an HTML string using html-pdf-lite.
 * Supports both function call signatures:
 *   1. makePDF(htmlString, options)
 *   2. makePDF({ html, options })
 *
 * @param {string|object} paramsOrHtml - HTML string or options object { html, options }
 * @param {object} [maybeOptions={}] - Optional render options if first argument is HTML string
 * @returns {Promise<Buffer>} - Resolves to a Node.js Buffer containing the generated PDF
 * @throws {PDFValidationError} If HTML is missing or invalid
 * @throws {PDFGenerationError} If PDF generation fails
 */
async function makePDF(paramsOrHtml, maybeOptions = {}) {
    let html;
    let options;

    if (typeof paramsOrHtml === 'string') {
        html = paramsOrHtml;
        options = maybeOptions;
    } else if (paramsOrHtml && typeof paramsOrHtml === 'object') {
        html = paramsOrHtml.html;
        options = paramsOrHtml.options || {};
    } else {
        throw new PDFValidationError(
            'makePDF requires an HTML string (received null or undefined)',
        );
    }

    if (html === undefined || html === null) {
        throw new PDFValidationError(
            'makePDF requires an HTML string (received null or undefined)',
        );
    }

    if (typeof html !== 'string') {
        throw new PDFValidationError(`makePDF requires an HTML string (received ${typeof html})`);
    }

    if (html.trim().length === 0) {
        throw new PDFValidationError('makePDF requires a non-empty HTML string');
    }

    const resolvedOptions = resolvePDFOptions(options);
    const sanitizedHtml = normalizeHtmlForPdf(html);

    try {
        const pdfBuffer = await renderPdfFromHtml(sanitizedHtml, resolvedOptions);

        if (!Buffer.isBuffer(pdfBuffer)) {
            return Buffer.from(pdfBuffer);
        }

        return pdfBuffer;
    } catch (error) {
        throw new PDFGenerationError(`Failed to generate PDF: ${error.message || String(error)}`, {
            cause: error,
        });
    }
}

module.exports = {
    makePDF,
    normalizeHtmlForPdf,
};
