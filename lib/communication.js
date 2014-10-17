var socketIO = require('socket.IO');
var _io;
var _socket;

exports.init = function(server) {
  _io = socketIO.listen(server);
  _io.sockets.on('connection', function(socket) {
    console.log('connection');
    _socket = socket;
    socket.on('c2s', function(data) {
      data.message = data.message.split('').reverse().join('');
      socket.emit('s2c', data);
    });
    socket.on('disconnect', function() {
      console.log('disconnect');
    })
  });
};

exports.emit = function(message, data) {
  _socket.emit(message, data);
}