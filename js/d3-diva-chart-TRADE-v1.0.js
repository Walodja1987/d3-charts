// https://bl.ocks.org/d3noob/402dd382a51a4f6eea487f9a35566de0
// Load d3-diva-chart-v1.0.css
// v1.0: first working version. To be implemented in future versions:
// - Generate data points via function instead of loading a json array
// - Combine long and short positions in one chart 
// - Switch color of vertical mouse line as of a certain point on the x axis
// - Change height of vertical mouse line to match the chart; add a horizontal line as well as on the mock-up

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// parse the date / time
// var parseTime = d3.timeParse("%d-%b-%y");



// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data/diva-chart-data.json", function(error, data) {
    if (error) throw error;

    // Add X axis
    const x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.x; }))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.y; })])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add the line
    const valueline = d3.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });
    svg
        .append("path")
        .datum(data)  // or data([data])
        .attr("class", "line")
        // .attr("stroke", function() { return (myData.isLong ? "steelblue" : "orange"); }) // conditional formatting; remove stroke argument from css file
        .attr("d", valueline);
        

    // Add mouseover effects
    const mouseG = svg.append("g")  // corresponds to the first part of focus/focusText in the other example but without the circle/text, this will be added later
        .attr("class", "mouse-over-effects");

    // This is the black vertical line to follow mouse
    // The values for the path are passed as the "d" attribute later
    mouseG.append("path") 
        .attr("class", "mouse-line")
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .style("opacity", "0")
    
    const lines = document.getElementsByClassName('line');

    
    const mousePerLine = mouseG
        .data(data)
        .append("g")
        .attr("class", "mouse-per-line");

    // Create the circle that travels along the curve of chart
    mousePerLine.append("circle") 
        .attr("r", 7)
        .style("stroke", "white") 
        .style("fill", "white")
        .style("stroke-width", "2px")
        .style("opacity", "0");

    // Create the text that travels along the curve of chart
    mousePerLine.append("text")   
                .attr("transform", "translate(10,3)");

    // Create a rect on top of the svg area to catch mouse movements on canvas
    // Can't catch mouse events on a g element
    mouseG.append('svg:rect')  // changed from mouseG to svg
    .attr('width', width) 
    .attr('height', height)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function() { // on mouse out hide line, circles and text
        d3.select(".mouse-line")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
            .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
            .style("opacity", "0");
        })
    .on('mouseover', function() { // on mouse in show line, circles and text
    d3.select(".mouse-line")
        .style("opacity", "1")
    d3.selectAll(".mouse-per-line circle")
        .style("opacity", "1");
    d3.selectAll(".mouse-per-line text")
        .style("opacity", "1");
    })
    .on('mousemove', function() { // mouse moving over canvas
    var mouse = d3.mouse(this);
    d3.select(".mouse-line")
        .attr("d", function() {
        var d = "M" + mouse[0] + "," + height;
        d += " " + mouse[0] + "," + 0;
        return d;
        })
        .style("stroke", function() { return (x.invert(mouse[0]) > 35 ? "green" : "red"); });

    d3.select(".mouse-per-line circle")
        .style("fill", function() { return (x.invert(mouse[0]) > 35 ? "green" : "red"); });

    d3.selectAll(".mouse-per-line")
        .attr("transform", function(d, i) {
        console.log(width/mouse[0])
        var xValue = x.invert(mouse[0]),
            bisect = d3.bisector(function(d) { return d.x; }).right;
            idx = bisect(d.y, xValue);
        
        var beginning = 0,
            end = lines[i].getTotalLength(),
            target = null;

        while (true){
            target = Math.floor((beginning + end) / 2);
            pos = lines[i].getPointAtLength(target);
            if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                break;
            }
            if (pos.x > mouse[0])      end = target;
            else if (pos.x < mouse[0]) beginning = target;
            else break; //position found
        }
        
        d3.select(this).select('text')
            .text(y.invert(pos.y).toFixed(2));
            
        return "translate(" + mouse[0] + "," + pos.y +")";
        });
    });


});







