App.Models.Music = Backbone.Model.extend({
  idAttribute: "_id",
  urlRoot : '/musics',
  
  initialize: function(attrs, options) {
    console.log("attrs", attrs);
    console.log("options", options);
  },

  defaults: {
    "title": "",
    "artist": "",
    "album_artist": "",
    "album": "",
    "file_name": "",
    "user": ""
  },

  validate: function(attrs, options) {
    if (attrs.title === "" || attrs.file_name === "") {
      console.error("title must be not empty.");
    }
  }
});