import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middlewares/errorHandler.middleware.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN || "https://hermanos-lms-assignment-n8v4.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))


app.use(cookieParser())
app.use(express.urlencoded({ limit: "16kb", extended: true }))
app.use(express.json())
app.use(express.static("public"))

// routes
import userRoutes from "./routes/user.route.js"
import courseRoutes from "./routes/course.route.js"
import instructorRoutes from "./routes/instructor.route.js"
import lectureRoutes from "./routes/lecture.route.js"


app.use("/api/v1/users", userRoutes)
app.use("/api/v1/courses", courseRoutes)
app.use("/api/v1/instructors", instructorRoutes)
app.use("/api/v1/lectures", lectureRoutes)

// error handler
app.use(errorHandler)

export { app }