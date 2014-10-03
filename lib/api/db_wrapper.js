var mongoose = require('mongoose');
var MusicSchema = require('../schema/music');
var _ = require('underscore');
var Music;

exports.init = function(db_name){
  mongoose.model('Music', MusicSchema);
  Music = mongoose.model('Music');
  mongoose.connect('mongodb://localhost/' + db_name);
  mongoose.connection.on('error', function(err){
    throw err;
  });
  process.on('SIGINT', function(){
    mongoose.connection.close(function(){
      console.log('exit Maki.');
      process.exit(0);
    });
  });
};

exports.insert = function(info, callback){
  // if(!Music){
  //   var error = new Error('MusicSchema does not been initialized.')
  //   return callback(err, null);
    
  // }
  var music = new Music();
  _.each(MusicSchema.FIELD, function(field){
    music[field] = info[field];
  });
  music.save(function(err){
    if(err) return callback(err);
    callback(null, info);
  });
};

exports.remove = function(info, callback){

};

exports.get = function(callback){
  return Music.find(null, callback);
}