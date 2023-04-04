console.log(process.env.TEST_KEY)


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
  'dqtLastName': process.env.dqt_last_name || 'Smith',
  'emailName': process.env.email_name || 'Victoria Smith',
  'npq': 'Register for a national professional qualification',

  // Error messages
  'errorMessageCopy': 'Enter a personal email address. It cannot be one that other people may get access to.',

}
