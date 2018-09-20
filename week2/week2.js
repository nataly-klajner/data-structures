var fs = require('fs');
var cheerio = require('cheerio');

// Focusing on zone 4 where the addresses are
var html = fs.readFileSync('../data/zone4.txt');
// Loading the selector from cheerio
var $ = cheerio.load(html);

/*
 * The TRs we're looking for in the HTML all share a common attribute; style
 * I'm using that style attribute to make sure we're only selecting the 
 * TRs with the data we're looking for.
 * 
 * Inside of all those rows, we only need the first (of three) TDs.
 */
var selectionOfTheTD = $('tr[style="margin-bottom:10px"] td:first-of-type');

/*
This function converts the addresses from the TDs to text
*/

function getAddressFromTD(index, element) {
   
    
    //The result of the function $ is being stored inside this variable.
    //The function $ is converting the html element to a cheerio element.
    //I am doing this because we wouldn't be able to use .text (see line below)
    //with an html element.
    var cheerioTDElement = $(element);
    
    //This variable holds the text content of the TD.
    //.text() is a method. It is getting the text content from cheerioTDElement.
    var TDTextContent = cheerioTDElement.text();
    
    // I noticed that the address was always on the fourth line of the String.
    //.split is a String method. See "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split"
    //I used .split to make the String into separate lines of text.
    var arrayOfLines = TDTextContent.split("\n");
    
    // I selected the fourth line (number 3) from the array created with 
    // .split above
    var addressLine = arrayOfLines[3];
    
    // Because there are so many indents, the .trim() method trims the excess
    // space of the indents.
    var address = addressLine.trim();
    
    //The address is what comes out of the function.
    return address;
}

// I'm using the cheerio methods .map() to loop over every TD selected on line 16
// converting them using the getAddressFromTD function.
var result = selectionOfTheTD.map(getAddressFromTD).get();

//Creating a txt file.
fs.writeFileSync('./result.txt', result);

//Creating a JSON file, which keeps the lines organized with indent 4.
//For the next assignment the json file is easier to work with.
fs.writeFileSync('./result.json', JSON.stringify(result, null, 4));