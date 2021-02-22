const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// db connection
require('./lib/connectMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Website routes, API info and Documentation
 */
app.use('/', indexRouter);

/**
 * API routes
 */
app.use('/apiv1/users', require('./routes/apiv1/users'));
app.use('/apiv1/adverts', require('./routes/apiv1/adverts'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Api request, response json format
  if (req.originalUrl.startsWith('/apiv1/')) {
    res.status(err.status).json({
      status: 'fail',
      code: err.status,
      message: err.message,
    });
    return;
  }

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
