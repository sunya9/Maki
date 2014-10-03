App.Collections.Playlist = Backbone.Collection.extend({
  model: App.Models.Playlist,
  url : '/playlists',
  initialize : function(options){
    console.log("playlist initialize.");
    if(options["first_boot"]){
      console.log("first boot.");
      // this.model.musics = 
    }

  }
});