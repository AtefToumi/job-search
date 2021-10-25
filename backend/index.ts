require('dotenv').config()
import errorMiddleware from './middlewares/error.middleware'

import express from 'express'
import {api} from './routes/api'

//mongoose & cors
const app = express()
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

api(app)

//connect to local db
mongoose.connect('mongodb://localhost:27017/job-search');

// Error Handler Middleware
app.use(errorMiddleware)

export default app