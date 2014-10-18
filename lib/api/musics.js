var _ = require('underscore');
var dbWrapper = require('./db_wrapper');
var utils = require('../utils');
var getMusicInfo = require('./get_music_info');
var path = require('path');
var async = require('async');
var app = require('../../app');
var communication = require('../communication');

(function() {
  // initialize
});

exports.get = function(req, res) {
  dbWrapper.getAllMusic(function(err, musics) {
    if (err) return utils.resErrJson(res, 500, err);
    utils.resJson(res, 200, musics);
  });
}

exports.remove = function(req, res) {
  var id = req.params.id;
}

exports.update = function(req, res) {
  var id = req.params.id;

}

exports.upload = function(req, res) {
  // console.log(req.body);
  // console.log(req.files);

  var files = req.files.files;
  var user = req.body.user;
  var playlists = JSON.parse(req.body.playlists);

  // dummy
  // utils.resJson(res, 200, {
  //   successs: true,
  //   error: false
  // });
  // return;
  if (!_.isArray(files)) files = [files];
  _.each(files, function(file) {
    // console.log("file:", file);
    var filePath = path.resolve(__dirname, '../../', file.path);
    // console.log("filePath", filePath);
    async.waterfall([

      function(callback) {
        getMusicInfo(filePath, callback);
      },
      function(info, callback) {
        dbWrapper.insertMusic(info, callback);
      },
      function(info, callback){
        dbWrapper.addMusicToPlaylist(info, playlists, callback);
      }
    ], function(errs, result) {
      // console.error(errs, result);
      if (errs) return utils.resErrJson(res, 500, errs);
      communication.emit("music:create", {
        music: _.omit(result, "playlists"),
        playlists: result.playlists
      });
      utils.resJson(res, 200, result);
    });
  });
}