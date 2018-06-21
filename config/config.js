// Create this file with your own private key
// the content should be:
// exports.secretKey = 'paste your secret key here'
const secretKey = require('./secret').secretKey

// These three parameters should be changed to match your own application
const appCallbackUri = 'http://localhost/eve-auth-callback'
const appClientID = '631b257a6b904b9e8a3d96f93720b189'
const appState = 'waikyhanghang'

// The scopes you registered - tweak as needed
const scopes = [
  'publicData',
  'esi-skills.read_skills.v1',
  'esi-skills.read_skillqueue.v1',
  'esi-wallet.read_character_wallet.v1'
]

exports.config = {
  eveAuthBaseUrl: 'https://login.eveonline.com/oauth/authorize',
  secretKey,
  state: appState,
  clientID: appClientID,
  parameters: [
    'response_type=code',
    'redirect_uri=' + appCallbackUri,
    'client_id=' + appClientID,
    'scope=' + scopes.join(' '),
    'state=' + appState
  ]
}
