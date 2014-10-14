App.Models.RealMusic = App.Models.Music.extend({
  idAttribute: "_id",
  urlRoot: '/musics',

  initialize: function(attrs, options) {
    console.log("music model initialize.");
    // console.log("music model attrs", attrs);
    // console.log("music model options", options);
    console.info("music model title", this.attributes.title);
  },

  defaults: function() {
    return {
      "title": "",
      "artist": "",
      "album_artist": "",
      "album": "",
      "file_name": "",
      "real" : true,
      "user": App.ROOT_USER,
      "visible" : true
    }
  },

  parse: function(res) {
    console.log('music models parse called');
    // exclude __v field.
    res = _.omit(res, "__v");
    return res;
  },

  validate: function(attrs, options) {
    if (attrs.title === "" || attrs.file_name === "") {
      console.error("title and file_name must be not empty.");
    }
  }
});