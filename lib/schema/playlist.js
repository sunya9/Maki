var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaylistSchema = new Schema({
  title: String,
  user: String
});
module.exports = PlaylistSchema;