import UserModel from "../features/users/users.model.js";

const basicAuthorizer = (req, res, next) => {
    // 1. Check for the authorization.
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

    const users = UserModel.getAll().find(u => u.email == creds[0] && u.password == creds[1]);
    if(users) {
        next();
    } else {
        return res.status(401).send("Invalid Credentails.")
    }
}

export default basicAuthorizer;