const got = require('got')
const express = require('express')
const config = require('./config/config').config
const utils = require('./utils')

const app = express()

// Static content
app.use(express.static('public'))

// Auth callback
app.get('/eve-auth-callback', (req, res) => {
  const queryCode = req.query.code
  const queryState = req.query.state //TODO: check the state for security

  console.log(`Received code ${queryCode} and state ${queryState}`)

  if (queryState !== config.state) {
    res.status(400).json({'Error': 'Problem with the received state parameter:' + queryState})
  } else if (!queryCode) {
    res.status(500).json({'Error': 'Did not receive the code parameter.'})
  } else {
    const tokenUrl = 'https://login.eveonline.com/oauth/token'
    const authString = 'Basic ' + utils.authString(config.clientID, config.secretKey)
    const body = JSON.stringify({'grant_type': 'authorization_code', 'code': queryCode})
    const options = {
      auth: authString,
      body,
      headers: {
        'Authorization': authString,
        'Content-Type': 'application/json',
        'Host': 'login.eveonline.com'
      }
    }
    
    console.log(`POST ${tokenUrl} with options: ${JSON.stringify(options)}`)

    got(tokenUrl, options).then((response) => {
      res.json(response.body)
    }).catch((error) => {
      console.log('error: ' + error)
      res.status(500).json(error)
    })
  }
})

app.listen(80, () => console.log('Example app listening on port 80!'))

