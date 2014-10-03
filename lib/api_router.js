var express = require('express');

var musics = require('./api/musics')
var playlists = require('./api/playlists');
// var usersApi = reui

var apiRouter = function(app){
  // musics api
  app.post('/musics/upload', musics.upload);
  app.post('/musics/update', musics.update);
  app.post('/musics/remove', musics.remove);
  app.get('/musics', musics.get);

  // playlists api
  app.post('/playlists/create', playlists.create);
  app.post('/playlists/update', playlists.update);
  app.post('/playlists/remove', playlists.remove);
  app.get('/playlists', playlists.get);
}

module.exports = apiRouter;