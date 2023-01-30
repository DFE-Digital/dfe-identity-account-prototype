const _ = require('lodash')

module.exports = router => {

  router.post('/sign-in/email', (req, res) => { res.redirect('/sign-in/email-code') })

  router.post('/sign-in/code-type', (req, res) => {
    if(req.session.data['codeType'] == 'email') {
      res.redirect('/sign-in/email-code')
    } else {
      res.redirect('/sign-in/phone-code')
    }
  })

  router.post('/sign-in/email-code', (req, res) => { res.redirect('/sign-in/finish') })
  router.post('/sign-in/phone-code', (req, res) => { res.redirect('/sign-in/finish') })


  router.post('/sign-in/finish', (req, res) => { res.redirect('/auth/return-to-service') })

  router.post('/sign-in/resend-email', (req, res) => { res.redirect('/sign-in/email-code') })


  


}
