const _ = require('lodash')
const utils = require('./../lib/utils')

module.exports = router => {


  router.get('/auth/start', (req, res) => { 
    const data = req.session.data

    let user = data.user || {}

    let emailIsEducationDomain = utils.emailIsEducationDomain(user?.email)

    if (emailIsEducationDomain){
      res.redirect('/auth/institution-email')
    }
    else {
      res.redirect('/auth/phone')
    }
  })

  router.post('/auth/email', (req, res) => {
    const data = req.session.data
    if(req.session.data?.user?.email == 'head@school.com') {
      const data = req.session.data
      data.errorMessage = 'true'
      res.redirect('/auth/email')
    } else {
      data.matchAccountEmail = 'false'
      data.errorMessage = 'false'
      res.redirect('/auth/email-code')     
    }
    })

  router.post('/auth/institution-email', (req, res) => {
    const data = req.session.data

    if (data.user.changeEmail == 'yes'){
      
      data.user.email = data.user.newEmail
      delete data.user.changeEmail
      delete data.user.newEmail
      res.redirect('/auth/email-code')   
    }
    else {
      delete data.user.changeEmail
      res.redirect('/auth/phone')
    }
    })

  router.post('/auth/email-code', (req, res) => {
    // if(req.session.data['email'] == 'existing@email.com') {
    //   const data = req.session.data
    //   data.phoneMatch = 'false'
    //   data.matchAccount = 'true'
    //   res.redirect('/auth/sign-in-interstitial')
    // } else if(req.session.data['emailAuth'] == 'true') {
    //   // res.redirect('/auth/check-answers')
    //   res.redirect('/auth/phone')
    // } else {
    //   res.redirect('/auth/phone')
    // }
    const data = req.session.data

    if (data?.user?.phone){
      res.redirect('/auth/check-answers')
    }
    else {
      res.redirect('/auth/phone')
    }
  })
  router.post('/auth/sign-in-interstitial', (req, res) => { res.redirect('/sign-in/finish') })

  router.get('/auth/finish', (req, res) => {

    const data = req.session.data

    const currentDomain = _.clone( `${req.protocol}://${req.get('host')}` )

    // currentDomain = 'http://localhost:5000'

    let identityAccountUrl = `${currentDomain}/user-research/qual/account`

    console.log(identityAccountUrl)

    res.render('auth/finish', {
      identityAccountUrl: identityAccountUrl
    })
  })

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
    // else if(req.session.data['phone'] == '07827999618') {
    //   const data = req.session.data
    //   data.phoneMatch = 'true'
    //   data.matchAccount = 'true'
    //   res.redirect('/auth/sign-in-interstitial')
    // } 

    else {
      if (data.user.preferredName){
        res.redirect('/auth/check-answers')
      }
      else res.redirect('/auth/preferred-name')
    }

  })

  let updatePreferredName = user => {

    let preferredName = user.preferredName

    if (preferredName == 'custom'){
      user.preferredName = user.preferredNameCustom
      delete user.preferredNameCustom
    }

    return user

  }

  router.post('/auth/preferred-name', (req, res) => {
    const data = req.session.data

    data.user = updatePreferredName(data.user)

    if (!data.user.preferredName){
      res.redirect('/auth/preferred-name')
    }
    else {
      res.redirect('/auth/check-answers')
    }

  })

  router.post('/auth/update-preferred-name', (req, res) => {
    const data = req.session.data

    data.user = updatePreferredName(data.user)

    if (!data.user.preferredName){
      res.redirect('/auth/update-preferred-name')
    }
    else {
      res.redirect('/auth/check-answers')
    }

  })


  router.post(['/auth/name'], (req, res, next) => {
    // req.session.data['fullName'] = `${req.body['firstName']} ${req.body['lastName']}`
    // if(req.session.data['emailAuth'] == 'true') {
    //   res.redirect('/auth/check-answers')
    //   // res.redirect('/auth/date-of-birth')
    // } else {
    //   res.redirect('/auth/date-of-birth')    }

    res.redirect('/auth/update-preferred-name')
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

  // const nameHasChanged = (previousUser, newUser) => {
  //   const normaliseName = name => name.toLowerCase().trim()

  //   let names = ['firstNames', 'middleNames', 'lastNames']

  //   let anyChanged = names.some(name => normaliseName(previousUser[name]) != normaliseName(newUser[name]))

  //   return anyChanged
  // }

  // const dateOfBirthHasChanged = (previousUser, newUser) => {

  //   let previousDate = new Date(previousUser.dateOfBirth)
  //   let newDate = new Date(newUser.dateOfBirth)

  //   // Normalise timestamps
  //   previousDate.setHours(0,0,0,0)
  //   newDate.setHours(0,0,0,0)

  //   return previousDate.getTime() != newDate.getTime()
  // }

  router.post('/auth/check-answers', (req, res) => { 
    const data = req.session.data

    let nameChanged = utils.nameHasChanged(data.user, data.user.dqtUser)

    let dateOfBirthChanged = utils.dateOfBirthHasChanged(data.user, data.user.dqtUser)

    if (nameChanged || dateOfBirthChanged){
      res.redirect('evidence-needed')
    }
    else {
      res.redirect('/auth/create') 
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

  router.post('/auth/evidence-later', (req, res) => { res.redirect('/auth/create') })
  router.post('/auth/evidence-in-review', (req, res) => { res.redirect('/auth/create') })


  router.post('/auth/evidence', (req, res) => { res.redirect('/auth/evidence-in-review') })

  router.get('/auth/create', (req, res) => {
    const data = req.session.data
    const user = data.user

    let existingUserIndex = data.users.findIndex(existingUser => user.id == existingUser.id)
    if (existingUserIndex > 0) {
      console.log(`Existing user (${existingUserIndex} found, overwritting`)
      data.users[existingUserIndex] = user
    }
    else {
      data.users.push(user)
    }

    res.redirect('/auth/finish') 
  })

  router.post('/auth/finish', (req, res) => { res.redirect('/auth/return-to-service') })

  router.post('/auth/phone', (req, res) => { res.redirect('/auth/phone-code') })

  router.post('/auth/preferred-name', (req, res) => { res.redirect('/auth/check-answers') })
  router.post('/auth/phone-radio', (req, res) => { res.redirect('/auth/phone-code') })

}
