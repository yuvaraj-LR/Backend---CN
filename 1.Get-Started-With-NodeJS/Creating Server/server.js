// Import http library
const http = require("http");

// Create a server 
const server = http.createServer((req, res) => {
    
    // Send the response
    res.end("Welcome to Yuvaraj's server");
})

// Specify the port number
server.listen(5173, () => {
    console.log("Server is Listening on localhost:3100");
});