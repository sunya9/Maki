var _ = require('underscore');
var getMusicInfo = require('./get_music_info');
var dbWrapper = require('./db_wrapper');
var path = require('path');
var async = require('async');
var utils = require('../utils');


exports.upload = function(req, res) {
  var files = req.files.files;
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

};