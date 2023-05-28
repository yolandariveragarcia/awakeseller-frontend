const crypto = require('crypto')

// The next two functions help us generate the code challenge
// required by Etsy’s OAuth implementation.
const base64URLEncode = (str) =>
  str
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')

const sha256 = (buffer) => crypto.createHash('sha256').update(buffer).digest()

// We’ll use the verifier to generate the challenge.
// The verifier needs to be saved for a future step in the OAuh flow.
const codeVerifier = base64URLEncode(crypto.randomBytes(32))

// With these functions, we can generate
// the values needed for our OAuth authorization grant.
const codeChallenge = base64URLEncode(sha256(codeVerifier))
const state = Math.random().toString(36).substring(7)

// ###### YOUR STUFF BELOW ######
// Bulk Lister 2.0 keystring
const clientId = process.env.ETSY_ID

// Redirect URI for my app
const redirectUri = 'https://localhost:3000/callback'

// Scope string
const scope = ''

// EXAMPLE: const scope = "listings_d%20listings_w%20listings_r%20";
// SCOPES REF IS HERE: https://developers.etsy.com/documentation/essentials/authentication#scopes

// ###### YOUR STUFF ABOVE ######

console.log(`State: ${state}`)
console.log(`Code challenge: ${codeChallenge}`)
console.log(`Code verifier: ${codeVerifier}`)
console.log(`Full URL: https://www.etsy.com/oauth/connect?response_type=code&redirect_uri=${redirectUri}&scope=${scope}&client_id=${clientId}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`)
