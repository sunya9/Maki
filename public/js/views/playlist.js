(function(window) {
  var root = window;
  App.Views.Playlist = Backbone.View.extend({
    tagName: "li",
    template: _.template($("#playlist-template").html()),

    events: {
      "click a": "showMusic",
    },

    initialize: function(options) {
      console.log("playlist view initialize");
      console.log("playlist view options", options);
      console.log(this.model);
      _.bindAll(this, "render");
      var self = this;
      // if(!this.model.get("removable")){
      //   this.listenToOnce(this.model.get("musics"), "sync", function(){
      //     self.showMusic(true);
      //     return this;
      //   });
      // }
      this.listenTo(this.model.get("musics"), "add remove", this.render);
      // this.listenTo(this.model.get("musics",),)
      this.listenTo(this.model, "remove destroy", this.remove);
    },

    render: function() {
      console.log("playlist view render");
      this.$el.html(this.template(this.model.toJSON()));
      console.log("playlist view render this", this);
      return this;
    },

    showMusic: function() {
      console.log("showMusic");
      var collection = this.model.get("musics");
      root.musicWrapperView.changeMusiclist(collection);
    },

    createPlaylist: function() {

    },

    removePlaylist: function() {

    },

    renamePlaylist: function() {

    },
  });
})(this);