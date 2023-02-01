const _ = require('lodash')

module.exports = router => {

  router.post('/auth/email', (req, res) => { res.redirect('/auth/email-code') })
  // router.post('/auth/email-code', (req, res) => { res.redirect('/auth/phone') })

  router.post('/auth/email-code', (req, res) => {
    if(req.session.data['email'] == 'existing@email.com') {
      res.redirect('/auth/sign-in-interstitial')
    } else {
      res.redirect('/auth/phone')
    }
  })
  router.post('/auth/sign-in-interstitial', (req, res) => { res.redirect('/sign-in/finish') })

  router.post('/auth/resend-email', (req, res) => { res.redirect('/auth/email-code') })

  router.post('/auth/phone', (req, res) => { res.redirect('/auth/phone-code') })
  router.post('/auth/phone-code', (req, res) => { res.redirect('/auth/name') })


  router.post(['/auth/name'], (req, res, next) => {
    req.session.data['fullName'] = `${req.body['firstName']} ${req.body['lastName']}`
    res.redirect('/auth/date-of-birth')
  })

  router.post('/auth/date-of-birth', (req, res) => { res.redirect('/auth/finish') })
  // router.post('/auth/check-answers', (req, res) => { res.redirect('/auth/finish') })
  router.post('/auth/finish', (req, res) => { res.redirect('/auth/return-to-service') })

  router.post('/auth/phone', (req, res) => { res.redirect('/auth/phone-code') })
  router.post('/auth/phone-radio', (req, res) => { res.redirect('/auth/phone-code') })

}
