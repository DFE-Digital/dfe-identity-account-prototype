const _ = require('lodash')

module.exports = router => {

  router.post('/auth/email', (req, res) => {
    if(req.session.data['email'] == 'head@school.com') {
      const data = req.session.data
      data.errorMessage = 'true'
      data.errorMessageCopy = 'Enter a personal email address. Shared work email are not allowed.'
      res.redirect('/auth/email')
    } else {
      const data = req.session.data
      data.matchAccountEmail = 'false'
      data.errorMessage = 'false'
      res.redirect('/auth/email-code')     
    }
    })

  router.post('/auth/email-code', (req, res) => {
    if(req.session.data['email'] == 'existing@email.com') {
      const data = req.session.data
      data.phoneMatch = 'false'
      data.matchAccount = 'true'
      res.redirect('/auth/sign-in-interstitial')
    } else {
      res.redirect('/auth/phone')
    }
  })
  router.post('/auth/sign-in-interstitial', (req, res) => { res.redirect('/sign-in/finish') })

  router.post('/auth/resend-email', (req, res) => { res.redirect('/auth/email-code') })
  
  router.post('/auth/resend-phone', (req, res) => { res.redirect('/auth/phone-code') })

  router.post('/auth/phone', (req, res) => { res.redirect('/auth/phone-code') })

  router.post('/auth/phone-code', (req, res) => {
    if(req.session.data['phone'] == '07827999618') {
      const data = req.session.data
      data.phoneMatch = 'true'
      data.matchAccount = 'true'
      res.redirect('/auth/sign-in-interstitial')
    } else {
      res.redirect('/auth/name')
    }
  })



  router.post(['/auth/name'], (req, res, next) => {
    req.session.data['fullName'] = `${req.body['firstName']} ${req.body['lastName']}`
    res.redirect('/auth/date-of-birth')
  })

  router.post('/auth/date-of-birth', (req, res) => { 
    if(req.session.data['fullName'] == 'Dave Smith') {
      res.redirect('/auth/check-account')
    } else {
      res.redirect('/auth/finish')
    }
  })

  router.post('/auth/check-account', (req, res) => {
    const data = req.session.data

    if(req.session.data['matchAccountEmail'] == 'true') {
      data.matchAccount = 'true'
      req.session.data['email'] = data.emailExample
      res.redirect('/sign-in/email-code')

    } else {
      data.email = 'davesmith@email.com'
      data.matchAccount = 'false'
      data.matchAccountEmail = 'false'
      res.redirect('/auth/finish')
    }
  })




  // router.post('/auth/check-answers', (req, res) => { res.redirect('/auth/finish') })
  router.post('/auth/finish', (req, res) => { res.redirect('/auth/return-to-service') })

  router.post('/auth/phone', (req, res) => { res.redirect('/auth/phone-code') })
  router.post('/auth/phone-radio', (req, res) => { res.redirect('/auth/phone-code') })

}
