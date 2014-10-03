App.Collections.Music = Backbone.Collection.extend({
  model: App.Models.Music,
  initialize : function(models, options){
    console.log("music initialize");
    console.log(models, options);
  },
});