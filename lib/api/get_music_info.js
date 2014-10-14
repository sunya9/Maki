var path = require('path');
var ffmpeg = require('fluent-ffmpeg');
var _ = require('underscore');
var fs = require('fs');
var async = require('async');
var MusicSchema = require('../schema/music');
var crypto = require('crypto');

module.exports = function(filePath, callback) {
  async.parallel({
      sha1: function(callback) {
        fs.readFile(filePath, 'binary', function(err, data) {
          if (err) return callback(err, null);
          var sha1 = crypto.createHash('sha1');
          var sha1Str = sha1.update(data, 'binary').digest('hex');
          callback(null, sha1Str);
        });
      },
      info: function(callback) {
        var command = ffmpeg(filePath)
          .ffprobe(0, function(err, data) {
            if (err) return callback(err, null);
            // data.format.tags = {
            //  title, album, artist, album_artist?
            // }
            var info = _.pick(data.format.tags, MusicSchema.TAG_FIELD);
            _.extend(info, _.pick(data.format, MusicSchema.FORMAT_FIELD))
            // console.log('info', info);
            info.duration = Math.round(info.duration);
            info.file_name = path.basename(filePath);
            callback(null, info);
          });
      }
    },
    function(errs, results) {
      if (errs) return callback(errs);
      var result = {};
      _.extend(result, results.info);
      result.sha1 = results.sha1;
      callback(null, result);
    })

};