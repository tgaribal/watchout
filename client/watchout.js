
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
  gameBoard.selectAll('circle').data(asteroids)
  .transition().duration(2000)
  .attr('cx', function(d) { return Math.random() * parent.innerWidth * 0.8 + 50; })
  .attr('cy', function(d) { return Math.random() * parent.innerHeight * 0.8 + 30; });
};

setInterval(function () {
  console.log('running');
  setPositions(); 
}, 2000);
