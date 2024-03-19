// 1. import http.
const http = require("http");

// 2. create server.
const server = http.createServer((req, res) => {
    // Check for POST method.
    if(req.method == "POST") {
        let body = "";
        
        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            console.log(body, "bodyy");
            res.end("Data recieved Successfully.");
        });
    } else {
        res.end("Welcome to Yuvaraj's server.");
    }
});

// 3. add listener.
server.listen(8080, () => {
    console.log("Your server was hosted on 8080.");
})
