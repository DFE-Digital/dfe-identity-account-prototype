// First, middle, last

var filters = {}


filters.getFullName = user => {

  let names = []

  // Prefer DQT Name
  if (user?.dqtUser){
    names.push(user.dqtUser.firstNames)
    names.push(user.dqtUser.middleNames)
    names.push(user.dqtUser.lastNames)
  }
  else {
    names.push(user.firstNames)
    names.push(user.middleNames)
    names.push(user.lastNames)
  }

  names.filter(Boolean)
  return names.join(' ')
}

// First and last
filters.getShortName = user => {

  let names = []
  // Prefer DQT Name
  if (user?.dqtUser){
    names.push(user.dqtUser.firstNames)
    names.push(user.dqtUser.lastNames)
  }
  else {
    names.push(user.firstNames)
    names.push(user.lastNames)
  }
  names.filter(Boolean)
  return names.join(' ')
}
