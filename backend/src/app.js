import express from "express"
import dotenv from "dotenv"
import connectToDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"

// Load environment variables
dotenv.config()

const app = express();

// connect to db
connectToDB()

app.use(express.json())

// Routes
app.use("/api/auth",authRoutes)

app.get('/', function(req,res){
    res.send("Hello from server")
})

export default app;