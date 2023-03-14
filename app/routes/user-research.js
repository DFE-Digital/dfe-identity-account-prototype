const _ = require('lodash')

module.exports = router => {

 // QTS sign in account
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
  data.onwardContinue = 'apply for qualified teacher status (QTS) in England'
  data.returnToService = '/qts/apply-for-qts'
  data.scenario = '2'
  data.signIn = 'false'
  res.redirect('/auth/email')
})
 // QTS create account
 router.get('/user-research/qts/create-account-phone', (req, res) => {
  const data = req.session.data
  data.identityServiceName = 'Apply for qualified teacher status (QTS) in England'
  data.onwardContinue = 'apply for qualified teacher status (QTS) in England'
  data.returnToService = '/qts/apply-for-qts'
  data.scenario = '3'
  data.signIn = 'false'
  res.redirect('/auth/phone')
})


 // Qual create account
 router.get('/user-research/qual/create-account', (req, res) => {
  const data = req.session.data
  data.identityServiceName = data.qs
  data.onwardContinue = data.qs
  data.returnToService = 'https://qualifications-prototype.herokuapp.com/user-research/mvp/'
  data.scenario = '4'
  data.dqtCheck = 'true'
  data.signIn = 'true'
  res.redirect('/auth/email')
})

 // Qual sign in
 router.get('/user-research/qual/sign-in', (req, res) => {
  const data = req.session.data
  data.identityServiceName = data.qs
  data.onwardContinue = data.qs
  data.returnToService = 'https://qualifications-prototype.herokuapp.com/user-research/mvp/'
  data.scenario = '5'
  data.signIn = 'true'
  res.redirect('/sign-in/email')
})

router.get('/user-research/qual/account', (req, res) => {
  const data = req.session.data
  data.identityServiceName = data.qs
  data.onwardContinue = data.qs
  data.returnToService = '/account/account-details'
  data.scenario = '6'
  data.signIn = 'true'
  data.service = 'qs'
  res.redirect('/account/account-details')
})

router.get('/auth/return-to-service', (req, res) => {
  res.redirect(req.session.data.returnToService)
})

}
