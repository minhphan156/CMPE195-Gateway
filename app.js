/**
 * Main entry point.
 * @module app
 */

var express = require('express');
var logger = require('morgan');
var proxy = require('http-proxy-middleware');
var RuntimeVars = require('./services/RuntimeVars');

var app = express();

// Enable Cross-Origin Resource Sharing (CORS)
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

// Setup custom timestamp token for logger
logger.token('timestamp', function () {
  var date = new Date();
  return date.toLocaleString([], {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Setup api proxy settings
const proxyOptions = {
  target: `http://${RuntimeVars.OTHER.DOCKER_GATEWAY}:${RuntimeVars.API.PORT}`,
  pathRewrite: {
    '^/api': ''
  },
  logLevel: 'debug'
};

// Setup Express.js middleware
app.use(logger('\x1b[32m:timestamp:\x1b[0m :method :url :status :response-time ms - :res[content-length]'));
app.use(allowCrossDomain);
app.use('/api', proxy(proxyOptions));

module.exports = app;
