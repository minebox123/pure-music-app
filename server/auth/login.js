const express = require("express");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.json({
//     msg: "works"
//   });
// });

router.get("/", (req, res) => {
  const scopes = "user-read-private user-read-email";
  const clientId = "364f3c110b6b4117adeae83fc568d938";
  const redirectURI = "http://localhost:8888/callback";
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectURI}`
  );
});

router.get("/callback", (req, res) => {
  console.log(req.query.code);
});

module.exports = router;
