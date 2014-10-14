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

});