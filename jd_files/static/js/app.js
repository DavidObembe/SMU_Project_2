$(document).ready(function() {

    // getData();
    doWeather();
    doTimeOfDay();
    newMap();
    doAccidentsMap()
    doTop25Accidents()
    doLolipop()
});

var states = ['ALL', 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
var states_full = ['ALL', 'Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

var accidents = new Array(states.length);
accidents.fill(0);
var severity = ['1', '2', '3', '4'];
var time_of_day = ['Day', 'Night'];
console.log(states.length)

var state_data = [{
    "state": '',
    "accidents": 0
}];

// function getData() {
//     console.log('In getData')
//     d3.csv("filtered_data.csv").then(function(accidentData) {

//         // Print the forceData
//         states.forEach(function(id) {
//             let option = `<option>${id}</option>`;
//             $('#selDataset').append(option);
//         });


//         // Format the date and cast the force value to a number
//         // accidentData.forEach(function(data) {
//         //   data.severity = +data.Severity;
//         //   data.start_time = data.Start_Time;
//         //   data.end_time = data.End_Time;
//         //   data.start_lat = data.Start_

//         // });
//         sorted_accidents = getAccidents(accidentData);
//         doPieChart(sorted_accidents);
//         doTable();

//     })
// }

// function doPieChart(states_data) {

//     d3.csv("national_value_counts.csv").then(function(national_data) {
//         var states = national_data.map(x => x.State);
//         var accidents = national_data.map(x => x.Accidents);
//     });

//     var data = [{
//         values: [state_data[1].accidents, state_data[2].accidents, state_data[3].accidents, state_data[4].accidents, state_data[5].accidents],
//         labels: [state_data[1].state, state_data[2].state, state_data[3].state, state_data[4].state, state_data[5].state],
//         type: 'pie'
//     }];

//     // var data = [{
//     //     values: accidents.slice(0, 4),
//     //     labels: states.slice(0, 4),
//     //     type: 'pie'
//     // }];



//     var layout = {
//         height: 400,
//         width: 520,
//         legend: {
//             "orientation": "h",
//         }
//     };

//     Plotly.newPlot('pie', data, layout);

// }

// function getAccidents(data) {

//     var i = 0;
//     var j = 0;
//     for (i = 0; i < states.length; ++i) {
//         // console.log(states[i]);
//         for (j = 0; j < data.length; ++j) {
//             if (states[i] === data[j].State) {
//                 if (i !== 0) {
//                     accidents[i] = accidents[i] + 1;
//                 }
//                 accidents[0] = accidents[0] + 1;
//             }
//         }
//         let state = {
//             "state": states[i],
//             "accidents": accidents[i]
//         }
//         state_data.push(state);
//     }
//     let state = {
//         "state": states[0],
//         "accidents": accidents[0]
//     }
//     state_data.unshift(state);

//     let sorted_states = state_data.sort((c1, c2) => (c1.accidents < c2.accidents) ? 1 : (c1.accidents > c2.accidents) ? -1 : 0);
//     // console.log(sorted_states)
//     state_data = sorted_states;
//     return sorted_states;
// }

// function doTable() {
//     d3.csv("national_value_counts.csv").then(function(national_data) {
//         var states = national_data.map(x => x.State);
//         var accidents = national_data.map(x => x.Accidents);
//     });
//     var values = [
//         states, accidents
//     ];

//     var data = [{
//         type: 'table',
//         header: {
//             values: [
//                 ["<b>State</b>"],
//                 ["<b>Accidents</b>"],

//             ],
//             align: "center",
//             line: { width: 1, color: 'black' },
//             fill: { color: "grey" },
//             font: { family: "Arial", size: 14, color: "white" }
//         },
//         cells: {
//             values: values,
//             align: "center",
//             line: { color: "black", width: 1 },
//             font: { family: "Arial", size: 12, color: ["black"] }
//         }
//     }]

//     Plotly.newPlot('table', data), { displayModeBar: false };


// }




// function doDropDownList1(abbr_state) {
//     if (abbr_state == 'ALL')
//         d3.csv("national_value_counts.csv").then(function(data_nat) {
//             console.log(data_nat);
//         })
//     else {
//         d3.csv("top_5_cities.csv").then(function(city_data) {
//             // console.log(city_data);
//             // doPieChartCity(city_data)
//             top5 = city_data.filter('State' === abbr_state);

//             let top5 = city_data.filter(city => city.State == abbr_state);
//             console.log(top5)
//         })
//     }

// }

// function doPieChartCity(city_data) {
//     var data = [{
//         values: [city_data[0].Accidents, city_data[1].Accidents, city_data[2].Accidents, city_data[3].Accidents, city_data[4].Accidents],
//         labels: [city_data[0].City, city_data[1].City, city_data[2].City, city_data[3].City, city_data[4].City],
//         type: 'pie'
//     }];

//     var layout = {
//         height: 400,
//         width: 520,
//         legend: {
//             "orientation": "h",
//         }
//     };

//     Plotly.newPlot('pie', data, layout);

// }

function doWeather() {

    d3.csv("Weather_Condition.csv").then(function(weather_data) {
        y = weather_data.map(x => x.Accidents)
        x = weather_data.map(x => x.Weather_Condition)
        var data = [{
            x: x.slice(0, 10),
            y: y.slice(0, 10),
            type: 'bar',
            marker: { color: 'FAD02E' }
        }];
        var layout = {
            title: 'Most Common Weather Condtions During Accidents',
            autosize: true,
            width: 900,
            height: 600,
            marker: { color: 'FAD02E' },
            margin: {
                l: 100,
                r: 50,
                b: 100,
                t: 100,
                pad: 4
            },
            xaxis: {
                title: 'Weather Conditions',
                titlefont: {
                    family: 'Arial, sans-serif',
                    size: 18,
                    color: '212121',
                    automargin: true
                }
            },
            yaxis: {
                title: 'Number of Accidents',
                titlefont: {
                    family: 'Arial, sans-serif',
                    size: 18,
                    color: '212121',
                    automargin: true
                }
            }
        }
        Plotly.newPlot('weather', data, layout);

    })


}

function doTimeOfDay() {

    d3.csv("times_of_day.csv").then(function(time_data) {
        x = time_data.map(x => x.Accidents);
        y = time_data.map(x => x.Times_of_Day);
        x.reverse();
        y.reverse();
        var data = [{
            x: x.slice(1, 25),
            y: y.slice(1, 25),
            type: 'bar',
            orientation: 'h'
        }];
        var layout = {
            title: 'Accidents By Time of Day',
            autosize: true,
            width: 900,
            height: 600,
            margin: {
                l: 150,
                r: 50,
                b: 100,
                t: 100,
                pad: 4
            },
            xaxis: {
                title: 'Number of Accidents',
                titlefont: {
                    family: 'Arial, sans-serif',
                    size: 18,
                    color: '212121',
                    automargin: true

                }
            },
            yaxis: {
                title: 'Hours',
                titlefont: {
                    family: 'Arial, sans-serif',
                    size: 18,
                    color: '212121',
                    automargin: true
                }
            }
        }
        Plotly.newPlot('time', data, layout);

    })

}



function newMap() {
    Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2014_usa_states.csv', function(err, rows) {
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }

        d3.csv("national_value_counts.csv").then(function(national_data) {
            var states = national_data.map(x => x.State);
            var accidents = national_data.map(x => x.Accidents);

            var data = [{
                type: 'choropleth',
                locationmode: 'USA-states',
                locations: states,
                z: accidents,
                showscale: true,
                text: states,
                autocolorscale: false,
                colorscale: [
                    [0, 'FAD02E'],
                    [0.2, 'CEAD2B'],
                    [0.4, 'A38A28'],
                    [0.6, '776726'],
                    [0.8, '4C4423'],
                    [1, '212121']
                ]

            }];

            var layout = {
                title: 'Accidents by State',
                font: {
                    family: 'Arial, monospace',
                    size: 30
                },
                showscale: false,
                dragmode: false,
                autosize: true,
                width: 1400,
                height: 800,
                margin: {
                    l: 300,
                    r: 50,
                    b: 100,
                    t: 100,
                    pad: 4,
                },
                geo: {
                    scope: 'usa',
                    countrycolor: 'rgb(255, 255, 255)',
                    showland: true,
                    landcolor: 'rgb(217, 217, 217)',
                    showlakes: true,
                    lakecolor: 'rgb(255, 255, 255)',
                    subunitcolor: 'rgb(255, 255, 255)',
                    lonaxis: {},
                    lataxis: {}
                }
            };
            Plotly.newPlot("map", data, layout), { displayModeBar: false };
        });
    });

}



function doTop25Accidents() {

    d3.csv("top25_road_accidents.csv").then(function(road_data) {
        x = road_data.map(x => x.Accidents);
        y = road_data.map(x => x.Street);
        x.reverse();
        y.reverse();
        var data = [{
            x: x.slice(10, 25),
            y: y.slice(10, 25),
            type: 'bar',
            orientation: 'h',
            marker: { color: 'FAD02E' },

        }];
        var layout = {
            title: '15 Most Accident Prone Roads',
            autosize: true,
            width: 650,
            height: 650,
            margin: {
                l: 200,
                r: 50,
                b: 100,
                t: 100,
                pad: 8
            },
            xaxis: {
                title: 'Number of Accidents',
                titlefont: {
                    family: 'Arial, sans-serif',
                    size: 18,
                    color: '212121',
                    automargin: true
                }
            },
            yaxis: {
                title: 'Road',
                titlefont: {
                    family: 'Arial, sans-serif',
                    size: 18,
                    color: '212121',
                    automargin: true
                }
            }
        }
        Plotly.newPlot('road', data, layout, { displayModeBar: false });

    })

}

function doAccidentsMap() {
    console.log('in doAccidentsMap');

    d3.csv("top25_road_accidents.csv").then(function(accidents_data) {
        accidents_data.forEach(function(accident) {
            let lat = accident.Start_Lat;
            let lng = accident.Start_Lng;
            let street = accident.Street;
            let acc = accident.Accidents;
            let city = accident.City;
            let st = accident.State;

            strg = `<br>Street:${street}</br><br>City:${city},${st}</br><br>#Accidents: ${acc}</br><br>Lat:${lat.slice(0,4)} Lng${lng.slice(0,5)}</br>`;
            var marker = L.marker([lat, lng]).addTo(mymap);

            marker.bindPopup(strg).openPopup();
            // marker = L.marker([lat, lng]).addTo(mymap);
            marker.on('mouseover', function(e) {
                this.openPopup();
            });
            marker.on('mouseout', function(e) {
                this.closePopup();
            });


        });

    });
}





function doLolipop() {
    console.log('In lolipop')
        // set the dimensions and margins of the graph
    var margin = { top: 50, right: 30, bottom: 150, left: 85 },
        width = 460 - margin.left + 200 - margin.right,
        height = 500 - margin.top - margin.bottom + 200;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data

    d3.csv("times_of_day.csv").then(function(time_data) {
        console.log(time_data)

        // X axis
        var x = d3.scaleBand()
            .range([0, width])
            .domain(time_data.map(function(d) { return d.Times_of_Day; }))
            .padding(1);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 35000])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y));

        // Lines
        svg.selectAll("myline")
            .data(time_data)
            .enter()
            .append("line")
            .attr("x1", function(d) { return x(d.Times_of_Day); })
            .attr("x2", function(d) { return x(d.Times_of_Day); })
            .attr("y1", function(d) { return y(d.Accidents); })
            .attr("y2", y(0))
            .attr("stroke", "black")

        // Circles
        svg.selectAll("mycircle")
            .data(time_data)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return x(d.Times_of_Day); })
            .attr("cy", function(d) { return y(d.Accidents); })
            .attr("r", "4")
            .style("fill", "FAD02E")
            .attr("stroke", "black")


        // text label for the x axis
        svg.append("text")
            .attr("transform",
                "translate(" + (width / 2) + " ," +
                (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("Time of Day");


        // text label for the y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Number of Accidents");

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("Accidents vs Time of Day");

    })



}