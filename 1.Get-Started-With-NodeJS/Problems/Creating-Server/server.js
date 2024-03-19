// Please don't change the pre-written code
// Import the necessary modules here

// Write your code here

// Import http library
const http = require("http");

// Create a server
const server = http.createServer((req, res) => {
  let url = req.url;

  // Send the response

  if (url == "/product") {
    res.end("You are in Product's Page.");
  } else if (url == "/users") {
    res.end("You are in User's page.");
  } else {
    res.end("Response recieved at port 8080.");
  }
});

// Specify the port number
server.listen(8080, () => {
  console.log("Your port started at 8080.");
});

module.exports = server;
