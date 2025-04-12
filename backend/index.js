import express from 'express'
import mongoose from 'mongoose';
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();

const app = express();
const PORT = 8000;

import router from "./routes/todo.js"

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database connected successfully"))
.catch((error) => console.log(`Error connecting Database ${error}`))






app.use("/", router);

app.listen(PORT, ()=> {
    console.log(`Server started at http://localhost:${PORT}`)
})