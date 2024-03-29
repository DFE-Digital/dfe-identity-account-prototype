const _ = require('lodash')
const url = require('url')

module.exports = router => {


 // Qual my account external link

router.get('/user-research/qts/account', (req, res) => {
  const data = req.session.data
  data.identityServiceName = data.qts
  data.onwardContinue = data.qts
  data.returnToService = '/account/account-details'
  data.scenario = '7'
  data.signIn = 'true'
  data.service = 'qs'
  data.emailAuth = 'false'
  data.showDqtName = 'false'
  data.showDqtDob = 'hide'
  data.verifiedDob = 'true'
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
  data.emailAuth = 'false'
  data.signIn = 'true'
  data.verifiedDob = 'true'
  res.redirect('/auth/email')
})
  
 // Qual sign in
router.get('/user-research/qual/sign-in', (req, res) => {
  const data = req.session.data
  data.identityServiceName = data.qs
  data.onwardContinue = data.qs
  data.returnToService = 'https://qualifications-prototype.herokuapp.com/user-research/mvp/'
  data.scenario = '6'
  data.emailAuth = 'false'
  data.verifiedDob = 'true'
  data.signIn = 'true'
  res.redirect('/sign-in/email')
})



   // Qual dfe ID my account external link
  router.get('/user-research/qual/account', (req, res) => {
    const data = req.session.data
    data.identityServiceName = data.qs
    data.onwardContinue = data.qs
    data.scenario = '7'
    data.signIn = 'true'
    data.service = 'qs'
    data.showDqtName = 'show'
    data.emailAuth = 'false'
    data.alert = 'hide'
    data.showDqtDob = 'hide'
    data.verifiedDob = 'true'
    res.redirect('/account/account-details')
  })

   // Qual my sign out external link
   router.get('/user-research/qual/sign-out', (req, res) => {
    const data = req.session.data
    data.identityServiceName = data.qs
    data.onwardContinue = data.qs
    data.emailAuth = 'false'
    data.scenario = '8'
    data.signIn = 'false'
    data.service = 'qs'
    data.verifiedDob = 'true'
    res.redirect('/user-research/qual/sign-out-account')
  })
  
   // redirect to ga account page after signout
   router.get('/user-research/qual/sign-out-account', (req, res) => {
    const data = req.session.data
    data.onwardContinue = data.qs
    data.createAccountURL = '/user-research/qual/create-account'
    data.signInAccountURL = '/user-research/qual/sign-in'
    data.verifiedDob = 'true'
    res.redirect('/auth/ga-account')
  })
  
   // qual email account my account external link
  
  router.get('/user-research/qual/email', (req, res) => {
    const data = req.session.data
    
    data.identityServiceName = data.qs
    data.onwardContinue = data.qs

    let hostname
    if (req.hostname == 'localhost'){
      hostname = data.services[0].localUrl
    }
    else hostname = data.services[0].deployedUrl

    data.returnToService = `${hostname}/signed-in`
    data.scenario = '9'
    data.emailAuth = 'true'
    data.signIn = 'true'
    data.service = 'qs'
    data.showDqtName = 'true'
    data.createAccountURL = '/auth/name'
    data.signInAccountURL = '/user-research/qual/sign-in'
    data.showDqtDob = 'hide'
    data.dqtCheck = 'false'
    data.verifiedDob = 'true'
    
    res.redirect('/qualifications/start')
  })
  
     // Start page to quals service
  
     router.get('/user-research/qual/startpage', (req, res) => {
      const data = req.session.data
      data.identityServiceName = data.qs
      data.onwardContinue = data.qs
      data.returnToService = 'https://qualifications-prototype.herokuapp.com/user-research/mvp/'
      data.scenario = '10'
      data.emailAuth = 'false'
      data.signIn = 'true'
      data.service = 'qs'
      data.createAccountURL = '/user-research/qual/create-account'
      data.signInAccountURL = '/user-research/qual/sign-in'
      data.showDqtName = 'true'
      data.showDqtDob = 'hide'
      data.dqtCheck = 'true'
      data.verifiedDob = 'true'
      res.redirect('/qualifications/start')
    })
  

  router.get('/auth/return-to-service', (req, res) => {
    res.redirect(req.session.data.returnToService)
  })
}
