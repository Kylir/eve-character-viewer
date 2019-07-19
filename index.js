const got = require('got')
const express = require('express')
const session = require('express-session')
const jwt = require('jsonwebtoken')

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

  const queryCode = req.query.code
  const queryState = req.query.state
  
  if (queryState !== config.state) {
    res.status(400).json({ 'Error': 'Problem with the received state parameter:' + queryState })
  } else if (!queryCode) {
    res.status(500).json({ 'Error': 'Did not receive the code parameter.' })
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

    // Contact eve online server to get a JSON Token
    got(tokenUrl, options).then((response) => {
      return response.body

    }).then(body => {
      return new Promise(function (resolve, reject) {
        const tokens = JSON.parse(body)
        // Check for missing info
        if (!tokens.access_token) {
          reject(new Error(`No access_token in the response body: ${tokens}`))
        }

        // Decode the token or fail
        let decoded
        try {
          decoded = jwt.decode(tokens.access_token)
        } catch (err) {
          reject(err)
        }

        resolve({ decoded, tokens })
      })

    }).then(authInfo => {
      //Save info in the session object
      req.session.authInfo = authInfo

      //Redirect to main page
      res.redirect('./')

      // Retrieve some data from ESI!
      const characterId = authInfo.decoded.sub.split(':')[2]
      const walletUrl = `https://esi.evetech.net/latest/characters/${characterId}/wallet`
      const authString = `Bearer ${authInfo.tokens.access_token}`
      const options = {
        headers: {
          'Authorization': authString,
          'Content-Type': 'application/json',
        }
      }
      // Send the query to the server
      return got(walletUrl, options)

    }).then(response => {
      // What did we receive?
      console.log('Received wallet response:')
      console.log(response.body)

      res.json(response.body)
    }).catch((error) => {
      console.log('error: ' + error)
      res.status(500).json(error)
    })
  }
})

app.listen(80, () => console.log('Example app listening on port 80!'))

