var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');


var mongoose = require('mongoose');
mongoose.connect('mongodb://customeruser:Welcome1@ds131763.mlab.com:31763/customerservice')
  .then(() =>  console.log('Book DB connection succesful'))
  .catch((err) => console.error(err));


var apiRouter = require('./bookRouter');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

app.listen(3333,() =>
{
    console.log("up and runnig... this is Book service");

})
module.exports = app;