// Please don't change the pre-written code
// Import the necessary modules here

import { getAllUsers } from "../features/user/model/user.model.js";

const basicAuthMiddleware = (req, res, next) => {
  // Write your code here
  const authHeader = req.headers["authorization"];
  console.log(authHeader, "authHeader");

  if(!authHeader) {
      return res.status(401).send("You are not authorized.")
  }

  // 2. Extract the Credentials.
  const base64Credentials = authHeader.replace("Basic ", "");
  console.log(base64Credentials, "base64 valueeee");

  // 3.Decode the Credentials.
  const decodedCreds = Buffer.from(base64Credentials, "base64").toString("utf8");
  console.log(decodedCreds, "decodedCredssss");

  // 4.Check for creds.
  const creds = decodedCreds.split(":");

  const users = getAllUsers().find(u => u.email == creds[0] && u.password == creds[1]);
  if(users) {
      next();
  } else {
      return res.status(401).send("Invalid Credentails.")
  }
};

export default basicAuthMiddleware;
