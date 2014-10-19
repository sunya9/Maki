(function(window) {
  var root = window;
  root.App = {
    Models: {},
    Collections: {},
    Views: {},
    Classes: {},
    Utils: {},
    WEB_SOCKET_URL: "http://localhost",
    ROOT_USER: "root",
    SEARCH_OPERATOR_OPTIONS: {
      keywords: ["title", "artist", "album_artist", "album", "user"],
    },
    REGEXP_STR_REG: /^\/(.*)\/([igm]*)$/,
    DEBUG: location.search.indexOf("debug=1") >= 0,
  };

  App.Views.Window = Backbone.View.extend({
    el: "div#container",

    events: {
      "submit form#add_user_form": "addUser",
      "click button#change_music_info": "changeMusicInfo",
    },

    changeMusicInfo: function() {
      root.playlistCollection.first().get("musics").first().set({
        artist: "xyz"
      });
    },

    initialize: function(options) {
      _.bindAll(this, "render");
      this.counter = 0;
      var self = this;
      this.$addUserForm = $("form#add_user_form");
      this.$addPlaylistForm = $("form#add_playlist_form");
      root.playlistCollection = new App.Collections.Playlist([{
        title: "All Music",
        user: App.ROOT_USER,
        real: true,
        _id: 0
      }], {
        add: true,
        validate: true,
      });
      this.playlistWrapperView = new App.Views.PlaylistWrapper({
        collection: root.playlistCollection
      });
      this.uploadFileWrapper = new App.Views.UploadFileWrapper;
      root.allMusicCollection = root.playlistCollection.first().get("musics");
      root.musicWrapperView = new App.Views.MusicWrapper({
        collection: root.allMusicCollection
      });

      // var dfd = $.Deffered();
      // this.listenToOnce(root.allMusicCollection,"sync", function(){

      // });
      root.playlistCollection.fetch({
        validate: true,
        remove: false
      });
      this.currentPlaylist = root.playlistCollection.first();

      var self = this;
      this.client = new App.Classes.Client();
      this.client.setListener("s2c", function(data) {
        $("</p>").text(data.message).appendTo("output#receive");
      });
      $("form#test_form").submit(function(e) {
        e.preventDefault();
        var $message = $("input[type='text']#message");
        var data = $message.val();
        $message.val("");
        self.client.emit("c2s", {
          message: data
        });
        return false;
      });
      this.queue = new App.Utils.Queue();
    },


    applyLoop: function() {
      while (this.queue.empty()) {
        var task = this.queue.front();
        task();
        this.queue.pop();
      }
    },

    addUser: function(e) {
      e.preventDefault();
      var name = $("input[name='name']", this.addUserForm).val();
      console.log(name);
      return false;
    },

  });
  $(function() {
    root.appView = new App.Views.Window();
  });

}(this));