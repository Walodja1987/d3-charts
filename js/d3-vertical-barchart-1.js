// Source: https://www.tutorialsteacher.com/d3js/create-bar-chart-using-d3js
// Note: if you don't see the axis labels, try to deactivate d3-basic-horizontal-barchart-1.css (that's because the font size might be set to white)


const graphWidth = 600, graphHeight = 500;

// Append SVG 
const graph = d3.select("body")
            .append("svg")
            .attr("width", graphWidth)
            .attr("height", graphHeight);

// Derive bar chart width & height from width and height by subtracting a margin 
const svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin

svg.append("text")
    .attr("transform", "translate(100,0)")
    .attr("x", 50)
    .attr("y", 50)
    .attr("font-size", "24px")
    .text("XYZ Foods Stock Price")

const xScale = d3.scaleBand().range([0, width]).padding(0.4),
      yScale = d3.scaleLinear().range([height, 0]);

const g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

d3.csv("data/XYZ.csv", function(error, data) {
    if (error) {
        throw error;
    }

    xScale.domain(data.map(function(d) { return d.year; }));
    yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("y", height - 250)
        .attr("x", width - 100)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Year");

    g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function(d){
            return "$" + d;
        })
        .ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Stock Price");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d.year); })
        .attr("y", function(d) { return yScale(d.value); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - yScale(d.value); });
});

