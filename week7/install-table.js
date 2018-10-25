const { Client } = require('pg');
var async = require('async');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'nataly';
db_credentials.host = 'mydb.cq2lipog5ub4.us-east-1.rds.amazonaws.com';
db_credentials.database = 'natalysdb';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to create a table: 
var thisQuery = "CREATE TABLE aameetings (address varchar(100), lat double precision, long double precision, title varchar(100), hours varchar(5000), wheelchairAccess boolean);";
// Sample SQL statement to delete a table: 
// var thisQuery = "DROP TABLE aameetings;"; 
// Sample SQL statement to query the entire contents of a table: 
// var thisQuery = "SELECT * FROM aameetings;";

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});