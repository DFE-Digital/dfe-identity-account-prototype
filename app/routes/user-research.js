const _ = require('lodash')

module.exports = router => {

 // QTS create account
 router.get('/user-research/qts/sign-in', (req, res) => {
  const data = req.session.data
  data.identityServiceName = 'Apply for qualified teacher status (QTS) in England'
  data.onwardContinue = 'to apply for qualified teacher status (QTS) in England'
  data.returnToService = '/qts/apply-for-qts'
  data.scenario = '1'
  data.signIn = 'true'
  res.redirect('/sign-in/email')
})
  
 // QTS create account
 router.get('/user-research/qts/create-account', (req, res) => {
  const data = req.session.data
  data.identityServiceName = 'Apply for qualified teacher status (QTS) in England'
  data.onwardContinue = 'to apply for qualified teacher status (QTS) in England'
  data.returnToService = '/qts/apply-for-qts'
  data.scenario = '2'
  data.signIn = 'false'
  res.redirect('/auth/email')
})
 // QTS create account
 router.get('/user-research/qts/create-account-phone', (req, res) => {
  const data = req.session.data
  data.identityServiceName = 'Apply for qualified teacher status (QTS) in England'
  data.onwardContinue = 'to apply for qualified teacher status (QTS) in England'
  data.returnToService = '/qts/apply-for-qts'
  data.scenario = '3'
  data.signIn = 'false'
  res.redirect('/auth/phone')
})
router.get('/auth/return-to-service', (req, res) => {
  res.redirect(req.session.data.returnToService)
})

}
