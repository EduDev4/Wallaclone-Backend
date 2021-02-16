var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

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
 * Website routes
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);

/**
 * API routes
 */
const loginController = require('./controllers/loginController');
const jwtAuth = require('./lib/jwtAuth');
app.post('/apiv1/login', loginController.post);

app.use('/apiv1/adverts', require('./routes/apiv1/adverts'));
//ruta provisional para comprobar que funciona la protección de ruta con token
app.use('/apiv1/users', jwtAuth(), require('./routes/apiv1/users'));

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
