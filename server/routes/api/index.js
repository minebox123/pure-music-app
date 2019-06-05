const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/", (req, res) => {
  res.render("index/welcome");
});

router.get("/homepage", (req, res) => {
  fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${req.query.access_token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      res.render("index/homepage", {
        data: data
      });
    });
});

module.exports = router;
