const _ = require('lodash')

module.exports = router => {

  
  router.post(['/account/name'], (req, res, next) => {
    const data = req.session.data
    data.alert = 'show'
    data.alertType = 'name'
    data.editType = 'name',
    req.session.data['fullName'] = `${req.body['firstName']} ${req.body['lastName']}`
    res.redirect('/account/check-answers')
  })


  router.post(['/account/email'], (req, res, next) => {
    const data = req.session.data
    data.alert = 'show'
    data.alertType = 'email'
    data.matchAccountEmail = 'false' 
    res.redirect('/account/email-code')
  })
  router.post(['/account/email-code'], (req, res, next) => {
    res.redirect('/account/account-details')
  })

  router.post('/account/resend-email', (req, res) => { res.redirect('/account/email-code') })
  router.post('/account/resend-phone', (req, res) => { res.redirect('/account/phone-code') })

  router.post(['/account/date-of-birth'], (req, res, next) => {
    const data = req.session.data
    data.alert = 'show'
    data.editType = 'dob',
    data.alertType = 'date of birth'
    res.redirect('/account/check-answers')
  })

  router.post(['/account/phone'], (req, res, next) => {
    const data = req.session.data
    data.alert = 'show'
    data.alertType = 'mobile phone'
    res.redirect('/account/phone-code')
  })

  router.post(['/account/phone-code'], (req, res, next) => {
    res.redirect('/account/account-details')
  })

  router.post(['/account/name-dqt'], (req, res, next) => {
    const data = req.session.data
    data.alert = 'show'
    data.alertType = 'name',
    data.editType = 'name-dqt',
    req.session.data['fullNameDQT'] = `${req.body['firstNameDQT']} ${req.body['lastNameDQT']}`
    data.nameLozenge = 'show'
    res.redirect('/account/evidence')
  })

  router.post('/account/evidence', (req, res) => { 
    res.redirect('/account/check-answers') 
  })
  router.post('/account/check-answers', (req, res) => { 
    const data = req.session.data
    data.alert = 'show'
    res.redirect('/account/account-details') 
  })
}
