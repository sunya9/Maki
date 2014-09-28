var socketIO = require('socket.IO');

module.exports = function(server) {
  var io = socketIO.listen(server);
  io.sockets.on('connection', function(socket){
    console.log('connection');
    socket.on('c2s', function(data){
      data.message = data.message.split('').reverse().join('');
      socket.emit('s2c', data);
    });
    socket.on('disconnect', function(){
      console.log('disconnect');
    })
  });
};