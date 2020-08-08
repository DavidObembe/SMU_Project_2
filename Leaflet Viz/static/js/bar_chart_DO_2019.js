d3.csv("./static/data/monthlyDayNightData_2019.csv").then(function(d) {

    //d is data
    console.log(d);

    function convertIntObj(obj) {
        const res = {}
        for (const key in obj) {
            res[key] = {};
            for (const prop in obj[key]) {
                const parsed = parseInt(obj[key][prop], 10);
                res[key][prop] = isNaN(parsed) ? obj[key][prop] : parsed;
            }
        }
        return res;
    }

    var result = convertIntObj(d);
    console.log('Object result', result);
    d = Object.values(result);

    console.log(d)


    //functions to obtain day and night data
    function dayFfunction(self) {
        return self.Civil_Twilight == "Day";
    }

    function nightFfunction(self) {
        return self.Civil_Twilight == "Night";
    }

    //get data by time of day
    var dayData = d.filter(dayFfunction);
    var nightData = d.filter(nightFfunction);

    console.log(dayData);
    console.log(nightData);

    // collect x and y values
    var dayX = dayData.map(x => x.State);
    var dayY = dayData.map(x => x.Accident_count);


    var nightX = nightData.map(x => x.State);
    var nightY = nightData.map(x => x.Accident_count);



    console.log(nightX);
    console.log(nightY);
    console.log(dayX);
    console.log(dayY);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //I zip graphDataY and graphDataX

    var zippedData = dayX.map(function(e, i) {
        return [e, dayY[i], nightX[i], nightY[i]];
    });

    console.log(zippedData);
    //sort zip
    //array [0] is the sample_values and i am sorting in descending order of sample values

    var sorted_zip = zippedData.sort((a, b) => (b[1] - a[1]));
    //check
    console.log(sorted_zip[0]);

    var sdayX = sorted_zip.map(x => x[0]);
    var sdayY = sorted_zip.map(x => x[1]);
    var snightX = sorted_zip.map(x => x[2]);
    var snightY = sorted_zip.map(x => x[3]);
    console.log(sdayX);
    console.log(sdayY);
    console.log(snightX);
    // return (sdayX, sdayY, snightX, snightY)

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////



    //get data for each month
    let march3 = [],
        april4 = [],
        may5 = [],
        june6 = [],
        july7 = [];
    for (let i = 0; i < d.length; i++) {
        if (d[i].month == 3) {
            march3.push(d[i]);
        } else if (d[i].month == 4) {
            april4.push(d[i]);
        } else if (d[i].month == 5) {
            may5.push(d[i]);
        } else if (d[i].month == 6) {
            june6.push(d[i]);
        } else if (d[i].month == 7) {
            july7.push(d[i]);
        }
    }

    //sort march april may and june based on their keys "Accident count"
    function sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0)) * -1;
        });
    };
    march3 = sortByKey(march3, "Accident_count");
    april4 = sortByKey(april4, "Accident_count");
    may5 = sortByKey(may5, "Accident_count");
    june6 = sortByKey(june6, "Accident_count");
    july7 = sortByKey(july7, "Accident_count");
    d = sortByKey(d, "Accident_count");

    // Bar chart initialisation 
    function init() {
        // sortIt();
        var dayTrace = {
            x: sdayX,
            y: sdayY,
            name: 'day accidents ',
            type: 'bar'
        };

        var nightTrace = {
            x: snightX,
            y: snightY,
            name: 'night accidents',
            type: 'bar'
        };

        var data = [dayTrace, nightTrace];

        var layout = { barmode: 'stack' };

        Plotly.newPlot('BarAccident2019', data, layout);
    }

    init();

    // On change to the DOM, call getData()
    d3.selectAll("#monthFilter2019").on("change", getData);

    //Function called by DOM changes
    function getData() {
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#monthFilter2019");
        // Assign the value of the dropdown menu option to a variable
        var selectedOption = dropdownMenu.property("value");


        console.log(selectedOption);

        // Initialize an empty array for the country's data
        var monthlyData = [];

        if (selectedOption == 'March') {
            monthlyData = march3;
        } else if (selectedOption == 'April') {
            monthlyData = april4;
        } else if (selectedOption == 'May') {
            monthlyData = may5;
        } else if (selectedOption == 'June') {
            monthlyData = june6;
        } else if (selectedOption == 'July') {
            monthlyData = july7;
        } else {
            monthlyData = d;
        };
        // Call function to update the chart
        // updatePlotly(data);
        console.log(monthlyData);

        var dayData = monthlyData.filter(dayFfunction);
        var nightData = monthlyData.filter(nightFfunction);

        console.log(dayData);
        console.log(nightData);

        // collect x and y values
        var dayX = dayData.map(x => x.State);
        var dayY = dayData.map(x => x.Accident_count);

        var nightX = nightData.map(x => x.State);
        var nightY = nightData.map(x => x.Accident_count);

        // console.log(nightX)

        // replot the graph
        var dayTrace = {
            x: dayX,
            y: dayY,
            name: 'day accidents ',
            type: 'bar'
        };

        var nightTrace = {
            x: nightX,
            y: nightY,
            name: 'night accidents',
            type: 'bar'
        };

        var data = [dayTrace, nightTrace];

        var layout = { barmode: 'stack' };

        Plotly.newPlot('BarAccident2019', data, layout);


    }

    //this is my new bar function that I will call everytime a dropdown is selected




});