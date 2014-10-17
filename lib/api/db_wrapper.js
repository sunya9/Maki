var mongoose = require('mongoose');
var MusicSchema = require('../schema/music');
var PlaylistSchema = require('../schema/playlist');
var _ = require('underscore');
var ObjectId = mongoose.Types.ObjectId;
var Music;
var Playlist;


exports.init = function(db_name) {
  mongoose.model('Music', MusicSchema);
  Music = mongoose.model('Music');
  mongoose.model('Playlist', PlaylistSchema);
  Playlist = mongoose.model('Playlist');
  mongoose.connect('mongodb://localhost/' + db_name);
  mongoose.connection.on('error', function(err) {
    throw err;
  });
  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('exit Maki.');
      process.exit(0);
    });
  });
};

exports.insertMusic = function(info, callback) {
  Music.findOne({
    sha1: info.sha1
  }, function(err, model) {
    if (err) return callback(err, null);
    if (model !== null) {
      // already exist
      var errObj = {
        error: {
          code: 1,
          message: 'Already exist.',
        }
      };
      callback(null, errObj);
    } else {
      var music = new Music();
      _.each(MusicSchema.FIELD, function(field) {
        music[field] = info[field];
      });

      music.save(function(err, product) {
        if (err) return callback(err);
        callback(null, product);
      });
    }
  });
};

exports.remove = function(info, callback) {

};

exports.getAllMusic = function(callback) {
  return Music.find(null, callback);
}

exports.getAllPlaylists = function(callback) {
  return Playlist.find(null, callback);
}
exports.createPlaylist = function(data, callback) {
  var playlist = new Playlist(data);
  playlist.save(function(err, product) {
    if (err) return callback(err);
    callback(null, product);
  })
}

exports.addMusicToPlaylist = function(info, playlists, callback) {
  // console.log("music info", info);
  var musicId = info._id;
  _.each(playlists, function(playlistId) {
    Playlist.findOne({
      _id: new ObjectId(playlistId)
    }, function(err, playlist) {
      if (err) return callback(err, null);
      playlist.update({
        $push: {
          musics: musicId
        }
      }, function(err, number, raw) {
        if (err) return callback(err, null);
      });
      info.playlists = playlists;
    });
    callback(null, info);
  });
}