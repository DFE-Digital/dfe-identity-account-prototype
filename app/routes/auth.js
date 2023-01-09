const _ = require('lodash')

module.exports = router => {

  router.post('/auth/details', (req, res) => { res.redirect('/auth/email') })
  router.post('/auth/email', (req, res) => { res.redirect('/auth/email-code') })
  router.post('/auth/email-code', (req, res) => { res.redirect('/auth/name') })
  router.post('/auth/name', (req, res) => { res.redirect('/auth/date-of-birth') })
  router.post('/auth/date-of-birth', (req, res) => { res.redirect('/auth/check-answers') })
  router.post('/auth/check-answers', (req, res) => { res.redirect('/auth/details-finish') })
  router.post('/auth/details-finish', (req, res) => { res.redirect('/auth/apply-for-qts') })

  

}
