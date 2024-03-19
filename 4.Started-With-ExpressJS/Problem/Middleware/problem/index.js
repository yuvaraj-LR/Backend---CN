// Please don't change the pre-written code.

const express = require("express");
const app = express();

const logRequest = (re1, res, next) => {
  // Write your code here
  console.log("GET");
  console.log("/");
  next();
};

app.use(logRequest)

app.get("/", (req, res) => {
  res.send("Coding Ninjas!");
});

module.exports = app;
