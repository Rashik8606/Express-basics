var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require("express-handlebars"); 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var watchRouter = require('./routes/watching_page')
const searchRouter = require('./routes/search')
var recentlyAdded = require('./routes/recently_added')
const session = require('express-session')

const db = require('./config/connection')
var app = express();

// Set up Handlebars view engine with helpers
const hbs = exphbs.create({
  extname: ".hbs",
  defaultLayout: "main",
  layoutsDir: __dirname + "/views/layouts/",
  partialsDir: __dirname + "/views/partials/",
  helpers: {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    eq: (a, b) => a === b,
    gt: (a, b) => a > b,
    lt: (a, b) => a < b, 
    lte: (a, b) => a <= b,
    and: (a, b) => a && b,
    range: (start, end) => {
      let range = [];
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      return range;
    }
  }
});

app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}))

app.engine('hbs', hbs.engine);  
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db.connect((error) => {
  if (error){
    console.log('Connection Error...'+error)
    process.exit(1)
  } else {
    console.log('DataBase Connected...')
  }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/watch', watchRouter);
app.use('/search', searchRouter);
app.use('/recently', recentlyAdded);

app.use('/upload', express.static('upload'));
app.use('/images', express.static('public/images'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
