(function(window) {
  var root = window;
  App.Models.Playlist = Backbone.Model.extend({
    idAttribute: "_id",
    urlRoot: '/playlists',

    initialize: function(attrs, options) {
      console.log('playlist model initialize.');
      console.log('playlist model attrs', attrs);
      console.log('playlist model options', options);
      var fetchOptions = {};
      var self = this;
      if (attrs.real) {
        options.removable = true;
        this.attributes.musics = new App.Collections.Music([], options);
        console.info("playlist real");
        this.attributes.removable = false;
        fetchOptions.validate = true;
        fetchOptions.real = true;
        // fetchOptions.add = true;
        this.attributes.musics.fetch(fetchOptions);
      } else {
        // attrs.musics = _.isEmpty(attrs.musics) ? [] : attrs.musics;
        var allMusicCollection = options.collection.first().get("musics");
        console.log("allMusicCollection", allMusicCollection);
        var getMusicModels = function() {
          return _.map(attrs.musics, function(musicId) {
            return allMusicCollection.get(musicId);
          });
        };
        if (allMusicCollection.isEmpty()) {
          this.listenToOnce(allMusicCollection, "sync", function() {
            console.log("listenToOnce");
            self.attributes.musics.add(getMusicModels());
            return this;
          });
          this.attributes.musics = new App.Collections.Music([], options);
        } else {
          this.attributes.musics = new App.Collections.Music(getMusicModels(), options);
        }
      }
    },

    defaults: function() {
      return {
        title: 'No title',
        user: null,
        musics: null,
        count: 0,
        removable: true,
        target_select: false,
      }
    },

    validate: function(attrs, options) {
      console.log('playlist validate', attrs);
      if (attrs.title === "" || _.isEmpty(attrs.user)) {
        var message = "title and user must be not empty.";
        console.error(message);
        return message;
      }
    },

  });
})(this);