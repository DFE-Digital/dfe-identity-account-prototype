const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter
const { DateTime } = require("luxon")


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