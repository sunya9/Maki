App.Models.Music = Backbone.Model.extend({
  idAttribute: "_id",
  urlRoot: '/musics',

  initialize: function(attrs, options) {
    console.log("music model initialize.");
    // console.log("music model attrs", attrs);
    // console.log("music model options", options);
    console.info("music model id", attrs._id);
  },

  
  // defaults: function(){
  //   return {
  //     "title": "",
  //     "artist": "",
  //     "album_artist": "",
  //     "album": "",
  //     "file_name": "",
  //     "user": App.ROOT_USER
  //   }
  // },

});