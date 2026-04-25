<div align="center">

# PrepAce

### From prep to offer, ace every step.

<p>
  AI-powered interview preparation and resume optimization platform built to help candidates turn applications into offers.
</p>

<p>
  <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Google_GenAI-Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google GenAI" />
  <img src="https://img.shields.io/badge/PDF-Puppeteer-D24939?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Puppeteer" />
</p>

<p>
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/Build-Vite%20Ready-646CFF?style=flat-square" alt="Build" />
  <img src="https://img.shields.io/badge/Auth-JWT%20Cookies-orange?style=flat-square" alt="Auth" />
  <img src="https://img.shields.io/badge/AI-Gemini-blue?style=flat-square" alt="AI" />
  <img src="https://img.shields.io/badge/License-Not%20Set-lightgrey?style=flat-square" alt="License" />
</p>

<p>
  <a href="#-getting-started"><strong>Quick Start</strong></a> •
  <a href="#-deployment-strategy"><strong>Deployment</strong></a> •
  <a href="#-routes-and-api"><strong>API Routes</strong></a> •
  <a href="#-contributing"><strong>Contributing</strong></a>
</p>

</div>

---

## 📚 Table of Contents
- [Why PrepAce](#why-prepace)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [User Journey](#user-journey)
- [Routes and API](#routes-and-api)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment Strategy](#deployment-strategy)
- [Production Checklist](#production-checklist)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Why PrepAce

Most candidates struggle with scattered preparation: resume tweaks in one place, mock prep in another, and no clear execution plan.

PrepAce unifies everything in one workflow:
1. Analyze your profile against a target role
2. Generate interview preparation strategy
3. Surface skill gaps and an actionable roadmap
4. Export a role-tailored, ATS-friendly resume PDF

### 🌟 What Makes It Stand Out
- AI-driven strategy instead of generic tips
- Interview Q&A with intent-focused guidance
- Day-wise prep planning for execution, not just advice
- Resume generation tightly coupled with target JD
- End-to-end experience from profile input to downloadable output

---

## 🎯 Key Features

### 👤 Candidate Experience
- Authentication with protected routes
- Job-description-led analysis
- Resume upload (PDF) or self-description input
- Personalized report generation
- Match score and skill-gap insights
- Downloadable role-tailored PDF resume

### 🧠 Interview Intelligence
- Technical questions with answer frameworks
- Behavioral questions with intent and response strategy
- Preparation roadmap with daily focus and tasks

### ⚡ Productivity and UX
- Recent report history
- Report detail page with section navigation
- One-click Back to Home navigation and resume download flow

---

## 🛠️ Tech Stack

### 🎨 Frontend
- React 19
- React Router 7
- Vite 7
- Axios
- Sass/SCSS

### ⚙️ Backend
- Node.js + Express 5
- MongoDB + Mongoose
- JWT authentication using HTTP cookies
- Multer for file uploads
- pdf-parse for PDF text extraction
- Google GenAI SDK for report and resume content generation
- Puppeteer for server-side PDF rendering

### 🗄️ Data Models
- users
- blacklistTokens
- InterviewReport

---

## 🧱 System Architecture

```text
Frontend (React + Vite)
    |
    |  Axios requests (with cookies)
    v
Backend API (Express)
    |
    |-- MongoDB (users, reports, token blacklist)
    |-- Google GenAI (report + resume generation)
    '-- Puppeteer (HTML -> PDF)
```

High-level flow:
1. User submits profile and target job details
2. Backend extracts resume text and calls AI service
3. Report saved in MongoDB
4. Frontend renders strategic interview plan
5. Resume PDF generated and streamed for download on demand

---

## 📁 Project Structure

```text
GenAI-Resume-Analysis/
├── Backend/
│   ├── server.js
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── db/
│       ├── routes/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       └── services/
└── Frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── app.routes.jsx
        └── features/
            ├── auth/
            └── interview/
```

---

## 🚀 User Journey

1. Register or login
2. Open dashboard
3. Add target job description
4. Upload resume or write self-description
5. Generate interview report
6. Review:
   - Technical Questions
   - Behavioral Questions
   - Preparation Roadmap
   - Match Score
   - Skill Gaps
7. Download tailored resume PDF

---

## 🔌 Routes and API

### 🖥️ Frontend Routes
- /login
- /register
- /
- /interview
- /interview/:interviewId

### 🌐 Backend API

Auth routes:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/logout
- GET /api/auth/get-me

Interview routes:
- POST /api/interview (multipart form-data with resume)
- GET /api/interview
- GET /api/interview/report/:interviewId
- POST /api/interview/resume/pdf/:interviewReportId

---

## 🏁 Getting Started

### ✅ Prerequisites
- Node.js 18+
- npm 9+
- MongoDB Atlas URI (or local MongoDB)
- Google GenAI API key

### 1. Install Dependencies

Backend terminal:
```bash
cd Backend
npm install
```

Frontend terminal:
```bash
cd Frontend
npm install
```

### 2. Configure Backend Environment

Create Backend/.env:

```env
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
GOOGLE_GENAI_API_KEY=<your_genai_api_key>
```

### 3. Run Locally

Backend:
```bash
cd Backend
npm run dev
```

Frontend:
```bash
cd Frontend
npm run dev
```

Local URLs:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

---

## 🔐 Environment Variables

### Required
- MONGO_URI
- JWT_SECRET
- GOOGLE_GENAI_API_KEY

### Recommended for Deployment
- PORT
- NODE_ENV
- CLIENT_URL or CLIENT_URLS

---

## 📜 Scripts

### Backend
- npm run dev: Start backend using nodemon

### Frontend
- npm run dev: Start Vite dev server
- npm run build: Build production assets
- npm run preview: Preview built assets
- npm run lint: Run ESLint

---

## 🌍 Deployment Strategy

### Recommended (balanced cost + maintainability)
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

### Alternative (single-service simplicity)
Serve frontend build through backend and deploy one service to Render or Railway.

Benefits:
- Same-origin cookies
- Reduced CORS complexity
- Single public URL

Tradeoff:
- Frontend and backend scale together

### 🔄 GitHub Auto Deploy
Vercel, Render, and Railway all support automatic deployments on push.

---

## ✅ Production Checklist

1. Use process.env.PORT for backend runtime port
2. Replace hardcoded frontend API URL with env config
3. Configure CORS with deployment domain(s)
4. Apply secure cookie options in production
5. Validate Puppeteer runtime compatibility on your host
6. Add centralized error logging and request tracing

---

## 🩺 Troubleshooting

### Backend fails to start
- Check MONGO_URI
- Check GOOGLE_GENAI_API_KEY
- Confirm Node 18+

### Authentication issues after deployment
- Verify cookie settings and CORS origin allowlist
- Confirm frontend and backend URLs are aligned

### Resume PDF generation failure
- Check Puppeteer and Chromium runtime support
- Check server logs for launch/permission issues
- Validate GenAI quota and key access

---

## 🗺️ Roadmap
- Better frontend form validation and user-facing errors
- Centralized backend error handler
- Unit and integration tests
- Rate limiting and abuse protection
- Usage analytics and reporting dashboard

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit meaningful changes
4. Push to your branch
5. Open a pull request

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/yadavaman13">Yadav Aman</a>
  
  If you found this helpful, please give it a ⭐!
</div>
