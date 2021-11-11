// https://bl.ocks.org/d3noob/402dd382a51a4f6eea487f9a35566de0
// Load d3-diva-chart-MARKETS-v1.0.css
// Version for markets page 
// Loading data from JSON Array imported from other .js file


// Import the function that generates the data in JSON Array for the payoff
import generatePayoffChartData from './diva-chart-data-generator.js';

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

// Call option example 
// const myData = {
//   collateralBalanceLong: 20,
//   collateralBalanceShort: 10,
//   strike: 20,
//   inflection: 35,
//   cap: 40,
//   tokenSupply: 30,
//   isLong: true
// };

// Put option example 
const myData = {
    collateralBalanceLong: 20,
    collateralBalanceShort: 10,
    strike: 40,
    inflection: 35,
    cap: 20,
    tokenSupply: 30,
    isLong: false
  };

const data = generatePayoffChartData(myData)
console.log(data)
// Generate (but not plot) X axis
const x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.x; }))
    .range([0, width]);
// Added axis for testing only; comment out this part before you use it on the markets page
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Generate (but not plot) Y axis
const y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.y; })])
    .range([height, 0]);
// Added axis for testing only; comment out this part before you use it on the markets page
svg.append("g")
    .call(d3.axisLeft(y));

// Add the line
const valueline = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });
svg
    .append("path")
    .datum(data)  
    .attr("class", "line")
    .attr("stroke", function() { return (myData.isLong ? "steelblue" : "orange"); }) // conditional formatting
    .attr("d", valueline);







