var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require("express-handlebars"); 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var watchRouter = require('./routes/watching_page')

const db = require('./config/connection')
var app = express();


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

app.engine('hbs', hbs.engine);  // Use 'hbs' instance with helpers
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


db.connect((error)=>{
  if (error){
    console.log('Connection Error...'+error)
    process.exit(1)
  }else{
    console.log('DataBase Conneted...')
  }
  
})


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/watch',watchRouter)


// catch 404 and forward to error handle  r
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
  res.render('error');
  
});

module.exports = app;
