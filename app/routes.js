// 
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
// 

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const _ = require('lodash')
const url = require('url')
const { faker } = require('@faker-js/faker')


// Catch all route
router.all('*', function(req, res, next){

  // Send query string to locals
  let hasQuery = !_.isEmpty(req.query)
  if (hasQuery) {
    res.locals.query = req.query
    res.locals.queryString = url.format({
      query: req.query,
    })
  }

  // Setting to let us hide the query string
  if (req?.query?.clearQuery){
    let requestedUrl = url.parse(req.url).pathname
    delete req?.session?.data?.clearQuery
    res.redirect(requestedUrl)
  }
  else {
    next()
  }

})

// Clear user when on prototype index
router.get('/', (req, res) => {
  const data = req.session.data
  delete data.user
  res.render('index', data)
})

// Clear user when on prototype index
router.get('/clear', (req, res) => {
  req.session.data = {}
  
  // redirect to referring url
  let referringUrl = req.get('Referrer')

  res.redirect(referringUrl || '/')
})


// A user from dqt is invited to ID
router.get('/invite/:uuid', (req, res) => {
  const data = req.session.data
  const uuid = req.params.uuid
  delete data.user

  if (!uuid){
    res.redirect('/')
  }
  else {
    let dqtUser = data.dqtUsers.find(user => user.id == uuid)
    if (dqtUser){
      data.user = {
        ...dqtUser,
        id: faker.datatype.uuid(),
        dqtUser
      }
      res.redirect('/auth/emails/qts-email')
    }
    else {
      console.log(`User ${uuid} could not be found`)
      res.redirect('/')
    }
  }
})


// Add your routes here
require('./routes/auth-lite')(router)
require('./routes/account-flow')(router)
require('./routes/sign-in')(router)
require('./routes/qts-routes')(router)
require('./routes/qual-routes')(router)
require('./routes/npq-routes')(router)

router.post('/recieved-data', (req, res) => {
    req.session.data['account-data'] = JSON.parse(req.body['account-data'])
    res.redirect('/v3/dashboard/index')
})


