const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const defaultOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
const configuredOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "")
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
const allowedOrigins = configuredOrigins.length ? configuredOrigins : defaultOrigins;

//all routers
const authRouter = require('./routes/auth.route');
const interviewRouter = require('./routes/interview.route');

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        if (isProduction) return callback(new Error('Not allowed by CORS'));
        return callback(null, true);
    },
    credentials: true
}));

//using all routes
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

const frontendDistPath = path.join(__dirname, '../../Frontend/dist');
if (fs.existsSync(frontendDistPath)) {
    app.use(express.static(frontendDistPath));

    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.join(frontendDistPath, 'index.html'));
    });
}


module.exports = app;