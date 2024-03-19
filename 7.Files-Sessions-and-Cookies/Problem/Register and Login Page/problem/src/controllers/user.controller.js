// Please don't change the pre-written code
// Import the necessary modules here

// import UserModel from "../models/user.model.js"

import { users, registerUser, authenticateUser } from "../models/user.model.js";

export default class UserController {
  getRegister = (req, res, next) => {
    // Write your code here
    res.render("user-register");
  };
  getLogin = (req, res, next) => {
    // Write your code here
    res.render("user-login");
  };
  addUser = (req, res) => {
    // Write your code here
    // let {name, email, password} = req.body;
    // let id = users.length + 1;

    // let newObj = {
    //   id,
    //   name, 
    //   email, 
    //   password
    // }
    // registerUser(newObj);
    // res.render("user-login");

    const status = registerUser(req.body);

    if(status) {
      return res.render("user-login");
    };
  };


  loginUser = (req, res) => {
    // Write your code here
    // let {email, password} = req.body;

    // let newObj = {
    //   email,
    //   password
    // }

    // let loginStatus = authenticateUser(newObj);

    // if(loginStatus) {
    //   console.log("success: true");
    //   console.log("message: login successfully");
    // } else {
    //   console.log("success: false");
    //   console.log("message: login failed");
    // }

    const isAuth = authenticateUser(req.body);

    if(isAuth) {
      return res.send({success: "true", message: "login successfully" })
    } else {
      return res.send({success: "false", message: "login failed"})
    }
  };
}
