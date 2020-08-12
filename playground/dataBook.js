const fs = require('fs');
const jsonFromCsvDatabook = require('./files/csvjson');


var parsedData = parseDatabook(jsonFromCsvDatabook);
writeDatabookObjectToJson(parsedData);

//=============================================================================================================
//=============================================================================================================
function parseDatabook(rawDataBook) {
  var totalDatabookPoints = Object.keys(rawDataBook).length;
  var newDatabookObj = [rawDataBook[0]];
  var mergeDescription = databookDescriptionMerge(rawDataBook, newDatabookObj, totalDatabookPoints);
  return mergeDescription;
}

//===========================================================================================================

function writeDatabookObjectToJson(databookObj) {
  var JsonString = JSON.stringify(databookObj, null, 2);
  fs.writeFile("datbook_description_merge.json", JsonString, 'utf8', (err) => {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
}

//=======================================================================================================

function databookDescriptionMerge(rawDataObj, newDataObj, totalDataPoints) {
  for (let i = 1; i < totalDataPoints; i++) {
    if (!rawDataObj[i].Dist && !rawDataObj[i].NS && !rawDataObj[i].SN) {
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