// Source: https://www.tutorialsteacher.com/d3js/create-svg-chart-in-d3js
/* Comments:
- In this example we use scaleFactor to ensure that our shapes are visible on the screen (data interpreted as pixels)
- However, Data values may not always correspond to pixel values on the screen. Some data values may be too large while
  others too small, to be used directly with pixel values. That's why the scales in D3 are so useful
- For more information on scales see here: https://www.tutorialsteacher.com/d3js/scales-in-d3
- Note that linear scale was denoted d3.scale.linear in v3 and earlier and is now d3.scaleLinear in v4
*/
const data = [5, 10, 12];
const width = 200, scaleFactor = 10, barHeight = 20;

const graph = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", barHeight * data.length);

const bar = graph.selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function(d, i) {
        return "translate(0," + i * barHeight + ")";
    });

bar.append("rect")
    .attr("width", function(d) {
        return d * scaleFactor;
    })
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return (d*scaleFactor); })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });