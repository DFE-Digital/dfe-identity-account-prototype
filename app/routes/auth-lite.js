const _ = require('lodash')

module.exports = router => {

  router.post('/auth/email', (req, res) => {
    if(req.session.data['email'] == 'head@school.com') {
      const data = req.session.data
      data.errorMessage = 'true'
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
    } else if(req.session.data['emailAuth'] == 'true') {
      res.redirect('/auth/check-answers')
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
    } else if(req.session.data['emailAuth'] == 'true') {
      res.redirect('/auth/check-answers')
    } 
    else {
      res.redirect('/auth/name')
    }
  })



  router.post(['/auth/name'], (req, res, next) => {
    req.session.data['fullName'] = `${req.body['firstName']} ${req.body['lastName']}`
    if(req.session.data['emailAuth'] == 'true') {
      res.redirect('/auth/date-of-birth')

    } else {
      res.redirect('/auth/date-of-birth')    }
   
  })

  router.post('/auth/date-of-birth', (req, res) => { 
    if(req.session.data['fullName'] == 'Dave Smith') {
      res.redirect('/auth/check-account')
    } else if (req.session.data['dqtCheck'] != 'false') {
      res.redirect('/auth/have-nino')
    } else if(req.session.data['emailAuth'] == 'true') {
      res.redirect('/auth/phone')

    } else if(req.session.data['emailAuth'] == 'true') {
      res.redirect('/auth/check-answers')
    } else {
      res.redirect('/auth/check-answers')
    }
  })


  router.post('/auth/have-nino', (req, res) => { 
    if(req.session.data['have-nino'] == 'yes') {
      res.redirect('/auth/nino')
    } else {
      res.redirect('/auth/have-trn')
    }
  })

  router.post('/auth/nino', (req, res) => { 
      res.redirect('/auth/have-trn')
  })

  router.post('/auth/have-trn', (req, res) => { 
    if(req.session.data['have-trn'] == 'yes') {
      res.redirect('/auth/trn')
    } else {
      res.redirect('/auth/have-qts')
    }
  })
  
  router.post('/auth/trn', (req, res) => { 
    res.redirect('/auth/have-qts')
})

  router.post('/auth/have-qts', (req, res) => { 
    const data = req.session.data
    data.qtsAnswered = 'true'
    if(req.session.data['have-qts'] == 'Yes') {
      res.redirect('/auth/how-qts')
    } else {
      res.redirect('/auth/check-answers')
    }
  })


  router.post('/auth/how-qts', (req, res) => { 
    res.redirect('/auth/check-answers')
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




   router.post('/auth/check-answers', (req, res) => { res.redirect('/auth/finish') })
  router.post('/auth/finish', (req, res) => { res.redirect('/auth/return-to-service') })

  router.post('/auth/phone', (req, res) => { res.redirect('/auth/phone-code') })
  router.post('/auth/phone-radio', (req, res) => { res.redirect('/auth/phone-code') })

}
