const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter
const { DateTime } = require("luxon")
const fs = require('fs')
const path = require('path')
const individualFiltersFolder = path.join(__dirname, './filters')



// Import filters from filters folder
if (fs.existsSync(individualFiltersFolder)) {
  var files = fs.readdirSync(individualFiltersFolder)
  files.forEach(file => {
    let fileData = require(path.join(individualFiltersFolder, file))
    // Loop through each exported function in file (likely just one)
    Object.keys(fileData).forEach((filterGroup) => {
      // Get each method from the file
      Object.keys(fileData[filterGroup]).forEach(filterName => {
        // filters[filterName] = fileData[filterGroup][filterName]
        addFilter(filterName, fileData[filterGroup][filterName])
      })
    })
  })
}



addFilter('stringify',function(object) {
  return JSON.stringify(object)
})

addFilter('isoDateFromDateInput', function(object) {
    try {
      const year = parseInt(object.year) || new Date().getFullYear()
      const month = parseInt(object.month)
  
      if (!object.day) {
        return DateTime.local(year, month).toFormat('yyyy-LL')
      } else {
        const day = parseInt(object.day)
  
        return DateTime.local(year, month, day).toISODate()
      }
    } catch (error) {
      return error.message.split(':')[0]
    }
  })
  
  addFilter('date', function(date) {
    return DateTime.fromISO(date).toFormat('d MMMM yyyy')
  })


  addFilter('maskPhoneNumber', function(phoneNumber) {
    var s = phoneNumber;
    var start = 1;
    var end = 5;
  
    var result = s.slice(1, start);
    result += "*".repeat(s.length -start -end);
    result += s.slice(s.length -end);
    return result;
  })
 
  addFilter('maskEmail', function(email) {
    var split = email.split("@");
    var split1 = split[0];
    var avg = split1.length / 1;
    
    split1 = split1.substring(2, (split1.length - avg));
    var split2 = split[1];
    return split1 + "******@" + split2;
  })



