const got = require('got')
const express = require('express')
const config = require('./config.js')

const app = express()

// Static content
app.use(express.static('public'))

// Auth callback
app.get('/eve-auth-callback', (req, res) => {
  const queryCode = req.query.code
  const queryState = req.query.state //TODO: check the state for security

  if (queryState !== state) {
    res.status(400).json({'Error': 'There is a problem with the received state parameter.'})
  }

  console.log(`Received code as ${queryCode} and state as ${queryState}.`)

  const tokenUrl = 'https://login.eveonline.com/oauth/token'
  const body = {
    "grant_type":"authorization_code",
    "code":"gEyuYF_rf...ofM0"
  }

  res.send()
})

app.listen(80, () => console.log('Example app listening on port 80!'))

