var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MusicSchema = new Schema({
  title: String,
  artist: String,
  album_artist: String,
  album: String,
  file_name: String,
  user: String
});

MusicSchema.TAG_FIELD = ['title', 'album', 'artist', 'album_artist'];
MusicSchema.FIELD = ['title', 'album', 'artist', 'album_artist', 'file_name', 'user'];

module.exports = MusicSchema;