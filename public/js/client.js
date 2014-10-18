(function() {
  var instance;

  function Client(options) {
    if (!instance) {
      instance = this;
      _.extend(this, Backbone.Events);
      this.socket = io(App.WEB_SOCKET_URL);
      var that = this;
      this.socket.on("_getAll", function(allMusicData) {
        that.allMusics = new App.Collections.Musics(allMusicData);
      });
    }
    return instance;
  };

  Client.prototype.setListener = function(message, listener) {
    this.socket.on(message, listener);
  }
  Client.prototype.removeListener = function(message, listener) {
    this.socket.removeListener(message, listener);
  }
  Client.prototype.removeAllListener = function(message) {
    this.socket.removeAllListener(message);
  }
  Client.prototype.emit = function(message, data) {
    this.socket.emit(message, data);
  }

  App.Classes.Client = Client;
})();