const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const moongoose = require('mongoose')
const session = require('express-session');
const fileStorage = require('session-file-store')(session);
const passport = require('passport')
const authenticate = require('./authenticate')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dishRoutes = require('./routes/dishRoutes');
const leaderRoutes = require('./routes/leaderRouter');
const promotionRoutes = require('./routes/promoRouter');
const url = 'mongodb://localhost:27017/conFusion';
const connect = moongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({
  name: 'session-id',
  secret: '123456789',
  saveUninitialized: false,
  resave: false,
  store: new fileStorage()
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/', indexRouter);
app.use('/users', usersRouter);
function auth(req, res, next) {
  if (!req.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    return next(err);
  }
  else {
    next();
  }
}

app.use(auth)
app.use(express.static(path.join(__dirname, 'public')));

connect.then((db) => {
  console.log('Connected DB');
}, err => {
  console.log('ERROR', err);
})

app.use('/', indexRouter);
app.use('/leaders', leaderRoutes);
app.use('/dishes', dishRoutes);
app.use('/promotions', promotionRoutes);

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
