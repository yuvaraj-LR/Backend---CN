// // Please do not change the prewritten code

// import http from "http";
// import fs from "fs";

// const server = http.createServer((req, res) => {
//   //  Write your code here
//   if(req.method == "POST") {
//     let body = "";
    
//     req.on("data", (chunk) => {
//         body += chunk.toString();
//     });

//     fs.appendFile("data.txt", body, (err) => {
//       if (err) {
//         console.log("Failed to append the file. ", err);
//       } else {
//         req.on("end", () => {
//           console.log(body, "bodyy");
//           res.end("Data recieved Successfully.");
//         });
//       };
//     });

//     fs.readFile("data.txt", ({encoding: 'utf8'}), (err, data) => {
//       if (err) {
//         console.log("Failed to read the data. ", err);
//       } else {
//         console.log(data);
//       }
//     })

//   } else {
//     res.end("data not received");
//   }

// });

// export default server;

import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  if(req.method === "POST"){
    let data = "";

    req.on("data", (chunk) => {
      data += chunk.toString();
    });

    req.on("end", () => {
      fs.appendFileSync("data.txt", data);
      console.log(fs.readFileSync("data.txt", ({encoding: "utf8"})));
    })

    res.end("Data has recieved.")
  }
})


export default server;
