var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const cookbookRouter = require('./routes/cookbook');
const compression = require('compression');
const helmet = require('helmet');

var app = express();
app.use(helmet());
const mongoose = require('mongoose');
<<<<<<< HEAD
const dev_db_url =
  'mongodb+srv://vr-keffri:VR-KEFFRI-604@vr-cluster.0d9pda8.mongodb.net/vegan-recipes?retryWrites=true&w=majority';
const mongoDB = process.env.MONGO_URI || dev_db_url;
=======
const mongoDB = process.env.MONGO_URI;
>>>>>>> temp-work
mongoose.connect(mongoDB, { useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cookbook', cookbookRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
