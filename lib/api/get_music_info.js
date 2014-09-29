var path = require('path');
var ffmpeg = require('fluent-ffmpeg');
var _ = require('underscore');
var MusicSchema = require('../schema/music');

module.exports = function(filePath, callback) {
  var command = ffmpeg(filePath)
    .ffprobe(0, function(err, data) {
        if (err) return callback(err, null);
        // data.format.tags = {
        //  title, album, artist, album_artist?
        // }
        // console.log(data.format.tags);
        var info = _.pick(data.format.tags, MusicSchema.TAG_FIELD);
        info.file_name = path.basename(filePath);
        callback(null, info);
    });
};