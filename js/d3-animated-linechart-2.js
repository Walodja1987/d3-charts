// Source: https://bl.ocks.org/larsenmtl/e3b8b7c2ca4787f77d78f58d41c3da91#index.html
// NOTE: The example from source has been adjusted for D3 v4
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

// Parse the date / time
const parseDate = d3.timeParse("%Y%m%d");

const x = d3.scaleTime()
      .range([0, width]);

const y = d3.scaleLinear()
      .range([height, 0]);

// Create a color scale
const color = d3.scaleOrdinal(d3.schemeCategory10); // you find the colors here: http://bl.ocks.org/aaizemberg/78bd3dade9593896a59d

const xAxis = d3.axisBottom()
        .scale(x);

const yAxis = d3.axisLeft()
        .scale(y);

// Define the line
const line = d3.line()
.x(function(d) { return x(d.date); })
.y(function(d) { return y(d.temperature); })
.curve(d3.curveLinear); // interpolation types: https://bl.ocks.org/emmasaunders/f7178ed715a601c5b2c458a2c7093f78

// Create svg area and group element inside
const svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// parse data into a JSON array. Output format:
// [
// {date: "12355", New York: "63.4", San Francisco: "62.7", Austin: "72.2"} 
// {}
// {}
// columns: ["date", "New York", "San Francisco", "Austin"]
//]      
// const data = d3.tsvParse(myData); // Here the date is still a string
// console.log(data)

// different approach here from: https://bl.ocks.org/d3noob/402dd382a51a4f6eea487f9a35566de0
// Get the data
d3.tsv("data/data-animated-linechart-2.tsv", function(error, data) {
    if (error) {
      throw error;
    }
    
    // Test that data was loaded. You can comment it out later
    console.log(data)
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].date);
      console.log(data[i].Austin);
      console.log(data[i]["New York"]);
    }


    // format the data
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        // d.Austin = +d.Austin; // conversion to number
    });
    console.log(data)
    // Scale the range of the data
    // x.domain(d3.extent(data, function(d) { return d.date; }));
    // y.domain([0, d3.max(data, function(d) { return d.close; })]);
  
//     // Add the valueline path.
//     svg.append("path")
//         .data([data])
//         .attr("class", "line")
//         .attr("d", valueline);
  
//     // Add the X Axis
//     svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x));
  
//     // Add the Y Axis
//     svg.append("g")
//         .call(d3.axisLeft(y));
  
//   });

// // End of different approach //



// console.log(data);
// d3.keys(data[0]) gives you get the header in a tsv file. You could also have use data[1], data[2], doesn't matter
// This function would return all headers except for "date", i.e the 3 cities -> i.e. it instantiates 3 colors
color.domain(d3.keys(data[0]).filter(function(key) {
    return key !== "date";
  }));

// // data.timeParse("%Y%m%d")(function(d){
// //     return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
// //   },)

// // // Convert date from string to object
// // data.forEach(function(d) {
// //     d.date = parseTime(d.date);
// // }); 


  




// Create JSON Array with attribute name (string) and values (JSON array with attributes date and temperature)
// Output format:
// [
//  {name: "New York", values: [{date: Sat Oct 01 2011 00:00:00 GMT+0200 (Mitteleuropäische Sommerzeit), temperature: 63.4} {} {} ...] }
//  {name: "San Francisco", values: [{date: Sat Oct 01 2011 00:00:00 GMT+0200 (Mitteleuropäische Sommerzeit), temperature: 63.4} {} {} ...] }
//  {name: "Austin", values: [{date: Sat Oct 01 2011 00:00:00 GMT+0200 (Mitteleuropäische Sommerzeit), temperature: 63.4} {} {} ...] }
// ]
const cities = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {
          date: d.date,
          temperature: +d[name]  // this + converts the string into a number
        };
      })
    };
  });
console.log(cities);

// Set domain of x; extent returns min and max values of data
x.domain(d3.extent(data, function(d) {
  return d.date;
  })
);

y.domain([
  d3.min(cities, function(c) {
      return d3.min(c.values, function(v) {
      return v.temperature;
      });
  }),
  d3.max(cities, function(c) {
      return d3.max(c.values, function(v) {
      return v.temperature;
      });
  })
]);

// Add legend
const legend = svg.selectAll('g')
  .data(cities)
  .enter()
  .append('g')
  .attr('class', 'legend');

legend.append('rect')
  .attr('x', width - 20)
  .attr('y', function(d, i) {
    return i * 20;
  })
  .attr('width', 10)
  .attr('height', 10)
  .style('fill', function(d) {
    return color(d.name);
  });

legend.append('text')
    .attr('x', width - 8)
    .attr('y', function(d, i) {
    return (i * 20) + 9;
    })
    .text(function(d) {
    return d.name;
    });

// Add axes 
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Temperature (ºF)");

const city = svg.selectAll(".city")
    .data(cities)
    .enter().append("g")
    .attr("class", "city");

// Plot the data
city.append("path")
    .attr("class", "line")
    .attr("d", function(d) {
      return line(d.values);
    })
    .style("stroke", function(d) {
      return color(d.name);
});


city.append("text")
      .datum(function(d) {
        return {
          name: d.name,
          value: d.values[d.values.length - 1]
        };
      })
      .attr("transform", function(d) {
        return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")";
      })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) {
        return d.name;
      });


// Add mouseover effects

var mouseG = svg.append("g")
      .attr("class", "mouse-over-effects");

    mouseG.append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");
      
    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(cities)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    mousePerLine.append("circle")
      .attr("r", 7)
      .style("stroke", function(d) {
        return color(d.name);
      })
      .style("fill", "none")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    mousePerLine.append("text")
      .attr("transform", "translate(10,3)");

    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width) // can't catch mouse events on a g element
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
          .style("opacity", "1");
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
          });

        d3.selectAll(".mouse-per-line")
          .attr("transform", function(d, i) {
            console.log(width/mouse[0])
            var xDate = x.invert(mouse[0]),
                bisect = d3.bisector(function(d) { return d.date; }).right;
                idx = bisect(d.values, xDate);
            
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

