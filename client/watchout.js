
var gameBoard = d3.select('svg');


// asteroids = [ {radius:20, cx: 50, cy: 100}, {radius:20, cx: 20, cy: 80} ....]


var asteroids = d3.range(5).map(function() {
  return {
    radius: 20,
    cx: Math.random() * parent.innerWidth * 0.7 + 50,
    cy: Math.random() * parent.innerHeight * 0.7 + 30
  };
});

// bind initial data to a corresponding circle node


gameBoard.selectAll('circle').data(asteroids)
  .enter().append('circle')
  .attr('cx', function(d) { return d.cx; })
  .attr('cy', function(d) { return d.cy; })
  .attr('r', 20);


// transition each circle to a new 'cx' and a new 'cy'


var setPositions = function() {
  gameBoard.selectAll('circle').data(asteroids)
  .transition().duration(2000)
  .attr('cx', function(d) { return Math.random() * parent.innerWidth * 0.8; })
  .attr('cy', function(d) { return Math.random() * parent.innerHeight * 0.8; });
};

setInterval(function () { 
  setPositions(); 
}, 2000);


// create a new circle

var centerXString = d3.select('svg').style('width');
var centerXNum = Number((centerXString.substring(0, centerXString.length - 2 ) / 2 ));

var centerYString = d3.select('svg').style('height');
var centerYNum = Number((centerYString.substring(0, centerYString.length - 2) / 2));


var onDragDrop = function (dragMove) {
  var drag = d3.behavior.drag();
  drag.on('drag', dragMove)
  .on('dragend');
  return drag;
};

var dragmove = function (d) {
  d3.select(this)
  .attr('x', d3.event.x - 15)
  .attr('y', d3.event.y - 15);
};


gameBoard.append('rect')
.classed('user', true).data([1])
.attr('x', centerXNum)
.attr('y', centerYNum)
.style('fill', 'blue')
.call(onDragDrop(dragmove));

var collision = false;
var highScore = highScore || 0;
var collisionNum = 0;


d3.timer(function(elapsed) {
  var score = Math.floor(elapsed / 100);
  d3.select('.currentScore').text(score);
  if (checkCollisions()) {
    collisionNum++;
    d3.timer.stop();
    d3.select('.collisionScore').text(collisionNum);
    if (score > highScore) {
      highScore = score;
      d3.select('.highScore').text(highScore);
    }
  }
}, 10);
//console.log(t);

//initiate checkCollisions function
var checkCollisions = function() {
//query for all circle elements
  d3.selectAll('circle')
  .each(function (element) {
    var xDiff = Math.abs(element.cx - d3.select('rect').attr('x'));
    var yDiff = Math.abs(element.cy - d3.select('rect').attr('y'));
    //console.log(element);
    if (yDiff < 15) {
      console.log(xDiff)
      console.log('collision!');
      return true;
    }
  });
  return false;
  //check if cx of circle = cx of mouse AND cy of circle = cy of mouse (approximately)
    //collision = true
    //otherwise collision is false
};

//call check collisions every few milliseconds




