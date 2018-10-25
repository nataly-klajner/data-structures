var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');

var apiKey = process.env.TAMU_KEY; 

var meetingsData = [];
var meetings = require("../week7/result08.json");

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(
    meetings,
    
    function(value, callback) {
        var address = value.address.split(",")[0];
        
        var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
        apiRequest += 'streetAddress=' + address.split(' ').join('%20');
        apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
        apiRequest += '&format=json&version=4.01';
        
        request(apiRequest, function(err, resp, body) {
            if (err) {throw err;}
            else {
                var tamuGeo = JSON.parse(body);
                
                if (
                    tamuGeo.OutputGeocodes &&
                    tamuGeo.OutputGeocodes[0] && 
                    tamuGeo.OutputGeocodes[0].OutputGeocode
                ) {
                    value.latLong = {
                        lat: tamuGeo.OutputGeocodes[0].OutputGeocode.Latitude,
                        lon: tamuGeo.OutputGeocodes[0].OutputGeocode.Longitude
                    };
                    
                    meetingsData.push(value);
                }
            }
        });
        
        setTimeout(callback, 2000);
    }, 
    
    function() {
        fs.writeFileSync('result-with-geo08.json', JSON.stringify(meetingsData));
        console.log('*** *** *** *** ***');
        console.log('Number of meetings in this zone: ');
        console.log(meetingsData.length);
    }
);