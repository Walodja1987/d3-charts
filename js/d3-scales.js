// Source: https://www.tutorialsteacher.com/d3js/scales-in-d3
/* Comments:
- Two important terms to understand when using d3.scaleLinear (former d3.scale.linear):
  1. Domain: min and max values of our input data
  2. Range: The output range that you would like your input values to map to 
  Example: Let's say we want to display a chart in SVG within 500 px width. So, we would 
  like our output range between 50 to 500, where minimum value will be mapped to 50 and 
  maximum value will be mapped to 500 that is [50, 500]. That would mean, an input value 
  of 100 would map to an output value of 50. And an input value of 1000 would map to an 
  output value of 500. It means scaling factor is 0.5 and the data will be represented in 
  pixels as: data value * 0.5.
- This example uses a data array as input. For an example with a JSON array, refer to d3-scales-2.js
*/

const data = [100, 400, 300, 900, 850, 1000]


const width = 500, barHeight = 20, margin = 1;

const scale = d3.scaleLinear()
                .domain([d3.min(data), d3.max(data)])
                .range([50, 500]);

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
        return scale(d);
    })
    .attr("height", barHeight - margin)

g.append("text")
    .attr("x", function (d) { return (scale(d)); })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function (d) { return d; });
