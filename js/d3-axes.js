// Source: https://www.tutorialsteacher.com/d3js/axes-in-d3
// This code example shows how to create x- and y-axes in D3
// The d3.axisBottom() and d3.axisLeft() functions have been introduced in the latest version of D3 i.e. version 4. 
// Earlier versions used d3.svg.axis() with orient("left") and orient("bottom") for y-axis and x-axis respectively.
// NOTE: Deactivate stylesheets, otherwise you might not see the axis labels

// x-axis
const width = 400, height = 400;
const data = [10, 15, 20, 25, 30];

// Append SVG 
const svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);



// Create x and y scales
const xscale = d3.scaleLinear()
                .domain([0, d3.max(data)])
                .range([0, width - 100]);

const yscale = d3.scaleLinear()
                .domain([0, d3.max(data)])
                .range([height/2, 0]);


// Add scales to x- and y-axis
const x_axis = d3.axisBottom()
                .scale(xscale);

const y_axis = d3.axisLeft()
                .scale(yscale);

// Append group and insert axis
svg.append("g")
    .attr("transform", "translate(50, 10)")
    .call(y_axis);

const xAxisTranslate = height/2 + 10;

svg.append("g")
    .attr("transform", "translate(50, " + xAxisTranslate  +")")
    .call(x_axis)
