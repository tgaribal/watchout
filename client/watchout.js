
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
  console.log('running');
  setPositions(); 
}, 2000);


// create a new circle

//var user = { cx: parent.innerWidth / 2, cy: parent.innerWidth / 2};

var centerXString = d3.select('svg').style('width');
var centerXNum = Number((centerXString.substring(0, centerXString.length - 2 ) / 2 ));

var centerYString = d3.select('svg').style('height');
var centerYNum = Number((centerYString.substring(0, centerYString.length - 2) / 2));




gameBoard.append('rect')
.classed('user draggable', true).data([1])
.attr({
  x: centerXNum,
  y: centerYNum,
})
.style('fill', 'blue')
.attr('x', function (d) { return d.x; })
.attr('y', function (d) { return d.y; })
.call(onDragDrop(dragmove, dropHandler));

var onDragDrop = function (dragHandler, dropHandler) {
  var drag = d3.behavior.drag();
  drag.on('drag', dragHandler)
  .on('dragend', dropHandler);
  return drag;
};

var dropHandler = function (d) {
  // alert('dropped');
};

var dragmove = function (d) {
  d3.select(this)
  .attr('x', d.x = d3.event.x)
  .attr('y', d.y = d3.event.y);
};

