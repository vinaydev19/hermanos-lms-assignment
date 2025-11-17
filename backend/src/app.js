import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middlewares/errorHandler.middleware.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))


app.use(cookieParser())
app.use(express.urlencoded({ limit: "16kb", extended: true }))
app.use(express.json())
app.use(express.static("public"))



// error handler
app.use(errorHandler)

export { app }