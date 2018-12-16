var express = require('express'), // npm install express
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');
const moment = require('moment-timezone'); // moment-timezone --save

// AWS RDS credentials
var db_credentials = new Object();
db_credentials.user = 'nataly';
db_credentials.host = 'mydb.cq2lipog5ub4.us-east-1.rds.amazonaws.com';
db_credentials.database = 'natalysdb';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// respond to requests for /sensor
app.get('/sensor', function(req, res) {
    
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query 
    var q = `SELECT EXTRACT(DAY FROM sensorTime) as sensorday,
             AVG(sensorValue::int) as num_obs
             FROM sensorData
             GROUP BY sensorday
             ORDER BY sensorday;`;

    client.connect();
    client.query(q, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            res.send(qres.rows);
            client.end();
            console.log('1) responded to request for sensor data');
        }
    });
});

var s1x = `<!DOCTYPE html>
<meta charset="utf-8">
<!-- Adapted from: http://bl.ocks.org/Caged/6476579 -->
<style>
body {
  font: 10px sans-serif;
}
.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}
.bar {
  fill: blue;
}
.bar:hover {
  fill: yellow ;
}
.x.axis path {
  display: none;
}
.d3-tip {
  line-height: 1;
  font-weight: light;
  padding: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 2px;
}
/* Creates a small triangle extender for the tooltip */
.d3-tip:after {
  box-sizing: border-box;
  display: inline;
  font-size: 10px;
  width: 100%;
  line-height: 1;
  color: rgba(0, 0, 0, 0.8);
  position: absolute;
  text-align: center;
}
/* Style northward tooltips differently */
.d3-tip.n:after {
  margin: -1px 0 0 0;
  top: 100%;
  left: 0;
}
</style>
<body>
<script src="https://d3js.org/d3.v3.min.js"></script>
<script src="https://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js"></script>
<script>
var data = `;

var s2x = `; 
var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
var formatPercent = d3.format(".0ºC");
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
var y = d3.scale.linear()
    .range([height, 0]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Temperature</strong> <span style='color:yellow'>" + formatPercent(d.num_obs) + "</span>";
  })
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
svg.call(tip);
  x.domain(data.map(function(d) { return d.sensorday; }));
  y.domain([0, d3.max(data, function(d) { return d.num_obs; })]);
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Room temperature");
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.sensorday); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.num_obs); })
      .attr("height", function(d) { return height - y(d.num_obs); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
</script>
</body>
</html>`;

app.get('/ss', function(req, res) {
    
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query 
    var q = `SELECT EXTRACT(DAY FROM sensorTime) as sensorday,
             AVG(sensorValue::int) as num_obs
             FROM sensorData
             GROUP BY sensorday
             ORDER BY sensorday;`;

    client.connect();
    client.query(q, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            var resp = s1x + JSON.stringify(qres.rows) + s2x; 
            res.send(resp);
            client.end();
            console.log('1) responded to request for sensor graph');
        }
    });
});

// respond to requests for /aameetings
app.get('/aameetings', function(req, res) {
    
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    // SQL query 
    var thisQuery = `SELECT address, title as location, json_agg(json_build_object('day', day, 'time', startTime)) as meetings
                 FROM aameetings 
                 WHERE day = 'Sundays' and startTime = '6:00 PM' and wheelchairAccess = true
                 GROUP BY address, title
                 ;`;

    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            res.send(qres.rows);
            client.end();
            console.log('2) responded to request for aa meeting data');
        }
    });
});

// respond to requests for /deardiary
app.get('/deardiary', function(req, res) {
    
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = process.env.AWS_ID;
    AWS.config.secretAccessKey = process.env.AWS_KEY;
    AWS.config.region = "us-east-1";

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();
    
    // DynamoDB (NoSQL) query
    var params = {
        TableName: "deardiary",
        KeyConditionExpression: "#pk = :pk", // the query expression
        ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
        "#pk" : "pk"
    },
        ExpressionAttributeValues: { // the query values
        ":pk": {S: "nov03"},
        }
    };

    dynamodb.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
        else {
            res.send(data.Items);
            console.log('3) responded to request for dear diary data');
        }
    });
});

// create templates
var hx = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AA Meetings</title>
  <meta name="description" content="Meetings of AA in Manhattan">
  <meta name="author" content="AA">
  <link rel="stylesheet" href="css/styles.css?v=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
   integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
   crossorigin=""/>
</head>
<body>
<div id="mapid"></div>
  <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"
   integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA=="
   crossorigin=""></script>
  <script>
  var data = 
  `;
  
var jx = `;
    var mymap = L.map('mapid').setView([40.752726,-73.977229], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        // accessToken: 'your.mapbox.access.token'
        accessToken: 'pk.eyJ1Ijoidm9ucmFtc3kiLCJhIjoiY2pveGF0aDV2MjIyOTNsbWxlb2hhMmR4dCJ9.JJdYD_jWgRwUeJkDWiBz3w'
    }).addTo(mymap);
    for (var i=0; i<data.length; i++) {
        L.marker( [data[i].lat, data[i].long] ).bindPopup(JSON.stringify(data[i].meetings)).addTo(mymap);
    }
    </script>
    </body>
    </html>`;

// respond to requests for /aameetings
app.get('/aa', function(req, res) {

    // var now = moment.tz(Date.now(), "America/New_York"); 
    // var dayy = now.day().toString(); 
    // var hourr = now.hour().toString(); 

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    // SQL query 
    var thisQuery = `SELECT lat, long, json_agg(json_build_object('meeting', title, 'address', address, 'time', startTime, 'day', day, 'types', meetingType, 'wheelchairAccess', wheelchairAccess)) as meetings
                 FROM aameetings 
                 WHERE day = 'Sundays' and startTime = '6:00 PM'
                 GROUP BY lat, long
                 ;`;

    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }
        
        else {
            var resp = hx + JSON.stringify(qres.rows) + jx;
            res.send(resp);
            client.end();
            console.log('2) responded to request for aa meeting data');
        }
    });
    
});

var dd1 = `<!DOCTYPE html>
<meta charset="utf-8">
<!-- Adapted from: http://bl.ocks.org/Caged/6476579 -->
<style>
body {
  font: 10px sans-serif;
}


</style>
<body>
    
  var data_diary = `;
  
  
var dd2 = `;
    var a = "<h1>This is my title</h1>"
    var b = '<p>' + data[0] + '</p>'

    var page = '';

    for (var i=0; i<data.length; i++) {
    console.log(data);
        page = page + a + '<p>' + data[i] + '</p>'
    }

//   console.log(page)


    </script>
    </body>
    </html>`;
    
app.get('/dd', function(req, res) {
    
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = process.env.AWS_ID;
    AWS.config.secretAccessKey = process.env.AWS_KEY;
    AWS.config.region = "us-east-1";

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();
    
    // DynamoDB (NoSQL) query
    var params = {
        TableName: "deardiary",
        KeyConditionExpression: "#pk = :pk", // the query expression
        ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
        "#pk" : "pk"
    },
        ExpressionAttributeValues: { // the query values
        ":pk": {S: "nov03"},
        }
    };

    dynamodb.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
        else {
            var resp = dd1 + JSON.stringify(res.rows) + dd2;
            res.send(resp);
            console.log('3) responded to request for dear diary data');
        }
    });
});

// serve static files in /public
app.use(express.static('public'));

// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});