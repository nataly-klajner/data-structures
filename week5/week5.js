var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AWS_ID;
AWS.config.secretAccessKey = process.env.AWS_KEY;
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

var myItem = {
  title: {
    S: "My Second Post"
  },
  location: {
    S: "Home"
  },
  pk: {
    S: "oct09"
  }
};

dynamodb.putItem(
  { 
    TableName: "deardiary",
    Item: myItem
  },
                 
	function(error, data) {
    console.log("Hey! I'm done");
	}
);