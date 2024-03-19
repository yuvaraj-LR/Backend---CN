import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
    // 1. Get token from header
    let token = req.headers["authorization"];
    console.log(token, "jwtAuthToken");

    // 2. Send unauthorized if there is no token. 
    if(!token) {
        return res.status(401).send("Unauthorized Data!!!")
    }

    // Try to add the token in req.body
    try {
        // 3. Check for authorization,
        const data = jwt.verify(token, "mbpecDLJbs8ZCqLWUlH696M6H5RQVosP");
        
        req.userId = data.userId;

        if(!data) {
            return res.status(402).send("Token is invalid!!!")
        }
    } catch (err) {
        // 4. Catch if there is some error.
        console.log(err, "error in jwtAuth");
        return res.status(402).send("Credentails are wrong.");
    }

    next();
}

export default jwtAuth;