(function(window) {
  var root = window;

  function Queue(){
    this.array = [];
  }
  Queue.prototype.front = function(){
    return this.array[0];
  };
  Queue.prototype.push = function(value){
    this.array.push(value);
  }
  Queue.prototype.size = function(){
    return this.array.length;
  }
  Queue.prototype.pop = function(){
    this.array.shift();
    return;
  }
  Queue.prototype.empty = function(){
    return this.array.length === 0;
  }
  Queue.prototype.back = function(){
    return this.array[this.array.length - 1];
  }
  
  App.Utils.Queue = Queue;
})(this);