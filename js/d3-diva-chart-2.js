// Source: https://www.d3-graph-gallery.com/graph/line_cursor.html 

// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.json("data/diva-chart-data.json",function(error, data) {
    if (error) throw error;
  
    // Add X axis
    const x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.x; }))
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.y; })])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // This allows to find the closest X index of the mouse:
    const bisect = d3.bisector(function(d) { return d.x; }).left;

    // Add the line
    svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
        .x(function(d) { return x(d.x) })
        .y(function(d) { return y(d.y) })
        )

    // Create the circle that travels along the curve of chart
    const focus = svg
        .append('g')
        .append('circle')
        .style("fill", "none")
        .attr("stroke", "black")
        .attr('r', 8.5)
        .style("opacity", 0)

    // Create the text that travels along the curve of chart
    const focusText = svg
        .append('g')
        .append('text')
        .attr("class", "mouse-over-effects") // added
        .style("opacity", 0)
        .attr("text-anchor", "left")
        .attr("alignment-baseline", "middle")

    // Create a rect on top of the svg area: this rectangle recovers mouse position
    svg
        .append('rect')
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);


    // What happens when the mouse move -> show the annotations at the right positions.
    function mouseover() {
        focus.style("opacity", 1)
        focusText.style("opacity",1)
    }

    function mousemove() {
        // recover coordinate we need
        const x0 = x.invert(d3.mouse(this)[0]);
        const i = bisect(data, x0, 1);
        selectedData = data[i]
        var mouse = d3.mouse(this);
        focus
            .attr("d", function() {
            var d = "M" + mouse[0] + "," + height;
            d += " " + mouse[0] + "," + 0;
            return d;
            })
        .attr("cx", x(selectedData.x))
        .attr("cy", y(selectedData.y))
        focusText
        .html("x:" + selectedData.x + "  -  " + "y:" + selectedData.y)
        .attr("x", x(selectedData.x)+15)
        .attr("y", y(selectedData.y))

        
        }
    function mouseout() {
        focus.style("opacity", 0)
        focusText.style("opacity", 0)
    }

})