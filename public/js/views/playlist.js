(function(window) {
  var root = window;
  App.Views.Playlist = Backbone.View.extend({
    tagName: "li",
    template: _.template($("#playlist-template").html()),

    events: {
      "click a": "clickPlaylist",
    },

    initialize: function(options) {
      console.log("playlist view initialize");
      console.log("playlist view options", options);
      console.log(this.model);
      this.type = options.type || App.Views.Playlist.PLAYLIST_TYPE.LIST;
      _.bindAll(this, "render");
      var self = this;
      this.listenTo(this.model, "change", this.render);
      this.listenTo(this.model.get("musics"), "add remove", this.render);
      this.listenTo(this.model, "remove destroy", this.remove);
    },

    render: function() {
      console.log("playlist view render");
      this.$el.html(this.template(this.model.toJSON()));
      switch (this.type) {
        case App.Views.Playlist.PLAYLIST_TYPE.TARGET:
          {
            this.$el.toggleClass("select", this.model.get("target_select"));
          }
      }
      console.log("playlist view render this", this);
      return this;
    },

    clickPlaylist: function() {
      switch (this.type) {
        case App.Views.Playlist.PLAYLIST_TYPE.LIST:
          {
            console.log("showMusic");
            var collection = this.model.get("musics");
            root.musicWrapperView.changeMusiclist(collection);

            break;
          }
        case App.Views.Playlist.PLAYLIST_TYPE.TARGET:
          {
            console.log("selectPlaylist");
            var value = this.model.get("target_select");
            this.model.set("target_select", !value);
            break;
          }
      }
    },

    createPlaylist: function() {

    },

    removePlaylist: function() {

    },

    renamePlaylist: function() {

    },
  }, {
    PLAYLIST_TYPE: {
      LIST: 1,
      TARGET: 2
    }
  });
})(this);