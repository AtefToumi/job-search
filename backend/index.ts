require('dotenv').config()
import errorMiddleware from './middlewares/error.middleware'
import deserializeUser from "./middlewares/deserializeUser"
import cookieParser from "cookie-parser"


import express from 'express'
import { api } from './routes/api'
import mongoose from "mongoose"
import cors from "cors"

//mongoose & cors
const app = express()
app.use(cookieParser());


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(deserializeUser)
api(app)

//connect to local db
//@ts-ignore
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to db')
    })
    .catch(error => console.log(error.message));

// Error Handler Middleware
app.use(errorMiddleware)

export default app