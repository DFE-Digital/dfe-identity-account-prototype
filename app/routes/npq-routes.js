const _ = require('lodash')

module.exports = router => {


 // Qual my account external link

   // Qual create account
   router.get('/user-research/npq/id', (req, res) => {
    const data = req.session.data
    data.identityServiceName = data.npq
    data.onwardContinue = data.npq
    data.returnToService = 'https://npq-prototype.herokuapp.com/chosen'
    data.scenario = '1'
    data.dqtCheck = 'true'
    data.emailAuth = 'false'
    data.signIn = 'true'
    data.createAccountURL = '/user-research/qual/create-account'
    data.signInAccountURL = '/user-research/qual/sign-in'
    data.verifiedDob = 'true'
    res.redirect('/auth/email')
  })



  // Qual sign in
  router.get('/user-research/npq/sign-in', (req, res) => {
    const data = req.session.data
    data.identityServiceName = data.npq
    data.onwardContinue = data.npq
    data.returnToService = 'https://npq-prototype.herokuapp.com/registration-status/registration-status'
    data.scenario = '1'
    data.emailAuth = 'false'
    data.verifiedDob = 'true'
    data.signIn = 'true'
    res.redirect('/sign-in/email')
  })


  router.get('/auth/return-to-service', (req, res) => {
    res.redirect(req.session.data.returnToService)
  })
}
