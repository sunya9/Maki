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
      "click button#test": "addMusic",
      "click button#change_music_info": "changeMusicInfo",
    },

    changeMusicInfo: function() {
      root.playlistCollection.first().get("musics").first().set({
        artist: "xyz"
      });
    },

    addMusic: function() {
      var si = Math.random();
      this.counter++;
      var users = ["xyz", "_X_y_z_", "sunya", "observer"];
      var self = this;
      _.sample(root.playlistCollection.models).get("musics").add({
        title: _.sample(users) + "'s song(" + self.counter + ")",
        artist: _.sample(users),
        album: _.sample(users) + "'s album",
        file_name: "none",
        user: _.sample(users),
        _id: "erhe" + self.counter
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

      root.playlistCollection.fetch({
        validate: true,
        remove: false
      });
      this.currentPlaylist = root.playlistCollection.first();
      this.$main = $("main#main");

      var client = new App.Classes.Client();
      client.connect();
      client.setListener("s2c", function(data) {
        this.collection.trigger("onStartUpload");
        $("</p>").text(data.message).appendTo("output#receive");
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

    render: function() {
      console.log("app render");
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

  $("form#test_form").submit(function(e) {
    e.preventDefault();
    var $message = $("input[type='text']#message");
    var data = $message.val();
    $message.val("");
    client.emit("c2s", {
      message: data
    });
    return false;
  });

}(this));