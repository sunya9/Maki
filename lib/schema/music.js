var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MusicSchema = new Schema({
  title: String,
  artist: String,
  album_artist: String,
  album: String,
  file_name: String,
});

MusicSchema.FIELD = ['filename', 'title', 'album', 'artist', 'album_artist'];

module.exports = MusicSchema;