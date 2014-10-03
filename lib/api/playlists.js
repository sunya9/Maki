var _ = require('underscore');
var dbWrapper = require('./db_wrapper');
var utils = require('../utils');
var _ = require('underscore');

exports.get = function(req, res) {
    dbWrapper.get(function(err, musics){
      if(err) return utils.resErrJson(res, 500, err);
      utils.resJson(res, 200, musics);
    });
}

exports.create = function(req, res){}

exports.update = function(req, res){}

exports.remove = function(req, res){}
