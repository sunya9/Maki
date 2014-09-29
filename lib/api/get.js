var _ = require('underscore');
var dbWrapper = require('./db_wrapper');
var utils = require('../utils');
var _ = require('underscore');

module.exports = function(req, res) {
    dbWrapper.get(function(err, musics){
      if(err) return utils.resErrrJson(res, 500, err);
      utils.resJson(res, 200, musics);
    });
}