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

 // QTS my sign out external link
 router.get('/user-research/qts/sign-out', (req, res) => {
  const data = req.session.data
  data.identityServiceName = data.qts
  data.onwardContinue = data.qts
  data.returnToService = '/account/sign-out'
  data.scenario = '4'
  data.signIn = 'false'
  data.service = 'qts'
  res.redirect('/account/signed-out')
})

 // Qual my account external link

 router.get('/user-research/qts/account', (req, res) => {
  const data = req.session.data
  data.identityServiceName = data.qts
  data.onwardContinue = data.qts
  data.returnToService = '/account/account-details'
  data.scenario = '7'
  data.signIn = 'true'
  data.service = 'qs'
  data.showDqtName = 'false'
  data.showDqtDob = 'hide'
  res.redirect('/account/account-details')
})

 // Qual create account
 router.get('/user-research/qual/create-account', (req, res) => {
  const data = req.session.data
  data.identityServiceName = data.qs
  data.onwardContinue = data.qs
  data.returnToService = 'https://qualifications-prototype.herokuapp.com/user-research/mvp/'
  data.scenario = '5'
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
  data.scenario = '6'
  data.signIn = 'true'
  res.redirect('/sign-in/email')
})
 // Qual my account external link

router.get('/user-research/qual/account', (req, res) => {
  const data = req.session.data
  data.identityServiceName = data.qs
  data.onwardContinue = data.qs
  data.returnToService = '/account/account-details'
  data.scenario = '7'
  data.signIn = 'true'
  data.service = 'qs'
  data.showDqtName = 'show'
  data.alert = 'hide'
  data.showDqtDob = 'hide'
  res.redirect('/account/account-details')
})
 // Qual my sign out external link
 router.get('/user-research/qual/sign-out', (req, res) => {
  const data = req.session.data
  data.identityServiceName = data.qs
  data.onwardContinue = data.qs
  data.returnToService = '/account/sign-out'
  data.scenario = '8'
  data.signIn = 'false'
  data.service = 'qs'
  res.redirect('/account/signed-out')
})

router.get('/auth/return-to-service', (req, res) => {
  res.redirect(req.session.data.returnToService)
})

}
