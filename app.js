/**
 * Import Express
 * Import body-parser
 * Import mongoose
 * dotenv/config
 * Import router from './routes/routes'
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');
const router = require('./routes/routes');

const app = express();

/**
 * Middleware for body-parser
 */
app.use(bodyParser.json());

/**
 * Middleware for all routes
 */
app.use('/', router);

/**
 * Connect to MongoDB
 */
mongoose.connect(
    process.env.DATABASE_CONNECTION,
    {useNewUrlParser: true},
    ()=>{
        console.log('Connected To Database...');
    }
);

/**
 * Listen for requests in 3000 port
 */
app.listen(3000);

