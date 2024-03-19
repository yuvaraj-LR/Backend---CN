// Please don't change the pre-written code

const express = require("express");
const server = express();

// Write your code here
server.post("/", (req, res) => {
    res.send("post");
})

server.get("/", (req, res) => {
    res.send("get");
})

server.put("/", (re1, res) => {
    res.send("put");
})

server.delete("/", (req, res) => {
    res.send("delete");
})

module.exports = server;
