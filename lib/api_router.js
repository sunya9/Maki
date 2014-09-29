var express = require('express');

var upload = require('./api/upload')
var get = require('./api/get');

var apiRouter = function(app){
  app.post('/upload', upload.upload);
  app.get('/get', get)
}

module.exports = apiRouter;