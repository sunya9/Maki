App.Collections.UploadFile = Backbone.Collection.extend({
  model: App.Models.UploadFile,
  url: "/musics",

  initialize: function(models, options) {
    console.log("initialize upload file collection.");
  },
});