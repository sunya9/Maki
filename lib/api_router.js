var musics = require('./api/musics')
var playlists = require('./api/playlists');

var apiRouter = function(app){
  // musics api
  app.post(app.get('url root') + 'musics', musics.upload);
  app.put(app.get('url root') + 'musics/:id', musics.update);
  app.delete(app.get('url root') + 'musics/:id', musics.remove);
  app.get(app.get('url root') + 'musics', musics.get);

  // playlists api
  app.post(app.get('url root') + 'playlists', playlists.create);
  app.post(app.get('url root') + 'playlists/update', playlists.update);
  app.post(app.get('url root') + 'playlists/remove', playlists.remove);
  app.get(app.get('url root') + 'playlists', playlists.get);
}

module.exports = apiRouter;