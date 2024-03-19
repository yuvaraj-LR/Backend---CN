import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {

    // 1. Get token from header.
    let token = req.headers["authorization"];
    console.log(token, "tokennnn");

    // 2. Send unauthorized if there is no token.
    if(!token) {
        return res.status(401).send("You are unauthorized!!!");
    }

    try {
        // 3. Check for the user 
        const data = jwt.verify(token, process.env.JWT_SCRETE);
        req.userIdJWT = data.userId;

        if(!data) {
            return res.status(402).send("token is invalid!!!");
        }

    // 4. Catch if the error is in token.
    } catch(err) {
        console.log(err);
        return res.status(402).send("Credentials are wrong!!!");
    }

    // If success, show others api's response.
    next();
}

export default jwtAuth;