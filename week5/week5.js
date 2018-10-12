var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AWS_ID;
AWS.config.secretAccessKey = process.env.AWS_KEY;
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

// var myItem = {
//   title: {
//     S: "I like the weather in NY"
//   },
//   location: {
//     S: "Union Square"
//   },
//   pk: {
//     S: "oct08"
//   },
//   time: {
//     S: "3pm"
//   },
//   weatherNY: {
//     S: "consistent each day"
//   },
//   weatherSP: {
//     S: "full of surprises"
//   },
//   dontMiss: {
//     SS: ["having to carry multiple jackets", "being hot/cold for wearing the wrong outfit"]
//   }
// };

// var myItem = {
//   title: {
//     S: "Walking to school"
//   },
//   pk: {
//     S: "oct10"
//   },
//   time: {
//     S: "sometime in the morning"
//   },
//   commute: {
//     S: "walking everyday for around 20 minutes to get to class"
//   },
//   thought: {
//     S: "good way to start the day"
//   },
//   }
  
  var myItem = {
    title: {
      S: "My apartment"
    },
    location: {
      S: "Home"
    },
    pk: {
      S: "oct11"
    },
    skills: {
      SS: ["learning how to properly clean a bathroom", "learning how to cook", "buying and fixing up furniture"]
    },
  }
  
dynamodb.putItem(
  { 
    TableName: "deardiary",
    Item: myItem
  },
                 
	function(error, data) {
	  if (error) {
	    console.log(error);
	  } else {
      console.log("Hey! I'm done"); 
	  }
	}
);