var _ = require('underscore');
var dbWrapper = require('./db_wrapper');
var utils = require('../utils');
var _ = require('underscore');

exports.get = function(req, res) {
    dbWrapper.getAllPlaylists(function(err, playlists){
      if(err) return utils.resErrJson(res, 500, err);
      utils.resJson(res, 200, playlists);
    });
}

exports.create = function(req, res){
  var body = req.body;
  var defaults = {
    title: 'No title',
    user : 'guest'
  };
  _.defaults(body, defaults);
  dbWrapper.createPlaylist(body, function(err, product){
    if(err) res.send(err);
    res.send(product);
  })
}

exports.update = function(req, res){}

exports.remove = function(req, res){}
