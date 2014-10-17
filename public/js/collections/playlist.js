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

  requestInsertMusic : function(music, ids){
    var allMusicId = _.first(this.models).id;
    ids.push(allMusicId);
    _.each(this.models, function(model){
      if(_.contains(ids, model.id)){
      model.get("musics").add(music);
      }
    });
  }

});