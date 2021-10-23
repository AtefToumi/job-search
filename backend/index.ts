require('dotenv').config()
import errorMiddleware from './middlewares/error.middleware'

import express from 'express'
import {api} from './routes/api'



//mongoose & cors
const app = express()
const mongoose = require("mongoose");
const cors = require("cors");


require("dotenv").config();


const MongoClient = require('mongodb').MongoClient
const url = process.env.MONGODB_URL;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

api(app)

const dbName = process.env.DB_NAME;
let db;

mongoose.connect('mongodb://localhost:27017/job-search');

// MongoClient.connect(url, { useNewUrlParser: true }, (err: any, client: any) => {
//   if (err) return console.log(err)

//   // Storing a reference to the database so you can use it later
//   db = client.db(dbName)
//   console.log(`Connected MongoDB: ${url}`)
//   console.log(`Database: ${dbName}`)
//   db.collection('users').find({}).limit(50)
//   .toArray(function (err: any, res: any) {
//     if (err) {
//       res.status(400).send("Error fetching listings!");
//    } else {
//       // res.json(result);
//       console.log(res)
//     }
//   });
// })

// Error Handler Middleware
app.use(errorMiddleware)

export default app