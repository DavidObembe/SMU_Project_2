d3.csv("./static/data/dayNightData.csv").then(function(d) {
    console.log(d);

    //./Bar_chart_viz/static/data/dayNightData.csv
    // function dayFfunction(self) {
    //     return self.Civil_Twilight == "Day";
    // }

    // function nightFfunction(self) {
    //     return self.Civil_Twilight == "Night";
    // }

    // var dayData = d.filter(dayFfunction);
    // var nightData = d.filter(nightFfunction);

    // console.log(dayData);
    // console.log(nightData);

    // // collect x and y values
    // var dayX = dayData.map(x => x.State);
    // var dayY = dayData.map(x => x.Accident_count);

    // var nightX = nightData.map(x => x.State);
    // var nightY = nightData.map(x => x.Accident_count);

    // console.log(nightX)
    ///////////////////////////////////////////////////////
    //functions that will get me my variables 
    function unpack(d, key) {
        return d.map(function(row) { return row[key]; });
    }

    function dayFfunction(self) {
        return self.Civil_Twilight == "Day";
    }

    function nightFfunction(self) {
        return self.Civil_Twilight == "Night";
    }

    ///submit button handler
    function handleSubmit() {
        // Prevent the page from refreshing
        d3.event.preventDefault();

        // Select the input value from the form
        var state = d3.select("#stateInput").node().value;
        console.log(state);

        // clear the input value
        d3.select("#stateInput").node().value = "";

        // Build the plot with the new stock
        buildPlot(stock);
    }

    var allStateNames = unpack(d, 'State'),
        allCivil_Twilight = unpack(d, 'Civil_twilight'),
        allAccident_count = unpack(d, 'Accident_count'),

        listofStates = [],
        currentState,
        currentCivil_Twilight = [],
        currentAccident_count = [];

    // ignore this for now
    var dayData = d.filter(dayFfunction),
        nightData = d.filter(nightFfunction);
    //resume from here

    for (var i = 0; i < allStateNames.length; i++) {
        if (listofStates.indexOf(allStateNames[i]) === -1) {
            listofStates.push(allStateNames[i]);
        }
    }

    function getStateData(chosenState) {
        currentCivil_Twilight = [];
        currentAccident_count = [];
        for (var i = 0; i < allStateNames.length; i++) {
            if (allStateNames[i] === chosenState) {
                currentCivil_Twilight.push(allCivil_Twilight[i]);
                currentAccident_count.push(allAccident_count[i]);
            }
        }
    };

    //default state
    setBarChart('TX');

    console.log(allStateNames);


    //create my traces
    //function set bar chart
    function setBarChart(chosenState) {
        getStateData(chosenState);

        var dayTrace = {
            x: ["Day Accident", "Night Accident"],
            y: currentAccident_count,
            name: 'State accidents during the day',
            type: 'bar'
        };

        // var nightTrace = {
        //     x: nightX,
        //     y: nightY,
        //     name: 'State accidents during the night',
        //     type: 'bar'
        // };

        var data = [dayTrace];

        // var layout = { barmode: 'group' };

        Plotly.newPlot('BarAccident', data);
    };



    // // Add event listener for submit button
    // d3.select("#submit").on("click", handleSubmit);
});