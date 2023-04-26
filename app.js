var express = require('express');
var path = require('path');
var logger = require('morgan');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
const dotenv  = require('dotenv')
const { log } = require('console');
var cors = require('cors')

const postRouter = require('./routes/posts');

var app = express();
const mongoose = require('mongoose');

dotenv.config({path:"./config.env"})


// 連接本地資料庫
const DB = process.env.DATABASE
mongoose.connect(DB)
    .then(res=> console.log("連線資料成功"));

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/poster', postRouter);
// log(app)

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// app.listen(3000, function() {
//   console.log('Server started on port 3000');
// });

module.exports = app;
