// Importing the express module.
const express = require("express");

// Create the server.
const server = express();

// Create the method. 
server.get("/", (req, res) => {
    res.send("Welcome to Yuvaraj's Express server.");
});

// Create the listener.
server.listen(3100, ()=> {
    console.log("Server is listen on 3100.");
});