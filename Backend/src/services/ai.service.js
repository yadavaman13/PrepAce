const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
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


    const prompt = `You are an expert interview coach and career counselor. Generate a comprehensive interview report for a candidate based on their resume, self-description, and the job description.

Resume Details:
${resume}

Candidate's Self Description:
${selfDescription}

Job Description:
${jobDescription}

IMPORTANT: Return ONLY valid JSON matching this EXACT structure. Do NOT add any extra fields. Do NOT create separate detail arrays.

{
  "title": "Job Title Here",
  "matchScore": 85,
  "technicalQuestions": [
    {
      "question": "The interview question text here?",
      "intention": "What the interviewer is evaluating with this question - knowledge of XYZ, understanding of ABC, ability to solve DEF problems, etc.",
      "answer": "Detailed answer covering: 1) Core concept explanation, 2) Practical examples, 3) Best practices, 4) How it applies to the job"
    },
    {
      "question": "Next technical question?",
      "intention": "Why this question matters for the role...",
      "answer": "Comprehensive answer..."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Tell me about a time when...",
      "intention": "Evaluating teamwork, leadership, problem-solving, adaptability, etc.",
      "answer": "STAR method response: Situation-Task-Action-Result with specific examples from the candidate's profile"
    },
    {
      "question": "How do you handle...?",
      "intention": "What soft skill is being tested...",
      "answer": "Detailed answer with examples..."
    }
  ],
  "skillGaps": [
    {
      "skill": "Microservices Architecture",
      "severity": "high"
    },
    {
      "skill": "CI/CD Pipelines",
      "severity": "medium"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Main topic for day 1",
      "tasks": ["Task 1", "Task 2", "Task 3"]
    },
    {
      "day": 2,
      "focus": "Main topic for day 2",
      "tasks": ["Task 1", "Task 2", "Task 3"]
    }
  ]
}

RULES:
- technicalQuestions: 6-8 questions, each question object must have "question", "intention", and "answer" TOGETHER, NOT separate
- behavioralQuestions: 4-6 questions, same structure as technical
- skillGaps: Array of objects with ONLY "skill" and "severity" fields combined, no separate arrays
- preparationPlan: 7-10 days, each day must have "day" (number), "focus" (string), and "tasks" (array of strings)
- Do NOT include extra fields like "technicalQuestionsDetails" or "skillGapsDetails"
- Severity values MUST be exactly: "low", "medium", or "high"
- Match score MUST be a number between 0 and 100
- Return ONLY the JSON object, no additional text`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    })

    console.log(JSON.parse(response.text));
}

module.exports = { generateInterviewReport }