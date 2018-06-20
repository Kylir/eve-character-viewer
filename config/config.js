const secretKey = require('./secret')

const config = {
  eveAuthBaseUrl: 'https://login.eveonline.com/oauth/authorize',
  scopes: [
    'publicData',
    'esi-skills.read_skills.v1',
    'esi-skills.read_skillqueue.v1',
    'esi-wallet.read_character_wallet.v1'
  ],
  redirectUri: 'http://localhost/eve-auth-callback',
  clientID: '631b257a6b904b9e8a3d96f93720b189',
  secretKey,
  state: 'waikyhanghang',
  parameters: [
    'response_type=code',
    'redirect_uri=' + redirectUri,
    'client_id=' + clientID,
    'scope=' + scopes.join(' '),
    'state=' + state
  ]
}

exports = config