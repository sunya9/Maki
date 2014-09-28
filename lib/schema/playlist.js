var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaylistSchema = new Schema({
  title: String,
  artist: String,
});

module.exports = PlaylistSchema;