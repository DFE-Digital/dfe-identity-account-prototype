// First, middle, last

var filters = {}


filters.getFullName = user => {

  let names = []

  // Prefer DQT Name
  if (user?.dqtUser){
    names.push(user?.dqtUser?.firstNames)
    names.push(user?.dqtUser?.middleNames)
    names.push(user?.dqtUser?.lastNames)
  }
  else {
    names.push(user?.firstNames)
    names.push(user?.middleNames)
    names.push(user?.lastNames)
  }

  names = names.filter(Boolean)
  console.log(`Full name: ${names}`)
  console.log(`Full name: ${names.join(' ')}`)
  return names.join(' ')
}

// First and last
filters.getShortName = user => {

  let names = []
  // Prefer DQT Name
  if (user?.dqtUser){
    names.push(user?.dqtUser?.firstNames)
    names.push(user?.dqtUser?.lastNames)
  }
  else {
    names.push(user?.firstNames)
    names.push(user?.lastNames)
  }
  names = names.filter(Boolean)
  console.log(`Short name: ${names.join(' ')}`)
  return names.join(' ')
}


// -------------------------------------------------------------------
// keep the following line to return your filters to the app
// -------------------------------------------------------------------
exports.filters = filters
