/**
 * Do a base 64 encoding with the token and the secret key.
 */
exports.authString = function (clientID, secretKey) {
  return Buffer.from(clientID + ':' + secretKey).toString('base64')
}

exports.getKeyFromEve = function () {
  return {
    "keys": [
      {
        "alg": "ES256",
        "crv": "P-256",
        "kid": "0C0029DE-B898-4EFC-8586-DD4AA948AE22",
        "kty": "EC",
        "use": "sig",
        "x": "cRs59CHa39w6m48qqhqygXNXLmAbfp8yteQTjGBie9I",
        "y": "Sm7nSOWIqLc8xMK5CRhEiePi9iNukStXhssrYdSiMk0"
      },
      {
        "alg": "RS256",
        "e": "AQAB",
        "kid": "JWT-Signature-Key",
        "kty": "RSA",
        "n": "nehPQ7FQ1YK-leKyIg-aACZaT-DbTL5V1XpXghtLX_bEC-fwxhdE_4yQKDF6cA-V4c-5kh8wMZbfYw5xxgM9DynhMkVrmQFyYB3QMZwydr922UWs3kLz-nO6vi0ldCn-ffM9odUPRHv9UbhM5bB4SZtCrpr9hWQgJ3FjzWO2KosGQ8acLxLtDQfU_lq0OGzoj_oWwUKaN_OVfu80zGTH7mxVeGMJqWXABKd52ByvYZn3wL_hG60DfDWGV_xfLlHMt_WoKZmrXT4V3BCBmbitJ6lda3oNdNeHUh486iqaL43bMR2K4TzrspGMRUYXcudUQ9TycBQBrUlT85NRY9TeOw",
        "use": "sig"
      }
    ],
    "SkipUnresolvedJsonWebKeys": true
  }
}