const _ = require('lodash')

module.exports = router => {

  
  router.post(['/account/name'], (req, res, next) => {
    req.session.data['fullName'] = `${req.body['firstName']} ${req.body['lastName']}`
    res.redirect('/account/account-details')
  })

  router.post(['/account/email'], (req, res, next) => {
    res.redirect('/account/email-code')
  })
  router.post(['/account/email-code'], (req, res, next) => {
    res.redirect('/account/account-details')
  })
  router.post(['/account/date-of-birth'], (req, res, next) => {
    res.redirect('/account/account-details')
  })

  router.post(['/account/phone'], (req, res, next) => {
    res.redirect('/account/phone-code')
  })
  router.post(['/account/phone-code'], (req, res, next) => {
    res.redirect('/account/account-details')
  })
}
