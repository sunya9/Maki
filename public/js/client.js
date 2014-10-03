(function() {
  function Client(options) {
    _.extend(this, Backbone.Events);
  };

  Client.prototype.connect = function() {
    this.socket = io(App.WEB_SOCKET_URL);
    var that = this;
    this.socket.on("_getAll", function(allMusicData){
      that.allMusics = new App.Collections.Musics(allMusicData);
    });
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
  Client.prototype.emit = function(message, data){
    this.socket.emit(message, data);
  }

  App.Classes.Client = Client;
})();