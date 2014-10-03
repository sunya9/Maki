App.Views.Playlist = Backbone.View.extend({
  el : "div#playlists_wrapper",
  template : _.template($("#playlist-template").html()),

  events : {
    "click a": "showPlaylist",
  },

  initialize : function(options){
    _.bindAll(this, "render");
    this.listenTo(this.model, "change", this.render);
  },

  render : function(){
   this.$el.html(this.template(this.model.toJSON()));
   return this;
 },
 showPlaylist : function(){
  this.model.show();
}
});