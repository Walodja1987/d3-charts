// Source: https://bl.ocks.org/larsenmtl/e3b8b7c2ca4787f77d78f58d41c3da91#index.html
// NOTE: Make sure you load D3 v3 in index.html in order to run this example
// css file: d3-animated-linechart-2.css

// const myData = "date	New York	San Francisco	Austin\n\
// 20111001	63.4	62.7	72.2\n\
// 20111002	58.0	59.9	67.7\n\
// 20111003	53.3	59.1	69.4\n\
// 20111004	55.7	58.8	68.0\n\
// 20111005	64.2	58.7	72.4\n\
// 20111006	58.8	57.0	77.0\n\
// 20111007	57.9	56.7	82.3\n\
// 20111008	61.8	56.8	78.9\n\
// 20111009	69.3	56.7	68.8\n\
// 20111010	71.2	60.1	68.7\n\
// 20111011	68.7	61.1	70.3\n\
// 20111012	61.8	61.5	75.3\n\
// 20111013	63.0	64.3	76.6\n\
// 20111014	66.9	67.1	66.6\n\
// 20111015	61.7	64.6	68.0\n\
// 20111016	61.8	61.6	70.6\n\
// 20111017	62.8	61.1	71.1\n\
// 20111018	60.8	59.2	70.0\n\
// 20111019	62.1	58.9	61.6\n\
// 20111020	65.1	57.2	57.4\n\
// 20111021	55.6	56.4	64.3\n\
// 20111022	54.4	60.7	72.4\n";

const margin = {
    top: 20,
    right: 80,
    bottom: 30,
    left: 50
    },
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

const paddingTop = 30; 

// Parse the date / time
// const parseDate = d3.timeParse("%Y%m%d");

const x = d3.scaleLinear()
      .range([0, width]);

const y = d3.scaleLinear()
      .range([height, paddingTop]);

// Create a color scale
const color = d3.scaleOrdinal(d3.schemeCategory10); // you find the colors here: http://bl.ocks.org/aaizemberg/78bd3dade9593896a59d
// Read here about scaleOrdinal and d3.schemeCategory10

const xAxis = d3.axisBottom()
        .scale(x)

const yAxis = d3.axisLeft()
        .scale(y);

xAxis.ticks(3);
xAxis.tickValues([30,35,40]);
xAxis.tickFormat(d3.format(",.0f"));
xAxis.tickSizeOuter(0);



// yAxis.attr("stroke","#E04836")
//   .attr("stroke-width","10")
//   .attr("opacity",".6")
//   .attr("stroke-dasharray","4");
// // d3.selectAll('.domain').remove();

// Define the line
const line = d3.line()
.x(function(d) { return x(d.x); })
.y(function(d) { return y(d.y); })
//.curve(d3.curveLinear); // interpolation types: https://bl.ocks.org/emmasaunders/f7178ed715a601c5b2c458a2c7093f78

// Create svg area and group element inside
const svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("overflow", "visible")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// parse data into a JSON array 
// [
// {date: "12355", New York: "63.4", San Francisco: "62.7", Austin: "72.2"} 
// {}
// {}
// columns: ["date", "New York", "San Francisco", "Austin"]
//]      
// const data = d3.tsvParse(myData); // Here the date is still a string
// console.log(data)

const data = [
    {"x": 28, "Call": 0, "Put": 1.0}, 
    {"x": 30, "Call": 0, "Put": 1.0},
    {"x": 32, "Call": 0.2, "Put": 0.8},
    {"x": 34, "Call": 0.4, "Put": 0.6},
    {"x": 36, "Call": 0.6, "Put": 0.4},
    {"x": 38, "Call": 0.8, "Put": 0.2},
    {"x": 40, "Call": 1.0, "Put": 0},
    {"x": 42, "Call": 1.0, "Put": 0}
]

// const payoffs = [
//     {"isLong": true, 
//      "values": [
//         {"x": 28, "y": 0}, 
//         {"x": 30, "y": 0},
//         {"x": 32, "y": 0.2},
//         {"x": 34, "y": 0.4},
//         {"x": 36, "y": 0.6},
//         {"x": 38, "y": 0.8},
//         {"x": 40, "y": 1.0},
//         {"x": 42, "y": 1.0}
//         ]
//     },
//     {"isLong": false, 
//      "values": [
//         {"x": 28, "y": 1.0}, 
//         {"x": 30, "y": 1.0},
//         {"x": 32, "y": 0.8},
//         {"x": 34, "y": 0.6},
//         {"x": 36, "y": 0.4},
//         {"x": 38, "y": 0.2},
//         {"x": 40, "y": 0},
//         {"x": 42, "y": 0}
//         ]
//     }
// ]

// console.log(data);
// d3.keys(data[0]) gives you get the header in a tsv file. You could also have use data[1], data[2], doesn't matter
// This function would return all headers except for "date", i.e the 3 payoffs -> i.e. it instantiates 3 colors
color.domain(d3.keys(data[0]).filter(function(key) {
    return key !== "x";
  }));

// console.log(d3.keys(data[0]))

// Create JSON Array with attribute name (string) and values (JSON array with attributes date and temperature)
// Output format:
// [
//  {name: "New York", values: [{date: Sat Oct 01 2011 00:00:00 GMT+0200 (Mitteleuropäische Sommerzeit), temperature: 63.4} {} {} ...] }
//  {name: "San Francisco", values: [{date: Sat Oct 01 2011 00:00:00 GMT+0200 (Mitteleuropäische Sommerzeit), temperature: 63.4} {} {} ...] }
//  {name: "Austin", values: [{date: Sat Oct 01 2011 00:00:00 GMT+0200 (Mitteleuropäische Sommerzeit), temperature: 63.4} {} {} ...] }
// ]
const payoffs = color.domain().map(function(name) {
    return {
      optionType: name,
      values: data.map(function(d) {
        return {
          x: d.x,
          y: +d[name]  // this + converts the string into a number
        };
      })
    };
  });
console.log(payoffs);

// Set domain of x; extent returns min and max values of data
x.domain(d3.extent(data, function(d) {
  return d.x;
  })
);

y.domain([
  d3.min(payoffs, function(c) {
      return d3.min(c.values, function(v) {
      return v.y;
      });
  }),
  d3.max(payoffs, function(c) {
      return d3.max(c.values, function(v) {
      return v.y;
      });
  })
]);

// Add legend
const legend = svg.selectAll('g')
  .data(payoffs)
  .enter()
  .append('g')
  .attr('class', 'legend');

legend.append('rect')
  .attr('x', width - 20)
  .attr('y', function(d, i) {
    return i * 20 + 50;
  })
  .attr('width', 10)
  .attr('height', 10)
  .style('fill', function(d) {
    return color(d.optionType);
  });

legend.append('text')
    .attr('x', width - 8)
    .attr('y', function(d, i) {
    return (i * 20) + 59;
    })
    .text(function(d) {
    return d.optionType;
    });
    
// Add axes 
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .style("font-size", "15px")
    .call(xAxis)
    

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis.tickSize(0))
    .style("font-size", "15px");

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", ".71em")
    .style("text-anchor", "middle")
    .text("Option Payout (DAI)");


const city = svg.selectAll(".city")
    .data(payoffs)
    .enter().append("g")
    .attr("class", "city");

// Plot the data
city.append("path")
    .attr("class", "line")
    .attr("d", function(d) {
      return line(d.values);
    })
    .style("stroke", function(d) {
      return color(d.optionType);
});

    // Add mouseover effects

    var mouseG = svg.append("g")
      .attr("class", "mouse-over-effects");

    mouseG.append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "grey")
      .style("stroke-width", "2px")
      .style("opacity", "0");
      
    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(payoffs)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    const tooltipPerLine = mouseG
      .data(data)
      .append("g")
      .attr("class", "tooltip-per-line");


    mousePerLine.append("circle")
      .attr("r", 7)
      .style("fill", function(d) {
        return color(d.optionType);
      })
      .style("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", "0");

    const tooltipBoxWidth = 250
    const tooltipBoxHeight = 20

    tooltipPerLine.append("rect")
        .attr("class", "tooltip")
        .attr("width", tooltipBoxWidth)
        .attr("height", tooltipBoxHeight)
        .attr("x", 10)
        .attr("y", 0)
        .attr("rx", 4)
        .attr("ry", 4)
        .style("fill", "none")
        .style("opacity", "0");

    tooltipPerLine.append("text")
        .attr("x", 18)
        .attr("y", 15)
        .text("WBTC/USDT at Expiry:");

    tooltipPerLine.append("text")
        .attr("class", "tooltip-underlying")
        .attr("text-anchor", "end")
        .attr("x", tooltipBoxWidth)
        .attr("y", 15);

    mousePerLine.append("text")
      .attr("transform", "translate(10,3)");

    // Create the text that travels along the curve of chart and the position relative to the mouse location
    tooltipPerLine.append("text")
      .attr("class", "topRow")   
      .attr("transform", "translate(10,3)")

    var formatDecimalComma = d3.format(",.2f") // For more formats check here: http://bl.ocks.org/mstanaland/6106487

    var mouseout = function() { // on mouse out hide line, circles and text
      d3.select(".mouse-line")
        .style("opacity", "0");
      d3.selectAll(".mouse-per-line circle")
        .style("opacity", "0");
      d3.selectAll(".mouse-per-line text")
        .style("opacity", "0");
      d3.selectAll(".tooltip-per-line rect")
        .style("opacity", "0");
      d3.selectAll(".tooltip-per-line text")
        .style("opacity", "0");
    }

    var mouseover = function() { // on mouse in show line, circles and text
      d3.select(".mouse-line")
        .style("opacity", "1");
      d3.selectAll(".mouse-per-line circle")
        .style("opacity", "1");
      d3.selectAll(".mouse-per-line text")
        .style("opacity", "1");
      d3.selectAll(".tooltip-per-line rect")
        .style("opacity", "1");
      d3.selectAll(".tooltip-per-line text")
        .style("opacity", "1");
    }


    var mousemover = function() { // mouse moving over canvas
      var mouse = d3.mouse(this);
      d3.select(".mouse-line")
        .attr("d", function() {
          var d = "M" + mouse[0] + "," + height;
          d += " " + mouse[0] + "," + paddingTop;
          return d;
        });

      d3.selectAll(".mouse-per-line")
        .attr("transform", function(d, i) {
          console.log(width/mouse[0])
          var xValue = x.invert(mouse[0])
              // bisect = d3.bisector(function(d) { return d.date; }).right;
              // idx = bisect(d.values, xDate);
          
          var beginning = 0,
              end = lines[i].getTotalLength(),
              target = null;
              pos = null;
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
            .text(formatDecimalComma((y.invert(pos.y)).toFixed(2)));
            
          return "translate(" + mouse[0] + "," + pos.y +")";
        });


      d3.selectAll(".tooltip-per-line")
        .attr("transform", function(d, i) {
        console.log(width/mouse[0])
        var xValue = x.invert(mouse[0])
            // bisect = d3.bisector(function(d) { return d.x; }).right;
            // //console.log("bisect: " + bisect);
            // idx = bisect(d.y, xValue);
            //console.log("idx: " + idx)
        
        var beginning = 0,
            end = lines[i].getTotalLength(),
            target = null,
            pos = null;
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
        
        d3.select(this).select('.tooltip-underlying')
            .text(formatDecimalComma((xValue).toFixed(2)));
        
        return "translate(" + (mouse[0]-tooltipBoxWidth*0.55) + "," + 0+")"; 
      });

      }

    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width) // can't catch mouse events on a g element
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', mouseout)
      .on('mouseover', mouseover)
      .on('mousemove', mousemover);
   

