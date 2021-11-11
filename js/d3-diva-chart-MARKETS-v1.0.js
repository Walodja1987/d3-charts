// https://bl.ocks.org/d3noob/402dd382a51a4f6eea487f9a35566de0
// Load d3-diva-chart-MARKETS-v1.0.css
// Version for markets page
// Loading data from json file using d3.json 

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

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

// const myData = [
//     {"x": 1, "y": 100},
//     {"x": 2, "y": 400},
//     {"x": 3, "y": 300},
//     {"x": 4, "y": 900},
//     {"x": 5, "y": 850},
//     {"x": 6, "y": 1000}
// ]

// const data = d3.jsonParse(myData);
// console.log("test" + data)

// Get the data
d3.json("data/diva-chart-data.json", function(error, data) {
    if (error) throw error;

    // // Add X axis
    const x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.x; }))
        .range([0, width]);

    // // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.y; })])
        .range([height, 0]);

    // Add the line
    const valueline = d3.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });
    svg
        .append("path")
        .datum(data)  // or data([data])
        .attr("class", "line")
        .attr("d", valueline);
        
});







