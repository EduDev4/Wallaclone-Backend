const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

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
 * Website routes
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);

/**
 * API routes
 */
// eslint-disable-next-line import/no-unresolved
const userController = require('./controllers/UserController');
const jwtAuth = require('./lib/jwtAuth');

app.post('/apiv1/users/auth', userController.login);

app.post('/apiv1/users', userController.signup);
app.get('/apiv1/users/confirm/:token', userController.signupConfirmation);

//ruta para cambiar password sin jwtAuth()
app.use('/apiv1/users', require('./routes/apiv1/users'));
app.use('/apiv1/adverts', require('./routes/apiv1/adverts'));
//ruta provisional para comprobar que funciona la protección de ruta con token
//app.use('/apiv1/users', jwtAuth(), require('./routes/apiv1/users'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
