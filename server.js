const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const config = require('config');
const morgen = require('morgan');
const bodyparser = require('body-parser');
const { response } = require('express');
const mongoose = require('mongoose');

const PORT = config.get('server.port');
const HOST = config.get('server.host');

const app = express();

//environment variables
require('dotenv').config();

const connectDB = require('./server/database/connection');

// dotenv.config({path:'config.env'});
// const PORT = process.env.POPT || 8000

//log request
app.use(morgen('tiny'));

//mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

//set view engine
app.set("view engine" , "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"));

//load assets
app.use('/css' , express.static(path.resolve(__dirname,"assets/css")));
//css/style.css
app.use('/img' , express.static(path.resolve(__dirname,"assets/img")));
app.use('/js' , express.static(path.resolve(__dirname,"assets/js")));

//load routes
app.use('/',require('./server/routes/router'));


app.listen(PORT , ()=>{
    console.log('Server is running on http://'+HOST+':'+ PORT)
});