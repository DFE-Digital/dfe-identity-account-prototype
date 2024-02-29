const _ = require('lodash')

module.exports = router => {

   // NPQ create account
   router.get('/user-research/npq/id', (req, res) => {
    const data = req.session.data
    data.identityServiceName = data.npq
    data.onwardContinue = data.npq
    data.returnToService = 'https://npq-prototype.herokuapp.com/chosen'
    data.scenario = '1'
    data.dqtCheck = 'true'
    data.emailAuth = 'false'
    data.signIn = 'true'
    data.createAccountURL = '/user-research/npq/create-account'
    data.signInAccountURL = '/user-research/npq/sign-in'
    data.verifiedDob = 'true'
    res.redirect('/auth/ga-account')
  })

  // NPQ sign in
  router.get('/user-research/npq/sign-in', (req, res) => {
    const data = req.session.data
    data.identityServiceName = data.npq
    data.onwardContinue = data.npq
    data.returnToService = 'https://npq-prototype.herokuapp.com/user-research/npq/existing-user'
    data.scenario = '2'
    data.emailAuth = 'false'
    data.verifiedDob = 'true'
    data.signIn = 'true'
    res.redirect('/sign-in/email')
  })

  // NPQ create account
  router.get('/user-research/npq/create-account', (req, res) => {
    const data = req.session.data
    data.identityServiceName = data.npq
    data.onwardContinue = data.npq
    data.returnToService = 'https://npq-prototype.herokuapp.com/user-research/npq/new-user'
    data.scenario = '3'
    data.dqtCheck = 'true'
    data.emailAuth = 'false'
    data.signIn = 'true'
    data.verifiedDob = 'true'
    res.redirect('/auth/email')
  })

  // NPQ sign-out external link
  router.get('/user-research/npq/sign-out', (req, res) => {
    const data = req.session.data
    data.identityServiceName = data.npq
    data.onwardContinue = data.npq
    data.emailAuth = 'false'
    data.signIn = 'false'
    data.service = 'npq'
    data.verifiedDob = 'true'
    data.createAccountURL = '/user-research/npq/create-account'
    data.signInAccountURL = '/user-research/npq/sign-in'
    res.redirect('/auth/ga-account')
  })

  // NPQ to my account
  router.get('/user-research/npq/account', (req, res) => {
    const data = req.session.data
    data.identityServiceName = data.npq
    data.onwardContinue = data.npq
    data.signIn = 'true'
    data.verifiedDob = 'true'
    data.showDqtName = 'show'
    data.service = 'npq'
    data.createAccountURL = '/user-research/npq/create-account'
    data.signInAccountURL = '/user-research/npq/sign-in'
    res.redirect('/account/account-details')
  })

  // NPQ closed state - start page sign in link
  router.get('/user-research/npq/closed-signin', (req, res) => {
    const data = req.session.data
    data.identityServiceName = data.npq
    data.onwardContinue = data.npq
    data.returnToService = 'https://npq-prototype.herokuapp.com/user-research/npq/closed-signin'
    data.scenario = '4'
    data.emailAuth = 'false'
    data.createAccountURL = '/user-research/npq/create-account-closed'
    data.signInAccountURL = '/user-research/npq/sign-in-closed'
    data.verifiedDob = 'true'
    data.signIn = 'true'
    res.redirect('/auth/ga-account')
  })

  // NPQ closed state - create account
  router.get('/user-research/npq/create-account-closed', (req, res) => {
    const data = req.session.data
    data.identityServiceName = data.npq
    data.onwardContinue = data.npq
    data.returnToService = 'https://npq-prototype.herokuapp.com/user-research/npq/closed-signin'
    data.scenario = '5'
    data.dqtCheck = 'true'
    data.emailAuth = 'false'
    data.signIn = 'true'
    data.verifiedDob = 'true'
    res.redirect('/auth/email')
  })

  // NPQ closed state - sign in 
  router.get('/user-research/npq/sign-in-closed', (req, res) => {
    const data = req.session.data
    data.identityServiceName = data.npq
    data.onwardContinue = data.npq
    data.returnToService = 'https://npq-prototype.herokuapp.com/user-research/npq/closed-signin'
    data.scenario = '6'
    data.emailAuth = 'false'
    data.verifiedDob = 'true'
    data.signIn = 'true'
    res.redirect('/sign-in/email')
  })

  // NPQ closed state - start page EoI request link 
  router.get('/user-research/npq/closed-eoi', (req, res) => {
    const data = req.session.data
    data.identityServiceName = data.npq
    data.onwardContinue = data.npq
    data.scenario = '7'
    data.emailAuth = 'false'
    data.createAccountURL = '/user-research/npq/create-account-closed-eoi'
    data.signInAccountURL = '/user-research/npq/sign-in-closed-eoi'
    data.verifiedDob = 'true'
    data.signIn = 'true'
    res.redirect('/auth/ga-account')
  })

  // NPQ closed state EOI - create account
  router.get('/user-research/npq/create-account-closed-eoi', (req, res) => {
    const data = req.session.data
    data.identityServiceName = data.npq
    data.onwardContinue = data.npq
    data.returnToService = 'https://npq-prototype.herokuapp.com/user-research/npq/closed-eoi'
    data.scenario = '8'
    data.dqtCheck = 'true'
    data.emailAuth = 'false'
    data.signIn = 'true'
    data.verifiedDob = 'true'
    res.redirect('/auth/email')
  })

  // NPQ closed state EOI - sign in
  router.get('/user-research/npq/sign-in-closed-eoi', (req, res) => {
    const data = req.session.data
    data.identityServiceName = data.npq
    data.onwardContinue = data.npq
    data.returnToService = 'https://npq-prototype.herokuapp.com/user-research/npq/closed-eoi'
    data.scenario = '9'
    data.emailAuth = 'false'
    data.verifiedDob = 'true'
    data.signIn = 'true'
    res.redirect('/sign-in/email')
  })

  router.get('/auth/return-to-service', (req, res) => {
    res.redirect(req.session.data.returnToService)
  })
}