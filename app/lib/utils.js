
exports.nameHasChanged = (previousUser, newUser) => {
  const normaliseName = name => name.toLowerCase().trim()

  let names = ['firstNames', 'middleNames', 'lastNames']

  let anyChanged = names.some(name => normaliseName(previousUser[name]) != normaliseName(newUser[name]))

  return anyChanged
}

exports.dateOfBirthHasChanged = (previousUser, newUser) => {

  let previousDate = new Date(previousUser.dateOfBirth)
  let newDate = new Date(newUser.dateOfBirth)

  // Normalise timestamps
  previousDate.setHours(0,0,0,0)
  newDate.setHours(0,0,0,0)

  return previousDate.getTime() != newDate.getTime()
}
