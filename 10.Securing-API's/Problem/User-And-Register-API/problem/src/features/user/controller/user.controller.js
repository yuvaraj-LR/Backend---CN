// Please don't change the pre-written code
// Import the necessary modules here
import { addUser, confirmLogin } from "../model/user.model.js";

export const registerUser = (req, res, next) => {
  // Write your code here
  let datas = req.body;
  let usersData = addUser(datas);

  res.status(200).send(usersData);
};

export const loginUser = (req, res) => {
  // Write your code here
  let datas = req.body;
  let hasUserLoggedIn = confirmLogin(datas);

  if(!hasUserLoggedIn) {
    return res.status(401).send("Login Failed!!!")
  } else {
    return res.status(200).send("Login Successful!!!")
  }
};
