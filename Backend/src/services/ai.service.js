const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { makePDF } = require("./pdf")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `You are an expert interview coach.
                    Analyze the candidate profile against the target role and generate an interview preparation report.

                    Candidate Resume:
                    ${resume}

                    Candidate Self Description:
                    ${selfDescription}

                    Target Job Description:
                    ${jobDescription}`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: z.toJSONSchema(interviewReportSchema)
        }
    })


    return JSON.parse(response.text);
}

/**
 * Converts HTML content to PDF Buffer using the lightweight PDF service
 * @param {string} htmlContent - HTML string to render
 * @param {object} [options={}] - Optional PDF rendering options
 * @returns {Promise<Buffer>}
 */
async function generatePdfFromHtml(htmlContent, options = {}) {
    return await makePDF(htmlContent, options);
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const resumepdfSchema = z.object({
        html: z.string().describe("Complete, self-contained HTML document of the resume designed for clean ATS-compliant PDF conversion")
    })

    const prompt = `You are a professional executive resume writer and ATS optimization specialist.
Generate a tailored, high-impact, professional resume for a candidate with the following details:
Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Target Job Description:
${jobDescription}

The response must be a JSON object with a single field "html" containing a COMPLETE HTML document (including <!DOCTYPE html>, <html>, <head>, <style>, and <body>).

MANDATORY DESIGN & PDF RENDERING RULES:
1. The PDF renderer is PDFKit-based. To guarantee zero text overlap and perfect layout fidelity:
   - DO NOT use CSS Flexbox (no "display: flex" or "display: inline-flex").
   - DO NOT use CSS Grid (no "display: grid").
   - DO NOT use "float: left" or "float: right".
   - DO NOT use "position: absolute" or "position: fixed".
   - DO NOT use negative margins.
   - For all two-column alignments (e.g., Job/Project Title on left and Dates/Links on right; Degree on left and Graduation Year on right), ALWAYS use standard HTML <table> with width="100%":
     <table width="100%" style="border-collapse: collapse; margin-top: 3px; margin-bottom: 2px;">
       <tr>
         <td style="text-align: left; font-weight: bold; font-size: 10pt; color: #111111; vertical-align: top;">Title / Project Name</td>
         <td style="text-align: right; font-size: 9pt; color: #555555; vertical-align: top; white-space: nowrap;">Dates / Links</td>
       </tr>
     </table>

2. Header & Contact Information:
   - Candidate Name: <div style="font-size: 20pt; font-weight: bold; color: #0f355c; text-align: center; margin-bottom: 4px; letter-spacing: 0.5px;">Candidate Name</div>
   - Contact row 1: Location, Phone, Email separated by " &bull; " on ONE centered line:
     <div style="text-align: center; font-size: 9pt; color: #444444; margin-bottom: 3px;">City, State &bull; +91 XXXXXXXXXX &bull; email@example.com</div>
   - Contact row 2: Links (LinkedIn, GitHub, Portfolio) separated by " &bull; " on ONE centered line with styled <a> tags:
     <div style="text-align: center; font-size: 9pt; margin-bottom: 8px;"><a href="..." style="color: #0b5394; text-decoration: none;">LinkedIn</a> &bull; <a href="..." style="color: #0b5394; text-decoration: none;">GitHub</a> &bull; <a href="..." style="color: #0b5394; text-decoration: none;">Portfolio</a></div>

3. Section Titles:
   - Professional Summary, Technical Skills, Key Projects, Experience, Education, Achievements & Certifications.
   - Every section header must have a solid bottom border directly on the heading:
     <div style="font-size: 11pt; font-weight: bold; color: #0f355c; text-transform: uppercase; letter-spacing: 0.8px; border-bottom: 1.5px solid #0f355c; padding-bottom: 2px; margin-top: 10px; margin-bottom: 6px; clear: both;">SECTION TITLE</div>
   - Wrap each section in a container with style="margin-bottom: 8px; page-break-inside: avoid; clear: both;".

4. Key Projects Section:
   - For EACH project, ALWAYS include:
     a) Clear Project Name in bold (in the left table cell).
     b) GitHub and Live demo links (in the right table cell).
     c) Subtitle line listing Tech Stack in italics (e.g. <div style="font-size: 9pt; font-style: italic; color: #444444; margin-bottom: 3px;">Tech Stack: Node.js, Express, MongoDB, Socket.io</div>).
     d) 2 to 3 bullet points (<ul style="margin-left: 14px; margin-top: 2px; margin-bottom: 5px;">) detailing achievements with action verbs and quantifiable results.

5. Technical Skills Section:
   - Group by clear categories (e.g., Languages, Web Technologies, Databases & Tools, Core Fundamentals).
   - Format: <div style="font-size: 9.5pt; margin-bottom: 3px; line-height: 1.35;"><strong style="color: #111111;">Category:</strong> Skills listed separated by commas</div>.

6. General Page & Typography:
   - Font family: Helvetica, Arial, sans-serif.
   - Base font-size: 9.5pt or 10pt with line-height: 1.35.
   - Body margin: 0; padding: 0.
   - Keep the resume clean, ATS-compliant, strictly 1 page (or 2 pages if extensive experience).
`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: z.toJSONSchema(resumepdfSchema),
        }
    })

    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer
}

module.exports = { generateInterviewReport, generateResumePdf, generatePdfFromHtml }