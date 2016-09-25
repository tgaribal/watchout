// library.js (Library Code)
var Car = function(loc){
  var result = Object.create(Car.prototype)
  result.loc = loc;
  return result;
};

Car.prototype.move = function(){
  this.loc++;
};

var Van = function(loc){
  Car.call(this, loc);
};

Van.prototype = Object.create(Car.prototype);
Van.prototype.constructor = Van;

Van.prototype.move = function(){
  this.loc += Math.floor(5 * Math.rand());
};

// app.js (Usage Code)
var bob = new Car({loc: 0});
bob.constructor === Car
var amy = new Van({loc: 0});
amy.constructor === Van


