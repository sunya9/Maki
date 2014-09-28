var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MusicSchema = new Schema({
  title: String,
  artist: String,
  album_artist: String,
  file_name: String,
});

module.exports = MusicSchema;