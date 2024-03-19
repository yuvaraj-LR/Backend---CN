// Please don't change the pre-written code
// Import the necessary modules here
import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  // Write your code here
  let token = req.cookies.jwtToken;
  console.log(token, "token from header.");

  if(!token) {
    return res.status(401).send({
      success: false, msg: "You are unAuthorized."
    })
  }

  try {
    let data = jwt.verify(token, "mbpecDLJbs8ZCqLWUlH696M6H5RQVosP")

    if(!data) {
      return res.status(401).send({
        success: false, msg:"Token is not valid."
      })
    }

  } catch(err) {
    return res.status(401).send({
      success: false, msg: err
    })
  }

  next();
};

export default jwtAuth;
