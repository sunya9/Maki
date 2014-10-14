var musics = require('./api/musics')
var playlists = require('./api/playlists');

var apiRouter = function(app){
  // musics api
  app.post('/musics', musics.upload);
  app.put('/musics/:id', musics.update);
  app.delete('/musics/:id', musics.remove);
  app.get('/musics', musics.get);

  // playlists api
  app.post('/playlists', playlists.create);
  app.post('/playlists/update', playlists.update);
  app.post('/playlists/remove', playlists.remove);
  app.get('/playlists', playlists.get);
}

module.exports = apiRouter;