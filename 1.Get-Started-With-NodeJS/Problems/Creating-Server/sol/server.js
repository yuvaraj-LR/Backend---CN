// Please don't change the pre-written code
// Import the necessary modules here

// Write your code here


    // Import http library
    const http = require("http");

    // Create a server
    const server = http.createServer((req, res) => {
    // Send the response
    res.end("Response recieved at port 8080.");
    });

    // Specify the port number
    server.listen(8080, () => {
    });

    module.exports = server;

