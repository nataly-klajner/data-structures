var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');

var apiKey = process.env.TAMU_KEY; 

var meetingsData = [];
var completeAddresses = require("../week2/result.json");
var addresses = [];

completeAddresses.forEach(processAddressLine);

function processAddressLine(address) {
    var result = address.split(",")[0];
    addresses.push(result);
}

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(
    addresses,
    
    function(value, callback) {
        var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
        apiRequest += 'streetAddress=' + value.split(' ').join('%20');
        apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
        apiRequest += '&format=json&version=4.01';
        
        request(apiRequest, function(err, resp, body) {
            if (err) {throw err;}
            else {
                var tamuGeo = JSON.parse(body);
                
                var result = {
                    address: value,
                    latLong: {
                        lat: tamuGeo.OutputGeocodes[0].OutputGeocode.Latitude,
                        lon: tamuGeo.OutputGeocodes[0].OutputGeocode.Longitude
                    }
                };
                
                meetingsData.push(result);
            }
        });
        
        setTimeout(callback, 2000);
    }, 
    
    function() {
        fs.writeFileSync('first.json', JSON.stringify(meetingsData));
        console.log('*** *** *** *** ***');
        console.log('Number of meetings in this zone: ');
        console.log(meetingsData.length);
    }
);