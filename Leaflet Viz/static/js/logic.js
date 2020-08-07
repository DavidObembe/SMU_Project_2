$(document).ready(function() {
    makeMap("All", -1);

    //Event Listener to capture the month
    $('#monthFilter, #sevFilter').change(function() {
        let month = $(`#monthFilter`).val()
        let accidentSev = $(`#sevFilter`).val()
        console.log(month);
        console.log(accidentSev)
        makeMap(month, accidentSev);
    })
});

function makeMap(month, accidentSev) {
    //clear map
    $('#mapAccident').empty();
    $('#mapAccident').append('<div style="height:700px" id="map"></div>');

    // console.log(month);

    // Adding tile layer to the map
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "satellite-streets-v11",
        accessToken: API_KEY
    });

    var golden = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "rthomas-one/ckcy07fsk1deu1ipu60dr31pl",
        accessToken: API_KEY
    });

    var watermelon = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "rthomas-one/ckd6tk4yl0afs1imhdggz4273",
        accessToken: API_KEY
    });

    var blue = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "rthomas-one/ckd6txg5b0aqn1ik9fbvutk62",
        accessToken: API_KEY
    });

    // Store our API endpoint as sourceCSV
    var sourceCSV = "static/data/last_6_months.csv";

    d3.csv(sourceCSV).then(function(data) {
        // console.log(data);

        //Filter on June 2019 - June 2020
        switch (month) {
            case "All":
                var start = "2020-03-01 00:00:00";
                var end = "2020-06-30 00:00:00";
                break;
            case "March 2020":
                var start = "2020-03-01 00:00:00";
                var end = "2020-03-31 00:00:00";
                break;
            case "April 2020":
                var start = "2020-04-01 00:00:00";
                var end = "2020-04-30 00:00:00";
                break;
            case "May 2020":
                var start = "2020-05-01 00:00:00";
                var end = "2020-05-31 00:00:00";
                break;
            case "June 2020":
                var start = "2020-06-01 00:00:00";
                var end = "2020-06-30 00:00:00";
                break;
        }

        var filteredData = {};
        // console.log(start);
        // console.log(end);
        // console.log(filteredData);
        var filteredData = data.filter(function(obj) {
            return obj.Start_Time >= start && obj.Start_Time <= end;

        });

        console.log(filteredData);

        //create markers and heatmap
        var markers = L.markerClusterGroup(); //this is already a master layer
        var heatArray = [];

        filteredData.forEach(function(accident) {
            if ((accident.Start_Lat) && (accident.Start_Lng)) {


                if ((accidentSev == accident.Severity) || (accidentSev == -1)) {
                    //marker for cluster
                    let temp = L.marker([+accident.Start_Lat, +accident.Start_Lng]).bindPopup(`<p><b>Severity: </b>${accident.Severity}<br><b>Street: </b>${accident.Street}<br><b>City: </b>${accident.City}<br><b>State: </b>${accident.State}<br><b>Zipcode: </b>${accident.Zipcode}<br><b>Time: </b>${accident.Start_Time}</p>`);
                    markers.addLayer(temp);

                    //heatmap points
                    heatArray.push([+accident.Start_Lat, +accident.Start_Lng]);
                }
            }
        });

        //console.log(markers);

        //create heatmap layer
        var heat = L.heatLayer(heatArray, {
            radius: 20,
            blur: 15
        });

        // Create a baseMaps object to contain the streetmap and darkmap
        var baseMaps = {
            "Street": streetmap,
            "Satellite": satellitemap,
            "Golden": golden,
            "Watermelon": watermelon,
            "Blue": blue
        };

        // Create an overlayMaps object here to contain the "State Population" and "City Population" layers
        var overlayMaps = {
            "Heatmap": heat,
            "Markers": markers
        };

        // Creating map object
        var myMap = L.map("map", {
            center: [39.8283, -98.5795],
            zoom: 5,
            layers: [golden, markers]
        });

        // Create a layer control, containing our baseMaps and overlayMaps, and add them to the map
        myMap.addLayer(markers);
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(myMap);

    });
}