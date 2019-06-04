const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`<h1>Hello</h1>`);
});

const port = 8888;

app.listen(port, () => console.log(`Server works on port ${port}`));
