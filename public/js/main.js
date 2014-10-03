(function(window) {
  var root = window;
  root.App = {
    Models: {},
    Collections: {},
    Views: {},
    Classes: {},

    WEB_SOCKET_URL: "http://localhost",
  };

  $(function() {

    App.Views.Window = Backbone.View.extend({
      initialize: function(options) {
        _.bindAll(this, "render");

        this.allMusicCollection = new App.Collections.Playlist({
          first_boot: true
        });

        this.$playlistsWrapper = this.$("div#playlists_wrapper");
        this.$main = $("main#main");


        this.allMusicCollection.fetch({
          first_boot: true
        });
      }
    });
    App.Models.Window = Backbone.Model.extend({

    });
    var appView = new App.Views.Window();
    var client = new App.Classes.Client();
    client.connect();

    $("form#test").submit(function(e) {
      e.preventDefault();
      var $message = $("input[type='text']#message");
      var data = $message.val();
      $message.val("");
      client.emit("c2s", {
        message: data
      });
      return false;
    });

    client.setListener("s2c", function(data) {
      $("</p>").text(data.message).appendTo("output#receive");
    });
  });
}(this));