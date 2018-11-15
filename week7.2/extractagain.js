var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
 
var html = fs.readFileSync('../data/zone7.txt');

var $ = cheerio.load(html);

var selectionOfTheTR = $('tr[style="margin-bottom:10px"]');

 function getAddressFromTD(index, element) {
  
    var cheerioTRElement = $(element);
    var TRTextContent = cheerioTRElement.text();
    var arrayOfLines = TRTextContent.split("\n");
    var addressLine = arrayOfLines[4];
    var titleLine = arrayOfLines[3];
    var address = addressLine.trim();
    var title = titleLine.trim();
    
    
    var secondTDElement = cheerioTRElement.find("td:nth-child(2)");
    
    var secondTDElementText = secondTDElement.text();
    
    var secondTDElementLinesArray = secondTDElementText.split("\n");
    console.log(secondTDElementLinesArray);
    
     secondTDElementLinesArray = secondTDElementLinesArray.map(function (string) {
         return string.trim();
         });
        
     secondTDElementLinesArray = secondTDElementLinesArray.filter(function (string) {
        return string.length > 0;
        });
        
        //console.log(secondTDElementLinesArray)
        
    
 
   
        
    for (var i = 0; i<secondTDElementLinesArray.length; i++) {
        
    
         var day = secondTDElementLinesArray.join("\n").split(" ")[0];
         //console.log(day)
             
    
        var startTime = secondTDElementLinesArray.join("\n").split(" ")[3] + " " + secondTDElementLinesArray.join("\n").split(" ")[4];
        
          
        var endTime = secondTDElementLinesArray.join("\n").split(" ")[6] + " " + secondTDElementLinesArray.join("\n").split(" ")[7];
    
        var meetingType = secondTDElementLinesArray.join("\n").split("Meeting").pop();
    }
    
    
    var wheelchairImage = cheerioTRElement.find("img");
    
    var wheelchairAccess;
    
    if (wheelchairImage.length > 0) {
        wheelchairAccess = true;
    } else {
        wheelchairAccess = false;
    }
    
 
    
   
    return {
        address: address,
        title: title,
        wheelchairAccess: wheelchairAccess, 
        info: {
            day: day,
            startTime: startTime,
            endTime: endTime,
            meetingType: meetingType,
        }
    };
}
var result = selectionOfTheTR.map(getAddressFromTD).get();
//fs.writeFileSync('./result-parsed-10.json', JSON.stringify(result, null, 4));
