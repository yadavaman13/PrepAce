const interviewReportModel = require("../models/interviewReport.model");
const pdfParse = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service")


async function generateInterviewReportController(req,res){

    // const resumeContent = await ( new pdfParse.PDFParse(Uint8Array.from(req.file.buffer)) ).getText()
    // const resumeContent = await pdfParse(req.file.buffer)

    const data = await (new pdfParse.PDFParse(req.file.buffer))
    const resumeContent = data.text
    const {selfDescription, jobDescription} = req.body;

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message: "Interview report created successfully",
        interviewReport
    })
}

module.exports = {generateInterviewReportController}