# Eve Character Viewer

Dummy application to learn how to use the Eve Online ESI API.


## Roadmap

+ Implement a working authentication flow (The official doc is [here](https://eveonline-third-party-documentation.readthedocs.io/en/latest/sso/authentication.html))
+ Retrieve the `Character ID` from the CCP servers
+ Retrieve data from the API (List of routes [here](https://esi.evetech.net/latest/?datasource=tranquility))

## How to use this repo

+ Register an application with CCP [here](https://developers.eveonline.com/applications)
+ Clone the repo: `git clone https://github.com/Kylir/eve-character-viewer.git`
+ Edit the configuration file `./config/config.js` to match your own Client ID, Callback URI and state
+ In the `config` folder create a file called `secret.js` with your application's secret key:

```js
exports.secretKey = 'XXXXXXXXX'
```

+ Install the dependencies: `npm install`
+ Run the server: `npm start`
+ Open a browser on the login page: `http://localhost/login.html`

