const _ = require('lodash')

module.exports = router => {


  router.post('/qts/create-account-sign-in', (req, res) => {
    if(req.session.data['eligibility'] == 'true') {
      res.redirect('/qts/eligibility/question-country')
    } else {
      res.redirect('/qts/tsa/sign-in/interstitial')
    }
  })

  // Eligibility
  router.post('/qts/eligibility/question-country', (req, res) => { res.redirect('/qts/eligibility/question-formal-training') })
  router.post('/qts/eligibility/question-formal-training', (req, res) => { res.redirect('/qts/eligibility/question-degree') })
  router.post('/qts/eligibility/question-degree', (req, res) => { res.redirect('/qts/eligibility/question-special-educational-needs') })
  router.post('/qts/eligibility/question-special-educational-needs', (req, res) => { res.redirect('/qts/eligibility/question-work-experience') })
  router.post('/qts/eligibility/question-work-experience', (req, res) => { res.redirect('/qts/eligibility/question-misconduct') })
  router.post('/qts/eligibility/question-misconduct', (req, res) => { res.redirect('/qts/eligibility/eligible') })
  
  
  // Create account
  router.post('/qts/tsa/auth/email', (req, res) => { res.redirect('/qts/tsa/auth/email-code') })
  router.post('/qts/tsa/auth/email-code', (req, res) => { res.redirect('/qts/tsa/auth/phone') })
  router.post('/qts/tsa/auth/phone', (req, res) => { res.redirect('/qts/tsa/auth/phone-code') })
  router.post('/qts/tsa/auth/phone-code', (req, res) => { res.redirect('/qts/tsa/auth/name') })
  router.post('/qts/tsa/auth/name', (req, res) => { res.redirect('/qts/tsa/auth/date-of-birth') })
  router.post('/qts/tsa/auth/date-of-birth', (req, res) => { res.redirect('/qts/tsa/auth/finish') })

  // sign in
  router.post('/qts/tsa/sign-in/interstitial', (req, res) => { res.redirect('/qts/tsa/sign-in/email') })
  router.post('/qts/tsa/sign-in/email', (req, res) => { res.redirect('/qts/tsa/sign-in/code-type') })
 
  router.post('/qts/tsa/sign-in/code-type', (req, res) => {
    if(req.session.data['codeType'] == 'email') {
      res.redirect('/qts/tsa/sign-in/email-code')
    } else {
      res.redirect('/qts/tsa/sign-in/phone-code')
    }
  })
  router.post('/qts/tsa/sign-in/phone-code', (req, res) => { res.redirect('/qts/tsa/sign-in/finish') })
  router.post('/qts/tsa/sign-in/email-code', (req, res) => { res.redirect('/qts/tsa/sign-in/finish') })
  router.post('/qts/tsa/sign-in/finish', (req, res) => { res.redirect('/qts/apply-for-qts') })



  // Account details
  router.post('/qts/tsa/auth/finish', (req, res) => { res.redirect('/qts/apply-for-qts') })


  


}
