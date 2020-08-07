// $(document).ready(function() {
//     //Event Listener to capture the civil_twilight
//     $('#twilightFilter').change(function() {
//         //let civil_twilight = $(`#twilightFilter`).val()
//         //console.log(civil_twilight);

//     })
// });

//make filter for day and night
/*function time_filter() {
    var inputValue = $('#twilightFilter').val()

    var sub_data = accidentData.filter(x => x.Start_Time === inputValue)

}*/

// The code for the chart is wrapped inside a function that
// automatically resizes the chart
function makeResponsive() {


    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("#chart").select("svg");

    // clear svg is not empty
    if (!svgArea.empty()) {
        svgArea.remove();
    }

    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    var margin = {
        top: 50,
        bottom: 50,
        right: 50,
        left: 50
    };

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    // Append SVG element
    var svg = d3
        .select("#chart")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    // Append group element
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Read CSV
    d3.csv("dayNight.csv").then(function(accidentData) {
        console.log(accidentData);

        // create Start_Time parser
        var Start_TimeParser = d3.timeParse("%m-%d-%Y");

        // parse data
        accidentData.forEach(function(data) {
            data.Start_Time = Start_TimeParser(data.Start_Time);
            data.Day = +data.Day;
            data.Night = +data.Night;
        });

        // create scales
        var xTimeScale = d3.scaleTime()
            .domain(d3.extent(accidentData, d => d.Start_Time))
            .range([0, width]);

        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(accidentData, d => d.Day)])
            .range([height, 0]);

        // create axes
        var bottomAxis = d3.axisBottom(xTimeScale);
        var leftAxis = d3.axisLeft(yLinearScale).ticks(20);

        // append axes
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        chartGroup.append("g")
            .call(leftAxis)
            .classed("axis-text", true);

        // append circles
        var circlesGroup = chartGroup.append("g").selectAll("circle")
            .data(accidentData)
            .enter()
            .append("circle")
            .attr("cx", d => xTimeScale(d.Start_Time))
            .attr("cy", d => yLinearScale(d.Day))
            .attr("r", "15")
            .attr("fill", "yellow")
            .attr("stroke-width", "4")
            .attr("stroke", "orange");


        var circlesGroup2 = chartGroup.append("g").selectAll("circle")
            .data(accidentData)
            .enter()
            .append("circle")
            .attr("cx", d => xTimeScale(d.Start_Time))
            .attr("cy", d => yLinearScale(d.Night))
            .attr("r", "15")
            .attr("fill", "grey")
            .attr("stroke-width", "1")
            .attr("stroke", "white");

        // //fly in
        // circlesGroup
        //     .transition()
        //     .duration(3000)
        //     .attr("cx", d => xTimeScale(d.Start_Time))
        //     .attr("cy", d => yLinearScale(d.Night));

        // circlesGroup2
        //     .transition()
        //     .duration(3000)
        //     .attr("cx", d => xTimeScale(d.Start_Time))
        //     .attr("cy", d => yLinearScale(d.Day));

        chartGroup.append("text") //style3.css styling moving tick marks when changing to .axis-text
            .attr("transform", "rotate(-90)")
            .attr("y", -5 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .classed("axis-text", true)
            .text("# of accidents");

        // Start_Time formatter to display Start_Times nicely
        var Start_TimeFormatter = d3.timeFormat("%m-%d-%Y");

        // Step 1: Append tooltip div
        var tooltip = d3.select("body").append("div")
            .classed("d3-tip", true);

        // Step 2: Create "mouseover" event listener to display tooltip
        circlesGroup.on("mouseover", function(d, i) {
            tooltip.style("display", "block");
            tooltip.html(`Day Accidents: <b>${d.Day}</b> <br> Date: <b>${Start_TimeFormatter(d.Start_Time)}</b>`);
            tooltip.style("left", d3.event.pageX + "px");
            tooltip.style("top", d3.event.pageY + "px");

            d3.select(this).attr("fill", "pink");
            d3.select(this).attr("r", "10");
        });

        circlesGroup2.on("mouseover", function(d, i) {
            tooltip.style("display", "block");
            tooltip.html(`Night Accidents: <b>${d.Night}</b> <br> Date: <b>${Start_TimeFormatter(d.Start_Time)}</b>`);
            tooltip.style("left", d3.event.pageX + "px");
            tooltip.style("top", d3.event.pageY + "px");

            d3.select(this).attr("fill", "black");
            d3.select(this).attr("r", "10");
        });

        // Step 3: Create "mouseout" event listener to hide tooltip
        circlesGroup.on("mouseout", function() {
            tooltip.style("display", "none");

            d3.select(this).attr("fill", "yellow");
            d3.select(this).attr("r", "15");
        });

        circlesGroup2.on("mouseout", function() {
            tooltip.style("display", "none");

            d3.select(this).attr("fill", "grey");
            d3.select(this).attr("r", "15");
        });

    }).catch(function(error) {
        console.log(error);
    });
}

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);