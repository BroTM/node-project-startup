var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
require('dotenv').config()

var apiRouter = require('./src/routes/api')
const CustomError = require('./helpers/custom-error')
const defaultData = require('./src/middleware/data')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', defaultData, apiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new CustomError('Route Not Found', 404))
})

// error handler
app.use(function (err, req, res, next) {
  let msg = 'Internal Error.',
    error = err,
    statusCode = 500
  if (err instanceof CustomError) {
    msg = err.message
    error = err.errors
    statusCode = err.statusCode
  }
  res.status(statusCode).send({
    status: false,
    message: msg,
    body: error,
  })
})

module.exports = app
