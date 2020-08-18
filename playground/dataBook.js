const fs = require('fs');
const jsonFromCsvDatabook = require('./files/csvjson');


var parsedData = parseDatabook(jsonFromCsvDatabook);
writeDatabookObjectToJson(parsedData);

//=============================================================================================================
//=============================================================================================================
function parseDatabook(rawDataBook) {
  let newDatabookObj = [rawDataBook[0]];
  let mergeDescription = databookDescriptionMerge(rawDataBook, newDatabookObj);
  return mergeDescription;
}

//===========================================================================================================

function writeDatabookObjectToJson(databookObj) {
  let JsonString = JSON.stringify(databookObj, null, 2);
  fs.writeFile("databook_description_merge.json", JsonString, 'utf8', (err) => {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
}

//=======================================================================================================

function databookDescriptionMerge(rawDataObj, newDataObj) {
  let totalDataPoints = Object.keys(rawDataObj).length;
  for (let i = 1; i < totalDataPoints; i++) {
    let { Dist, NS, SN } = rawDataObj[i];
    if (!Dist && !NS && !SN) {
      let lastEntryIdx = Object.keys(newDataObj).length - 1;
      let lastEntry = newDataObj[lastEntryIdx];
      let newDescription = lastEntry.Description + ' ' + rawDataObj[i].Description;
      lastEntry.Description = newDescription;
    } else {
      newDataObj.push(rawDataObj[i]);
    }
  }
  return newDataObj;
}