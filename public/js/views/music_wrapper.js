(function(window) {
  var root = window;
  App.Views.MusicWrapper = Backbone.View.extend({
    el: "div#musiclist_wrapper",

    events: {
      "input input#musiclist_filter_text": "filterCollection",
      "reset form#musiclist_filter_form": "resetFilterForm",
      "submit form#musiclist_filter_form": "_filterCollection"
    },

    _filterCollection: function(e) {
      if (e && e.type === "submit")
        e.preventDefault();
      var searchStr = e && e.type !== "reset" ? this.$musiclistFilterInput.val() : "";
      this.collection.filterMusic(searchStr);
      return false;
    },

    filterCollection: _.noop, // debounce _filterCollection

    initialize: function() {
      console.log("initialize music wrapper.");
      _.bindAll(this, "render", "renderOne", "remove");
      this.filterCollection = _.debounce(this._filterCollection, 300);
      var self = this;
      this.$currentMusicList = this.$("ol#musiclist");
      this.$muslistFilterForm = this.$("form#musiclist_filter_form");
      this.$musiclistFilterInput = this.$("input#musiclist_filter_text", this.$muslistFilterForm);
      this.listenToOnce(this.collection, "sync", function() {
        self.changeMusiclist();
        return this;
      })
      this.client = new App.Classes.Client();
      this.client.setListener("music:create", function(result) {
        var music = result.music;
        var playlists = result.playlist;
        root.playlistCollection.requestInsertMusic(music, playlists);
      });
    },

    resetFilterForm: function(e) {
      this.$muslistFilterForm[0].reset();
      this._filterCollection(e);
    },

    render: function() {
      this.collection.each(this.renderOne, this);
      return this;
    },

    renderOne: function(music) {
      var musicItemView = new App.Views.Music({
        model: music,
        parentCollection: this.collection,
        real: this.collection === root.allMusicCollection,
      });
      this.$currentMusicList.append(musicItemView.render().el);
    },

    changeMusiclist: function(collection) {
      if (this.collection == collection) return;
      if (collection) {
        this.$currentMusicList.empty();
        this.resetFilterForm();
        this.stopListening();
        this.collection = collection;
        this.listenTo(this.collection, "add", this.renderOne);
      }
      this.render();
    }
  });
})(this);