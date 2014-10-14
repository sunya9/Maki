App.Views.PlaylistWrapper = Backbone.View.extend({
  el: "ul#playlists",


  events: {

  },

  initialize: function() {
    console.log("initialize playlist wrapper.");
    _.bindAll(this, "render", "renderOne", "render");
    console.log("this.collection", this.collection);
    this.collection.each(this.renderOne, this);
    this.listenTo(this.collection, "add", this.renderOne);
  },

  render: function() {
    console.log("playlistWrapper render");
    this.collection.each(this.renderOne, this);
    return this;
  },

  renderOne: function(playlist) {
    console.log("renderOne playlist", playlist);
    var playlistItemView = new App.Views.Playlist({
      model: playlist,
      parentCollection: this.collection
    });
    this.$el.append(playlistItemView.render().el);
  },



  createPlaylist: function() {},
});