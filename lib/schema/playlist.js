var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var PlaylistSchema = new Schema({
  title: String,
  user: String,
  musics : [ObjectId]
});
module.exports = PlaylistSchema;