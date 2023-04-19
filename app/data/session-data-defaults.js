const users = require('./users.json')
const dqtUsers = require('./dqtUsers.json')

module.exports = {

  // Insert values here
  'qts': 'Apply for qualified teacher status (QTS) in England',
  'qtsLc': 'apply for qualified teacher status (QTS) in England',
  'tsa': 'DfE Identity account',
  'tsaP': 'DfE Identity accounts',
  'qs': 'Access your teaching qualifications',
  'emailExample': process.env.email || 'davesmith@school.sch.uk',
  'dqtName': process.env.dqt_name || 'Victoria Smith',
  'dqtFirstName': process.env.dqt_first_name || 'Victoria',
  'dqtMiddleName': process.env.dqt_middle_name || 'Nelson',
  'dqtLastName': process.env.dqt_last_name || 'Smith',
  'emailName': process.env.email_name || 'Victoria Smith',
  'npq': 'Register for a national professional qualification',
  defaultData: {
    firstNames: "Victoria",
    middleNames: "Nelson",
    lastNames: "Smith",
    phone: "07700900782",
    email: "v.smith@example.com",
    dateOfBirth: "1999-10-21T00:00:00.000Z"
  },

  // Error messages
  'errorMessageCopy': 'Enter a personal email address. It cannot be one that other people may get access to.',
  users,
  dqtUsers

}
