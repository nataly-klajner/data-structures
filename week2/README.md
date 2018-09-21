# Assignment 2

For this assignment I worked with the content of zone 4 of the AA meetings addresses.
After creating txt files on the **Assignment 1**, I looked at the code to find the addresses.
They were inside the first table cell (TD) of each table row (TR). 

As there were many TRs on the code, I specified the ones to select with their style
(tr[style="margin-bottom:10px), and then to select the first TD only (td:first-of-type).
That was stored in a var selectionOfTheTD.

Inside the function getAddressFromTD:
+ The var cheerioTDElement = $(element); stores the result of the function that
converts the html code to cheerio, as it wouldn't be possible to use the method
.text with an html element. 
+ var TDTextContent = cheerioTDElement.text(); holds the text content from the TDs.
The method .text gets the text content from the element.
+ In var arrayOfLines = TDTextContent.split("\n");  the .split() method was used 
to split the text into separate lines.
+ In var addressLine = arrayOfLines[3]; the fourth line is selected out of the text of each TD.
+ var address = addressLine.trim(); is being used to trim the extra space of indent before the text lines.
+ The function will return the address of each TD, with "return address;"

I used the cheerio methods .map() to loop over every TD selected on line 16, converting them using the getAddressFromTD function.
var result = selectionOfTheTD.map(getAddressFromTD).get();

I created two files, one txt and one json. Json stores the addresses in a lined text box, 
which seemes to be helpful for the next part of this project.

JSON.stringify(result, null, 4)); was used to print the var result, null as nothing was to be replaced, and 4 is the amount of indent for each line.

Used links:
<https://gist.github.com/magicznyleszek/809a69dd05e1d5f12d01>

<https://www.npmjs.com/package/cheerio>

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split>
