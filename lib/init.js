var fs = require('fs');
var _ = require('underscore');

function Settings(sfp) {
  this.settingsFilePath = sfp;
  this.prefs = this.reload();
};

Settings.FIELD = {
  'music_folder' : 'string',
  'status' : 'number', // 0 = stop, 1 = pause, 2 = playing,
  'db_name': 'string'
};

Settings.STOP = 0;
Settings.PAUSE = 1;
Settings.PLAYING = 2;

Settings.prototype.reload = function() {
  var data = fs.readFileSync(this.settingsFilePath, 'utf-8');
  return JSON.parse(data); 
};

Settings.prototype.load = function() {
  return this.prefs;
}

Settings.prototype.save = function(key, value) {
  var unknownFieldCheck = function(value, key) {
    // error
    console.log(Settings.FIELD);
    console.log('%s:%s', key, value);
    if (!_.has(Settings.FIELD, key)) {
      // unknown field
      throw new Error(key + ' is unkown field.');
      return false;
    }else if(typeof value !== Settings.FIELD[key]){
      // type error
      throw new Error(key + ' is type error.');
      return false;
    }
    return true;
  };

  if (_.isObject(key)) {
    value = null;
    var options = key;
    if(!_.every(options, unknownFieldCheck))
      return;
  } else {
    var option = {};
    option[key] = value;
  if(!_.every(option, unknownFieldCheck))
      return;
    this.prefs = _.extend(this.prefs, option);
  }
  fs.writeFileSync(this.settingsFilePath, JSON.stringify(this.prefs), 'utf-8');
}

module.exports = Settings;