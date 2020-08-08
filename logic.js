d3.csv(final_df).then(function(data) {
    console.log(data)
});

// $(data).ready(function() {
//     var graph = $('#graph'),
//         c = graph[0].getContext('2d');

//     c.lineWidth = 2;
//     c.strokeStyle = '#333';
//     c.font = 'italic 8pt sans-serif';
//     c.textAlign = "center";

//     c.beginPath();
//     c.moveTo(xPadding, 0);
//     c.lineTo(xPadding, graph.height() - yPadding);
//     c.lineTo(graph.width(), graph.height() - yPadding);
//     c.stroke();
// });

//Day time:
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("forcepoints.csv").then(function(forceData) {

    console.log();

    forceData.forEach(function(data) {
        data.date = parseTime(data.date);
        data.force = +data.force;
    });






    chartGroup.append("g")
        .classed("axis", true)
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);
}).catch(function(error) {
    console.log(error);
});


const dataset = d3.csv("data.csv");
dataset.then(function(data) {
            const slices = data.columns.slice(1).map(function(id) {
                return {
                    id: id,
                    values: data.map(function(d) {
                        return {
                            date: timeConv(d.date),
                            measurement: +d[id]
                        };
                    })
                };
            });

            console.log("Column headers", data.columns);
            console.log("Column headers without date", data.columns.slice(1));
            // returns the sliced dataset
            console.log("Slices", slices);
            // returns the first slice
            console.log("First slice", slices[0]);
            // returns the array in the first slice
            console.log("A array", slices[0].values);
            // returns the date of the first row in the first slice
            console.log("Date element", slices[0].values[0].date);
            // returns the array's length
            console.log("Array length", (slices[0].values).length);