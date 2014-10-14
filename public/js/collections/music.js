(function(window) {
  var root = window;
  App.Collections.Music = Backbone.Collection.extend({
    // model: function(attrs, options) {
    //   console.log("model's options", attrs, options);
    //   console.log("music collection attributes", attrs);
    //   if (attrs.real)
    //     return new App.Models.RealMusic(attrs, options);
    //   else
    //     return new App.Models.Music(attrs, options);
    // },
    model : App.Models.RealMusic,
    url: "/musics",

    initialize: function(models, options) {
      console.log("music collection initialize.");
      console.log("music collection models", models);
      console.log("music collection options", options);
      if (options && options["real"]) {
        console.log("real model.");
      }
    },

    parse: function(res, options) {
      console.log('music collection parse called', res, options);
      if (options.real) {
        res = _.map(res, function(music) {
          music.real = true;
          return music;
        });
      }
      return res;
    },

    filterMusic: function(searchStr) {
      var result = App.Utils.searchQueryParser(searchStr, App.SEARCH_OPERATOR_OPTIONS);
      var fields = ["title", "artist", "album_artist", "album"];
      var existSearchOperator = _.isObject(result);
      var text = existSearchOperator ? result.text : result;
      text && (text = text.toLowerCase());
      var setVisibilityIteratee = function(musicModel) {
        var isVisible = !!text ? _.some(fields, function(field) {
          return musicModel.get(field).toLowerCase().indexOf(text) >= 0;
        }) : true;
        musicModel.set("visible", isVisible);
      };
      if (existSearchOperator) {
        var isVisible = _.chain(this.models)
          .filter(function(model) {
            var modelAttrs = model.pick(fields);
            var isVisible = _.chain(result)
              .omit("text")
              .every(function(resultValue, resultKey) {
                // if (!modelAttrs[resultKey]) return false;
                var matches = App.REGEXP_STR_REG.exec(resultValue);
                if (matches) {
                  var reg = new RegExp(matches[1], matches[2]);
                  return reg.test(modelAttrs[resultKey]);
                } else {
                  var resultIgnoreCaseValue = resultValue.toLowerCase();
                  var modelIgnoreCaseValue = modelAttrs[resultKey].toLowerCase();
                  return modelIgnoreCaseValue.indexOf(resultIgnoreCaseValue) >= 0;
                }
              }).value();
            console.log("model", model.get("title"), isVisible);
            model.set("visible", isVisible);
            return isVisible;
          })
          .each(setVisibilityIteratee);
      } else {
        _.each(this.models, setVisibilityIteratee);
      }
    }
  });
})(this);