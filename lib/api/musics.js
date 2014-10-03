var _ = require('underscore');
var dbWrapper = require('./db_wrapper');
var utils = require('../utils');
var getMusicInfo = require('./get_music_info');
var path = require('path');
var async = require('async');

exports.get = function(req, res) {
    dbWrapper.get(function(err, musics){
      if(err) return utils.resErrJson(res, 500, err);
      utils.resJson(res, 200, musics);
    });
}

exports.remove = function(req, res){
  var id = req.params.id;
}

exports.update = function(req, res){
  var id = req.params.id;

}

exports.upload = function(req, res){
  var files = req.files.files;
  var user = req.body.user;
  if (!_.isArray(files)) files = [files];
  _.each(files, function(file) {
    console.log(file);
    var filePath = path.resolve(__dirname, '../../', file.path);
    console.log(filePath);
    async.waterfall([
      function(callback) {
        getMusicInfo(filePath, callback);
      },
      function(info, callback){
        dbWrapper.insert(info, callback);
      }
    ], function(errs, result){
      if(errs) return utils.resErrJson(res, 500, errs);
      utils.resJson(res, 200,  result);
    });
  })
}