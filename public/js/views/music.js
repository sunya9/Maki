(function(window) {
  var root = window;
  App.Views.Music = Backbone.View.extend({
    tagName: "li",
    template: _.template($("#music-template").html()),


    events: {
      "click a.remove_from_playlist": "removeFromPlaylist",
      "click a.copy_to_other_playlist": "copyToOtherPlaylist",
      "click a.delete_music": "deleteMusic",
    },

    initialize: function(options) {
      // console.log("music view initialize");
      // console.log("music view options", options, this);
      this.parentCollection = options.parentCollection || root.allMusicCollection;
      this.model.set("real", _.isUndefined(options.real) ? true : options.real);
      // console.log("options.parentCollection", options.parentCollection);
      this.listenTo(this.model, "change", this.render);
      // this.listenTo(this.model, "add", this.render);
      this.listenTo(this.model, "remove destroy", this.remove);
    },


    render: function() {
      // console.log("music view render", this.model);
      // console.error("music view render this", this);
      this.$el.html(this.template(this.model.toJSON()))
      if (this.model.get("visible")) {
        this.$el.html(this.template(this.model.toJSON())).show();
      }else{
        this.$el.hide();
      }
      return this;
    },

    removeFromPlaylist: function() {
      console.log("this.parentCollection", this.parentCollection);
      this.parentCollection.remove(this.model);
      console.log("removeFromPlaylist");
      console.log(this.model.collection);
    },

    deleteMusic: function() {
      console.log("delete music.");
      this.model.destroy();
    },

    copyToOtherPlaylist: function() {
      if (this.model instanceof App.Models.RealMusic) {
        console.log("this model is real music data.");
      } else {
        console.log("this model is imaginary music data.");
      }
      console.log("selected model info", this.model);
      var id = this.model.id;
      var copyModel = this.model;
      console.log("copy model", id, copyModel);
      _.sample(root.playlistCollection.models).get("musics").add(copyModel);
    }
  });
})(this);