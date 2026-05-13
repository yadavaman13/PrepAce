const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(cookieParser())
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173").split(",").map(o => o.trim());
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.route")
const interviewRouter = require("./routes/interview.route")
const appRouter = require("./routes/app.route")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)
app.use("/", appRouter)


module.exports = app