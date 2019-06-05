const express = require("express");
const router = express.Router();
const request = require("request");
const querystring = require("querystring");
const url = require("url");

// router.get("/", (req, res) => {
//   res.json({
//     msg: "works"
//   });
// });

router.get("/", (req, res) => {
  const scopes = "user-read-private user-read-email";
  const clientId = "364f3c110b6b4117adeae83fc568d938";
  const redirectURI = "http://localhost:8888/api/login/callback";
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectURI}`
  );
});

router.get("/callback", (req, res) => {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: req.query.code,
      redirect_uri: "http://localhost:8888/api/login/callback",
      grant_type: "authorization_code"
    },
    headers: {
      Authorization: `Basic ${Buffer.from(
        "364f3c110b6b4117adeae83fc568d938:a0bcffa947ae44d2a6298daa1e8be870"
      ).toString("base64")}`
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      const refresh_token = body.refresh_token;

      const options = {
        url: "https://api.spotify.com/v1/me",
        headers: { Authorization: `Bearer ${access_token}` },
        json: true
      };

      request.get(options, (error, response, body) => {});

      res.redirect(
        url.format({
          pathname: "/homepage",
          query: {
            access_token: access_token,
            refresh_token: refresh_token
          }
        })
      );
    } else {
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "invalid_token"
          })
      );
    }
  });
});

router.get("/refresh_token", (req, res) => {
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: `Basic ${Buffer.from(
        "364f3c110b6b4117adeae83fc568d938:a0bcffa947ae44d2a6298daa1e8be870"
      ).toString("base64")}`
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        access_token: access_token
      });
    }
  });
});

module.exports = router;
