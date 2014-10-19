App.Collections.Playlist = Backbone.Collection.extend({
  model: App.Models.Playlist,
  url: '/playlists',

  initialize: function(models, options) {
    console.log("playlist collection initialize.");
    console.log("playlist collection models", models);
    _.each(models, function(model) {
      if (model.real) {
        console.log("real playlist model.");
      }
    })
  },

  getTargetPlaylists: function() {
    return this.chain().filter(function(playlist) {
      return playlist.get("target_select");
    }).pluck("id").value();
  },

  requestInsertMusic: function(music, ids) {
    console.log(music, ids);
    var allMusicId = this.first().id;
    var musicModel = new App.Models.RealMusic(music);
    ids.push(allMusicId);
    _.each(ids, function(playlistId) {
      console.log("playlistId", playlistId);
      var playlistModel = this.get(playlistId);
      console.log("playlistModel", playlistModel);
      if (!playlistModel) return;
      playlistModel.get("musics").add(musicModel);
    }, this);
  }

});