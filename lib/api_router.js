var express = require('express');

var upload = require('./api/upload')

var apiRouter = function(app){
  app.post('/upload', upload.upload);
}

module.exports = apiRouter;