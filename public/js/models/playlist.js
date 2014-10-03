App.Models.Playlist = Backbone.Model.extend({
  idAttribute: "_id",
  urlRoot : '/playlists',

  initialize: function(options, attrs) {
    console.log('attrs', attrs);
    console.log('options', options);
    this.musics = new App.Collections.Music();
  },

  defaults: {
    'title' : '',
    'user' : '',
    'musics' : null,
  },

  validate: function(attrs, options) {
    if (attrs.title === "" || attrs.user === "") {
      console.error("title or user must be not empty.");
    }
  },

  showPlaylist : function(){
    console.log("show playlist");
  }

});