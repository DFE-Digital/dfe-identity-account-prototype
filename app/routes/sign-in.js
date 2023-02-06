const _ = require('lodash')
function emailHasIdentity (data) {
  return data.hasIdentity || data['email-address'] === 'existing.user@example.com'
}
module.exports = router => {


  
  router.post('/sign-in/email', (req, res) => {
    const data = req.session.data
    data.matchAccountEmail = 'false' 
    data.errorMessage = 'false'
    res.redirect('/sign-in/email-code') 
  })

  router.post('/sign-in/code-type', (req, res) => {
    if(req.session.data['codeType'] == 'email') {
      res.redirect('/sign-in/email-code')
    } else {
      res.redirect('/sign-in/phone-code')
    }
  })


  router.post('/sign-in/email-code', (req, res) => {
    if(req.session.data['email'] == 'new@email.com') {
      res.redirect('/auth/create-account-interstitial')
    } else {
      res.redirect('/sign-in/finish')
    }
  })
  router.post('/auth/create-account-interstitial', (req, res) => { res.redirect('/user-research/qts/create-account-phone') })


  router.post('/sign-in/phone-code', (req, res) => { res.redirect('/sign-in/finish') })


  router.post('/sign-in/finish', (req, res) => { res.redirect('/auth/return-to-service') })

  router.post('/sign-in/resend-email', (req, res) => { res.redirect('/sign-in/email-code') })

  router.post('/sign-in/resend-phone', (req, res) => { res.redirect('/sign-in/phone-code') })



 


}

