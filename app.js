var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jws= require("jsonwebtoken");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter= require('./routes/products')
var categoriesRouter= require('./routes/categories')

var app = express();

app.set("secretKey","dnNode");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/products", productsRouter)
app.use("/categories",categoriesRouter);

function verifyToken(req,res,next){
  const authHeader= req.header["authorization"];
  if(authHeader){
    const token = authHeader.split(" ")[1];
    jws.JsonWebTokenError.verify(token, req.app.get("secretKey"), function (error,payload){
      if(error){
        return res.status(401).json({message:error.message});
      }else{
        console.log(payload);
        next();
        return;
      }
    });
  }else{
    return res.status(401).json({ message: "Token must be provide"});
  }
}

app.verifyToken = verifyToken;

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
  res.render('error');
});

module.exports = app;
