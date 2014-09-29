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

    $.getJSON("./get", function(data, status){
      if(status !== 200)
        return console.error("status code is " + status);
        _.each(data, function(music){
          console.log(music);
          $("</p>").text(music).appendTo("output");
        });
    })

  });
}(jQuery));