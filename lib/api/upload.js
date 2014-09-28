var _ = require('underscore');
var getMusicInfo = require('./get_music_info');
var dbWrapper = require('./db_wrapper');
var path = require('path');
var async = require('async');

exports.upload = function(req, res) {
  var files = req.files;
  console.log(files);
  if (!_.isArray(files)) files = [files];
  var body = files;
  _.each(body, function(file) {
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
      if(errs) return console.error(errs);
      console.log("success");
    });
  })
  res.set('Content-Type', 'text/plain');
  res.end();

};