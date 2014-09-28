var path = require('path');
var ffmpeg = require('fluent-ffmpeg');

module.exports = function(filePath) {
  // console.log(filePath); 
  var command = ffmpeg(filePath)
    .ffprobe(0, function(err, data) {
      if(err) return console.error(err);
      console.log('file metadata:');
      console.log(data);
    });

  console.log(command);
  return command;
};