const _ = require('lodash')

module.exports = router => {


  router.post('/qts/create-account-sign-in', (req, res) => {
    if(req.session.data['eligibility'] == 'true') {
      res.redirect('/qts/eligibility/question-country')
    } else {
      res.redirect('/sign-in/interstitial')
    }
  })

  // Eligibility
  router.post('/qts/eligibility/question-country', (req, res) => { res.redirect('/qts/eligibility/question-formal-training') })
  router.post('/qts/eligibility/question-formal-training', (req, res) => { res.redirect('/qts/eligibility/question-degree') })
  router.post('/qts/eligibility/question-degree', (req, res) => { res.redirect('/qts/eligibility/question-special-educational-needs') })
  router.post('/qts/eligibility/question-special-educational-needs', (req, res) => { res.redirect('/qts/eligibility/question-work-experience') })
  router.post('/qts/eligibility/question-work-experience', (req, res) => { res.redirect('/qts/eligibility/question-misconduct') })
  router.post('/qts/eligibility/question-misconduct', (req, res) => { res.redirect('/qts/eligibility/eligible') })
  

  // sign in
  router.post('/sign-in/interstitial', (req, res) => { res.redirect('/user-research/qts/sign-in') })


  // task list
  router.post('/qts/personal-information/name-and-dob', (req, res) => { res.redirect('/qts/personal-information/question-current-legal-name') })
  router.post('/qts/personal-information/question-current-legal-name', (req, res) => { res.redirect('/qts/personal-information/personal-information-summary') })
  router.post('/qts/personal-information/personal-information-summary', (req, res) => { 
    const data = req.session.data
    data.completed = 'true'
    res.redirect('/qts/apply-for-qts') 
  })



}
