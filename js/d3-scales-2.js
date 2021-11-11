// Source: https://www.tutorialsteacher.com/d3js/scales-in-d3
/* Comments:
- Same example as d3-scales.js, but this time the data input is a JSON array
*/

// const data = [100, 400, 300, 900, 850, 1000]

// JSON Array input
const data = [
    {x: 1, y: 100},
    {x: 2, y: 400},
    {x: 3, y: 300},
    {x: 4, y: 900},
    {x: 5, y: 850},
    {x: 6, y: 1000}
];

const width = 500, barHeight = 20, margin = 1;

const scale = d3.scaleLinear()      
                .domain([d3.min(data, function(d) { return d.y; }), d3.max(data, function(d) { return d.y; })])
                .range([50, width]);
// Note: the 50 in range method refers to the value associated with y=100. That means the first bar will be 50px width
// If you choose 0 instead, then the first bar (with value 100) will not appear

const svg = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", barHeight * data.length);

const g = svg.selectAll("g")
                .data(data)
                .enter()
                .append("g")
                .attr("transform", function (d, i) {
                    return "translate(0," + i * barHeight + ")";
                });

g.append("rect")
    .attr("width", function (d) {
        return scale(d.y);
    })
    .attr("height", barHeight - margin)

g.append("text")
    .attr("x", function (d) { return (scale(d.y)); })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function (d) { return d.y; });
