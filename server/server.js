const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const login = require("./auth/login");

const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Test
app.get("/", (req, res) => {
  res.json({
    msg: "works"
  });
});

// app.use("/login", login);

app.get("/login", (req, res) => {
  const scopes = "user-read-private user-read-email";
  const clientId = "364f3c110b6b4117adeae83fc568d938";
  const redirectURI = "http://localhost:8888/callback";
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectURI}`
  );
});

app.get("/callback", (req, res) => {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: req.query.code,
      redirect_uri: "http://localhost:8888/callback",
      grant_type: "authorization_code"
    },
    headers: {
      Authorization: `Basic ${new Buffer.from(
        "364f3c110b6b4117adeae83fc568d938:a0bcffa947ae44d2a6298daa1e8be870"
      ).toString("base64")}`
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    const access_token = body.access_token;
    const refresh_token = body.refresh_token;

    const options = {
      url: "https://api.spotify.com/v1/me",
      headers: { Authorization: `Bearer ${access_token}` },
      json: true
    };

    request.get(options, (error, response, body) => {
      res.json({
        body
      });
    });
  });
});

const port = process.env.PORT || 8888;

app.listen(port, () => console.log(`Server works on port ${port}`));
