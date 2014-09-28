var _ = require('underscore');
var getMusicInfo = require('./get_music_info');
var path = require('path');

exports.upload =  function(req, res) {
  var files = req.files.files;
  if(!_.isArray(files)) files = [files];
  var body = files;
  _.each(body, function(file){
    console.log(file);
    var filePath = path.resolve(__dirname, '../../', file.path);
    console.log(filePath);
    getMusicInfo(filePath);
  })
  res.set('Content-Type', 'text/plain');
  res.end();

};
