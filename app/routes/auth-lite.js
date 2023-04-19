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
    const data = req.session.data

    let phoneCode = data?.temp?.phoneCode

    if (!phoneCode || phoneCode.length != 5){
      console.log("Phone code missing or incorrect")
      res.redirect('/auth/phone-code')
    }
    // Ed todo: this is probably broken now as I have changed the mobile numbers in use
    else if(req.session.data['phone'] == '07827999618') {
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
      res.redirect('/auth/check-answers')
      // res.redirect('/auth/date-of-birth')
    } else {
      res.redirect('/auth/date-of-birth')    }
   
  })

  router.post('/auth/date-of-birth', (req, res) => { 
    if(req.session.data['fullName'] == 'Dave Smith') {
      res.redirect('/auth/check-account')
    } else if (req.session.data['dqtCheck'] != 'false') {
      res.redirect('/auth/have-nino')
    } else if(req.session.data['emailAuth'] == 'true') {
      res.redirect('/auth/check-answers')
      // res.redirect('/auth/phone')

    }  else {
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

  const checkNameChanges = (previousUser, newUser) => {
    const normaliseName = name => name.toLowerCase().trim()

    let names = ['firstNames', 'middleNames', 'lastNames']

    let anyChanged = names.some(name => normaliseName(previousUser[name]) != normaliseName(newUser[name]))

    return anyChanged
  }

  const checkDateOfBirthChange = (previousUser, newUser) => {

    let previousDate = new Date(previousUser.dateOfBirth)
    let newDate = new Date(newUser.dateOfBirth)

    // Normalise timestamps
    previousDate.setHours(0,0,0,0)
    newDate.setHours(0,0,0,0)

    return previousDate.getTime() != newDate.getTime()
  }

  router.post('/auth/check-answers', (req, res) => { 
    const data = req.session.data

    let nameChanged = checkNameChanges(data.user, data.user.dqtUser)

    let dateOfBirthChanged = checkDateOfBirthChange(data.user, data.user.dqtUser)

    if (nameChanged || dateOfBirthChanged){
      res.redirect('evidence-needed')
    }
    else {
      res.redirect('/auth/finish') 
    }

  })

  // 
  router.post('/auth/evidence-needed', (req, res) => {
    const data = req.session.data
    console.log(data.user)
    let provideEvidence = (data?.user?.provideEvidence == 'no') ? false : true

    if (provideEvidence){
      res.redirect('evidence')
    }
    else {
      res.redirect('evidence-later') 
    }
  })

  router.post('/auth/evidence-later', (req, res) => { res.redirect('/auth/finish') })
  router.post('/auth/evidence-in-review', (req, res) => { res.redirect('/auth/finish') })


  router.post('/auth/evidence', (req, res) => { res.redirect('/auth/evidence-in-review') })

  router.post('/auth/finish', (req, res) => { res.redirect('/auth/return-to-service') })

  router.post('/auth/phone', (req, res) => { res.redirect('/auth/phone-code') })
  router.post('/auth/phone-radio', (req, res) => { res.redirect('/auth/phone-code') })

}
