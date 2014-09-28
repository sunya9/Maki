var mongoose = require('mongoose');
var MusicSchema = require('../schema/music');


exports.init = function(db_name){
  mongoose.model('Music', MusicSchema);
  mongoose.connect('mongodb://localhost/' + db_name);
};

exports.insert = function(info, callback){
  var Music = mongoose.model('Music');
  var music = new Music();
  _.each(MusicSchema.FIELD, function(field){
    music[field] = info[field];
  });
  music.save(function(err){
    if(err) return callback(err);
    callback(null);
  });
};

exports.remove = function(info, callback){

};
