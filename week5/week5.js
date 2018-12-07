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
  
  // var myItem = {
  //   title: {
  //     S: "My apartment"
  //   },
  //   location: {
  //     S: "Home"
  //   },
  //   pk: {
  //     S: "oct11"
  //   },
  //   skills: {
  //     SS: ["learning how to properly clean a bathroom", "learning how to cook", "buying and fixing up furniture"]
  //   },
  // }
  
  // var myItem = {
  //   title: {
  //     S: "Parents in NYC"
  //   },
  //   pk: {
  //     S: "oct13"
  //   },
  //   miss: {
  //     S: "having them around"
  //   },
  //   thought: {
  //     S: "weekend seemed a lot longer since we did so much"
  //   },
  //   skills: {
  //     SS: ["hosting people in my apartment", "becoming a NY tour guide"]
  //   },
  //   commute: {
  //     S: "we used Uber and Lyft a lot"
  //   },
  // }
  
  // var myItem = {
  //   title: {
  //     S: "Back to normal"
  //   },
  //   pk: {
  //     S: "oct15"
  //   },
  //   food: {
  //     S: "packing lunch to eat at school"
  //   },
  //   mood: {
  //     S: "missing my parents"
  //   },
  //   schoolwork: {
  //     S: "a lot"
  //   },
  // }
  
  // var myItem = {
  //   title: {
  //     S: "Working on school project"
  //   },
  //   pk: {
  //     S: "oct19"
  //   },
  //   course: {
  //     S: "type & interaction"
  //   },
  //   location: {
  //     S: "Shefali's place"
  //   },
  //   time: {
  //     S: "Friday afternoon"
  //   },
  //   snacks: {
  //     SS: ["mini pretzel", "chips"]
  //   },
  // }
  
  //   var myItem = {
  //   title: {
  //     S: "Halloween party"
  //   },
  //   pk: {
  //     S: "oct26"
  //   },
  //   location: {
  //     S: "Clemence's place"
  //   },
  //   food: {
  //     S: "Artichoke pizza"
  //   },
  //   costume: {
  //     S: "skeleton"
  //   },
  // }
  
  // var myItem = {
  //   title: {
  //     S: "Brazil Elections"
  //   },
  //   pk: {
  //     S: "oct28"
  //   },
  //   location: {
  //     S: "far away in São Paulo"
  //   },
  //   dontMiss: {
  //     S: "discussing Brazilian politics"
  //   },
  //   thought: {
  //     S: "this is all my friends and family are talking about"
  //   },
  // }
  
  // var myItem = {
  //   title: {
  //     S: "Halloween"
  //   },
  //   pk: {
  //     S: "oct31"
  //   },
  //   location: {
  //     S: "6th Ave"
  //   },
  //   time: {
  //     S: "7pm"
  //   },
  //   streets: {
  //     S: "packed with people in costumes, a little like Carnaval"
  //   },
  //   skills: {
  //     S: "experience of surfing through the crowd"
  //   }
  // }
  
  // var myItem = {
  //   title: {
  //     S: "Rocky Horror Picture Show"
  //   },
  //   pk: {
  //     S: "nov03"
  //   },
  //   location: {
  //     S: "Cinepolis Chelsea"
  //   },
  //   friends: {
  //     SS: ["Shefali", "Clemence"]
  //   },
  //   commute: {
  //     S: "walked there, lyft back home"
  //   },
  // }
  
  // var myItem = {
  //   title: {
  //     S: "Time difference change"
  //   },
  //   pk: {
  //     S: "nov04"
  //   },
  //   mood: {
  //     S: "upset that now there's a 3-hour difference between NY and São Paulo"
  //   },
  //   miss: {
  //     S: "talking to friends and family anytime of the day"
  //   },
  // }
  
  var myItem = {
    title: {
      S: "Bohemian Rapsody"
    },
    pk: {
      S: "nov08"
    },
    location: {
      S: "AMC Kips Bay"
    },
    time: {
      S: "6:30pm"
    },
    movie: {
      S: "loved it"
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