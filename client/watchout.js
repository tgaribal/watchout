
var gameBoard = d3.select('svg');


// asteroids = [ {radius:20, cx: 50, cy: 100}, {radius:20, cx: 20, cy: 80} ....]


var asteroids = d3.range(20).map(function() {
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
  gameBoard.selectAll('circle')
  .transition().duration(2000)
  .attr('cx', function(d) { d.cx = Math.random() * parent.innerWidth * 0.8; return d.cx; })
  .attr('cy', function(d) { d.cy = Math.random() * parent.innerWidth * 0.8; return d.cy; });
};

setInterval(function () { 
  setPositions(); 
}, 2000);


// create the "player", center it on the board, and make it able to be dragged

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
  .attr('x', d3.event.x - 5)
  .attr('y', d3.event.y - 5);
};


gameBoard.append('rect')
.classed('user', true).data([1])
.attr('x', centerXNum)
.attr('y', centerYNum)
.style('fill', 'blue')
.call(onDragDrop(dragmove));






var score = 0;
var highScore = highScore || 0;
var collisionNum = 0;

var incrementScore = function() {
  score++;
  d3.select('.currentScore').text(score);
  if (score > highScore) {
    highScore = score;
    d3.select('.highScore').text(highScore);
  }
};


//initiate checkCollisions function
var checkCollisions = function() {
//query for all circle elements
  d3.selectAll('circle')
  .each(function (element) {
    var xDiff = Math.abs(element.cx - d3.select('rect').attr('x'));
    var yDiff = Math.abs(element.cy - d3.select('rect').attr('y'));
    if (yDiff < 10 && xDiff < 10) {
      console.log('collision', yDiff, xDiff);
      collisionNum++;
      score = 0;
      d3.select('.collisionScore').text(collisionNum);
    }
  });
};

setInterval(incrementScore, 50);
setInterval(checkCollisions, 10);



