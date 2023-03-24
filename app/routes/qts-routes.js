const _ = require('lodash')

module.exports = router => {
   // QTS eligibility routes

   router.post('/qts/create-account-sign-in', (req, res) => {
    if(req.session.data['eligibility'] == 'true') {
      res.redirect('/qts/eligibility/question-country')
    } else {
      res.redirect('/sign-in/interstitial')
    }
  })

  // Eligibility
  router.post('/qts/eligibility/question-country', (req, res) => { res.redirect('/qts/eligibility/question-formal-training') })
  router.post('/qts/eligibility/question-formal-training', (req, res) => { res.redirect('/qts/eligibility/question-degree') })
  router.post('/qts/eligibility/question-degree', (req, res) => { res.redirect('/qts/eligibility/question-special-educational-needs') })
  router.post('/qts/eligibility/question-special-educational-needs', (req, res) => { res.redirect('/qts/eligibility/question-work-experience') })
  router.post('/qts/eligibility/question-work-experience', (req, res) => { res.redirect('/qts/eligibility/question-misconduct') })
  router.post('/qts/eligibility/question-misconduct', (req, res) => { res.redirect('/qts/eligibility/eligible') })
  

  // sign in
  router.post('/sign-in/interstitial', (req, res) => { res.redirect('/user-research/qts/sign-in') })


  // task list
  router.post('/qts/personal-information/name-and-dob', (req, res) => { res.redirect('/qts/personal-information/question-current-legal-name') })
  router.post('/qts/personal-information/question-current-legal-name', (req, res) => { res.redirect('/qts/personal-information/personal-information-summary') })
  router.post('/qts/personal-information/personal-information-summary', (req, res) => { 
    const data = req.session.data
    data.completed = 'true'
    res.redirect('/qts/apply-for-qts') 
  })

 // QTS sign in account
 router.get('/user-research/qts/sign-in', (req, res) => {
    const data = req.session.data
    data.identityServiceName = 'Apply for qualified teacher status (QTS) in England'
    data.onwardContinue = 'to apply for qualified teacher status (QTS) in England'
    data.returnToService = '/qts/apply-for-qts'
    data.scenario = '1'
    data.signIn = 'true'
    data.emailAuth = 'false'
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
    data.createAccountURL = '/auth/email'
    data.signInAccountURL = '/user-research/qts/sign-in'
    data.emailAuth = 'false'
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
    data.emailAuth = 'false'
  
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
    data.emailAuth = 'false'
    data.emailAuth = 'false'
    data.dqtCheck = 'false'
    data.service = 'qts'
    res.redirect('/auth/ga-account')
  })


 //  eligible check journey
  
 router.get('/user-research/qts/startpage', (req, res) => {
  const data = req.session.data
  data.identityServiceName = data.qts
  data.onwardContinue = data.qts
  data.returnToService = '/qts/apply-for-qts'
  data.scenario = '5'
  data.emailAuth = 'false'
  data.signIn = 'true'
  data.service = 'qts'
  data.createAccountURL = '/user-research/qts/create-account'
  data.signInAccountURL = '/user-research/qts/sign-in'
  data.showDqtName = 'true'
  data.showDqtDob = 'hide'
  data.dqtCheck = 'false'
  res.redirect('/qts/eligibility/start-eligibility')
})


 //  basic account journey
  
 router.get('/user-research/landingpage', (req, res) => {
  const data = req.session.data
  data.identityServiceName = data.qts
  data.onwardContinue = data.qts
  data.returnToService = '/qts/apply-for-qts'
  data.scenario = '6'
  data.emailAuth = 'false'
  data.signIn = 'true'
  data.service = 'qts'
  data.createAccountURL = '/user-research/qts/create-account'
  data.signInAccountURL = '/user-research/qts/sign-in'
  data.showDqtName = 'true'
  data.showDqtDob = 'hide'
  data.dqtCheck = 'false'
  res.redirect('/qts/eligibility/eligible')
})



   // qts dfe ID my account external link
   router.get('/user-research/qts/account', (req, res) => {
    const data = req.session.data
    data.identityServiceName = data.qts
    data.onwardContinue = data.qts
    data.scenario = '7'
    data.signIn = 'true'
    data.service = 'qts'
    data.showDqtName = 'show'
    data.emailAuth = 'false'
    data.createAccountURL = '/user-research/qts/create-account'
    data.signInAccountURL = '/user-research/qts/sign-in'
    data.alert = 'hide'
    data.showDqtDob = 'hide'
    res.redirect('/account/account-details')
  })


     // qts create account or sign in 
     router.get('/user-research/qts/ga-account', (req, res) => {
      const data = req.session.data
      data.identityServiceName = data.qts
      data.onwardContinue = data.qts
      data.returnToService = '/qts/apply-for-qts'
      data.scenario = '8'
      data.emailAuth = 'false'
      data.signIn = 'true'
      data.service = 'qts'
      data.createAccountURL = '/user-research/qts/create-account'
      data.signInAccountURL = '/user-research/qts/sign-in'
      data.showDqtName = 'true'
      data.showDqtDob = 'hide'
      data.dqtCheck = 'false'
      res.redirect('/auth/ga-account')
    })

  router.get('/auth/return-to-service', (req, res) => {
    res.redirect(req.session.data.returnToService)

  })
}
