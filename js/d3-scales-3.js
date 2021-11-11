// Source: https://www.tutorialsteacher.com/d3js/scales-in-d3
/* Comments:
- Same example as d3-scales-2.js, but this time the JSON array is imported from an external file (found a solution here: https://www.dashingd3js.com/d3-tutorial/d3-json-data)
  But it doesn't seem to work
- Note that all the d3 statements are now part of the callback function in d3.csv
*/

// JSON Array input
d3.json("./data/data.json", function(error, data) {
    if (error) {
        throw error;
    }


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

});
