const express = require('express');
const authRoute = require('./routes/auth.route');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoute);


module.exports = app;