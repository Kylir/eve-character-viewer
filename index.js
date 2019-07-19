const got = require('got')
const express = require('express')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const nodeUtil = require('util')
const verify = nodeUtil.promisify(jwt.verify)

const config = require('./config/config').config
const utils = require('./src/utils')

const app = express()

// User session to store the tokens
app.use(session({
  secret: 'GyKeQINbGQ2xlIQt0A7l7ClHmuc9PZ7aatix2P4uNK',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } //should be true but would work only on https servers TODO
}))

// Static content
app.use(express.static('public'))

// Auth callback from Eve
app.get('/eve-auth-callback', (req, res) => {

  if (req.session) {
    console.log(req.session)
  }

  const queryCode = req.query.code
  const queryState = req.query.state //TODO: check the state for security

  console.log(`Received code ${queryCode} and state ${queryState}`)

  if (queryState !== config.state) {
    res.status(400).json({'Error': 'Problem with the received state parameter:' + queryState})
  } else if (!queryCode) {
    res.status(500).json({'Error': 'Did not receive the code parameter.'})
  } else {
    const tokenUrl = 'https://login.eveonline.com/v2/oauth/token'
    const authString = 'Basic ' + utils.authString(config.clientID, config.secretKey)
    const body = `grant_type=authorization_code&code=${queryCode}`
    const options = {
      auth: authString,
      body,
      headers: {
        'Authorization': authString,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Host': 'login.eveonline.com'
      }
    }
    
    console.log(`POST ${tokenUrl} with options: ${JSON.stringify(options)}`)

    // Contact eve online server to get a JSON Token
    got(tokenUrl, options).then((response) => {
      console.log(`Body received from ${tokenUrl}:`)
      console.log(response.body)
      return response.body
    }).then(body => {
      const tokens = JSON.stringify(body)
      //Verify the tokens
      if (!tokens.access_token) {
        throw new Error(`No access_token in the response body: ${tokens}`)
      }
      return verify(tokens.access_token, utils.getKeyFromEve)
    }).then(verified => {
      console.log(verified)
      res.json(verified)
    }).catch((error) => {
      console.log('error: ' + error)
      res.status(500).json(error)
    })
  }
})

app.get('/public-data', (req, res) => {
  console.log('bla')
})

app.listen(80, () => console.log('Example app listening on port 80!'))

