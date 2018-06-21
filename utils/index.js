/**
 * Do a base 64 encoding with the token and the secret key.
 */
exports.authString = function (clientID, secretKey) {
  return Buffer.from(clientID + ':' + secretKey).toString('base64')
}

