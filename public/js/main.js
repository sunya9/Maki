(function($) {
  $(function() {
    var socket = io('http://localhost');
    socket.on('s2c', function(data) {
    $("</p>").text(data.message).appendTo("output#receive");
    }); 

    $("form#test").submit(function(e) {
      e.preventDefault();
      var $message = $("input[type='text']#message");
      var data = $message.val();
      $message.val("");
      socket.emit("c2s", {
        message: data
      });

      return false;
    });

  });
}(jQuery));