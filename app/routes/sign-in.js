const _ = require('lodash')

module.exports = router => {

  router.post('/sign-in/email', (req, res) => { res.redirect('/sign-in/email-code') })
  router.post('/sign-in/email-code', (req, res) => { res.redirect('/sign-in/finish') })


  router.post('/sign-in/finish', (req, res) => { res.redirect('../auth/apply-for-qts') })


  


}
