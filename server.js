const express = require('express');
const app = express();
var createError = require('http-errors');
var path = require('node:path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

//set view engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const uri = "mongodb+srv://chofong:Speidest00@cluster0.ohugjes.mongodb.net/?retryWrites=true&w=majority";
const connect = mongoose.connect(uri);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });
app.get('/',(req,res)=>{
    res.render('index.ejs');
})
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('pages/error');
  });


const bookingRouter = require('./routes/booking');
const miscRouter = require('./routes/misc');
const mongooseSchema = require('./schema');

app.use('/booking', bookingRouter);
app.use('/', miscRouter);


app.listen(8000);
module.exports = app;