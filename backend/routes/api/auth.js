const router = require("express").Router();

var SpotifyWebApi = require('spotify-web-api-node');

var constants = require("../config/constants");

var spotifyApi = new SpotifyWebApi({
  clientId: constants.CLIENT_ID,
  clientSecret: constants.CLIENT_SECTET,
  redirectUri: constants.REDIRECT_URI
});

router.get("/", (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL([]));
});

router.post("/login", (req, res) => {
    const code = req.body.code;
    
    spotifyApi.authorizationCodeGrant(code).then((response) => {
        res.send(JSON.stringify({ access_token: response.body.access_token }));
    });
});

module.exports = router;