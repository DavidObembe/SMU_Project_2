$(document).ready(function() {
    makeMap();
});

function makeMap() {
    //clear map
    $('#mapAccident').empty();
    $('#mapAccident').append('<div style="height:700px" id="map"></div>');

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

        //create markers and heatmap
        var markers = L.markerClusterGroup(); //this is already a master layer
        var heatArray = [];

        data.forEach(function(thing) {
            if ((thing.Start_Lat) && (thing.Start_Lng)) {
                //marker for cluster
                let temp = L.marker([+thing.Start_Lat, +thing.Start_Lng]);
                markers.addLayer(temp);

                //heatmap points
                heatArray.push([+thing.Start_Lat, +thing.Start_Lng]);
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
        var myMap = L.map("mapAccident", {
            center: [39.8283, -98.5795],
            zoom: 5,
            layers: [watermelon, markers]
        });

        // Create a layer control, containing our baseMaps and overlayMaps, and add them to the map
        myMap.addLayer(markers);
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(myMap);

    });
}