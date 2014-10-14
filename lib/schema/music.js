var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MusicSchema = new Schema({
  title: String,
  artist: String,
  album_artist: String,
  album: String,
  file_name: String,
  user: String,
  sha1: String,
  duration : Number
});

MusicSchema.TAG_FIELD = ['title', 'album', 'artist', 'album_artist'];
MusicSchema.FORMAT_FIELD = ['duration'];
MusicSchema.FIELD = ['title', 'album', 'artist', 'album_artist', 'file_name', 'user', 'sha1', 'duration'];

module.exports = MusicSchema;