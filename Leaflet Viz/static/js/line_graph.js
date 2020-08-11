d3.csv("static/data/last_6_months.csv").then(function(d) {

    // console.log(d)

    function dayFunction(self) {
        return self.Civil_Twilight == "Day";
    }

    function nightFunction(self) {
        return self.Civil_Twilight == "Night";
    }

    var dayData = d.filter(dayFunction);
    var nightData = d.filter(nightFunction);

    // console.log(dayData);
    // console.log(nightData);

    var dayX = dayData.map(x => x.Start_Time);
    var dayY = dayData.map(x => x.Severity);
    var nightX = nightData.map(x => x.Start_Time);
    var nightY = nightData.map(x => x.Severity);

    // console.log(nightX);
    // console.log(dayX);
    // console.log(dayY);
    // console.log(nightY);


    var traceDay = {
        x: dayX,
        y: dayY,
        name: 'Daytime Severity',
        type: 'line'
    }

    var traceNight = {
        x: nightX,
        y: nightY,
        name: 'Nighttime Accidents',
        type: 'line'
    };

    var data = [traceDay, traceNight];

    var layout = {
        title: "Severity of Accidents Over Time",
        xaxis: { title: "Time" },
        yaxis: { title: "Severity" }
    };

    Plotly.newPlot('Plot', data, layout);
});

$(document).ready(function() {
    // makeMap();
    //Event Listener 
    $('#MonthFilter').change(function() {
        let month = $(`#MonthFilter`).val()
        console.log(month);
    })
});

// var button = d3.select("#click-me");
// var inputField = d3.select("#input-field");

// function handleClick() {
//     console.log("A button was clicked!");
//     console.log(d3.event.target);
// }
// button.on("click", handleClick);
// button.on("click", function() {
//     console.log("Hi, a button was clicked!");
//     console.log(d3.event.target);
// });
// button.on("click", function() {
//     d3.select(".giphy-me").html("<img src='https://gph.to/2Krfn0w' alt='giphy'>");
// });

// inputField.on("change", function() {
//     var newText = d3.event.target.value;
//     console.log(newText);
// });


// // Use D3 to create an event handler
// d3.selectAll("body").on("change", updatePage);

// function updatePage() {
//   // Use D3 to select the dropdown menu
//   var dropdownMenu = d3.selectAll("#selectOption").node();
//   // Assign the dropdown menu item ID to a variable
//   var dropdownMenuID = dropdownMenu.id;
//   // Assign the dropdown menu option to a variable
//   var selectedOption = dropdownMenu.value;
// console.log(dropdownMenuID);
// console.log(selectedOption);
// }

// function updatePlotly() {
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");

//     // Initialize x and y arrays
//     var x = [];
//     var y = [];

//     if (dataset === 'dataset1') {
//         x = [Day];
//         y = [1, 2, 4, 8, 16];
//     }

//     if (dataset === 'dataset2') {
//         x = [Night];
//         y = [1, 10, 100, 1000, 10000];
//     }

//     // Note the extra brackets around 'x' and 'y'
//     Plotly.restyle("plot", "x", [x]);
//     Plotly.restyle("plot", "y", [y]);
// }

// init();