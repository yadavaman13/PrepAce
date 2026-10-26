const { PDFValidationError } = require('./errors.pdf.service');

/**
 * Default options applied to all PDF renderings in PrepAce
 * Defaults are tuned for reliability across cloud-hosted web environments
 * (Render, Railway, AWS Lambda, Docker, Heroku) without requiring host-level Chromium
 * or variable font tables.
 */
const defaultPDFOptions = {
    margins: {
        top: 28,
        right: 36,
        bottom: 28,
        left: 36,
    },
    rootSelector: 'body',
    allowScripts: false,
    fetchExternalCss: false,
    enableInternalAnchors: true,
    autoResolveFonts: false,
    autoResolveEmojiFont: false,
    autoDownloadEmojiFont: false,
    svgScale: 2,
    svgDpi: 72,
    loadTimeoutMs: 5000,
    externalCssTimeoutMs: 5000,
    imgLoadTimeoutMs: 5000,
    ignoreInvalidImages: true,
};

/**
 * Validates and merges user options with PrepAce default options
 *
 * @param {object} [userOptions={}]
 * @returns {object} Merged configuration for html-pdf-lite
 */
function resolvePDFOptions(userOptions = {}) {
    if (userOptions !== null && typeof userOptions !== 'object') {
        throw new PDFValidationError('options must be an object');
    }

    const merged = {
        ...defaultPDFOptions,
        ...userOptions,
    };

    if (userOptions.margins && typeof userOptions.margins === 'object') {
        merged.margins = {
            ...defaultPDFOptions.margins,
            ...userOptions.margins,
        };
    }

    if (userOptions.fonts && typeof userOptions.fonts === 'object') {
        merged.fonts = {
            ...(defaultPDFOptions.fonts || {}),
            ...userOptions.fonts,
        };
    }

    if (merged.allowScripts === true) {
        if (process.env.NODE_ENV !== 'production') {
            console.warn(
                '[PDF Security Warning] allowScripts is enabled for makePDF. Ensure HTML is sanitized.',
            );
        }
    }

    return merged;
}

module.exports = {
    defaultPDFOptions,
    resolvePDFOptions,
};
