var mongoose = require('mongoose');
var musicSchema = require('../schema/music');
var getMusicInfo = require('./get_music_info');

module.exports = function(filePath){
  filePath = path.resolve(__dirname, filePath);
  console.log(filePath);
  getMusicInfo(filePath);
}