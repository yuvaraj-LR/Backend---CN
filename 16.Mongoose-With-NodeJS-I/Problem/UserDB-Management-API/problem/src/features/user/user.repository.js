// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

const UserModel = mongoose.model("user", userSchema);

export const userRegisterationRepo = async (userData) => {
  // Write your code here
  console.log(userData, "usersData....");
  let result;
  try {
    const newUser = new UserModel(userData);

    result = {
      success: true,
      res: userData
    }

    await newUser.save();

  } catch (error) { 
    result = {
      sucess: false,
      error: {
        statusCode: 400,
        msg: "Error in userRegiRepo"
      }
    }
    console.log(error, "error in userRegiRepo...");
  }

  return result;
};
export const userLoginRepo = async (userData) => {
  // Write your code here
  let result;

  try {
    let email = userData.email;
    let password = userData.password;

    let user = await UserModel.findOne({email, password});

    result = {
      success: true,
      res: user
    }

  } catch (error) {
    result = {
      success: false,
      error: {
        statusCode: 400,
        msg: "Error in userLoginReoi"
      }
    }
  }

  return result;
};

export const updateUserPasswordRepo = async (_id, newpassword, next) => {
  // Write your code here
  let result;

  try {
    let userData = await UserModel.findById(_id);
    console.log(userData, "userData...");

    if(userData) {
      userData.password = newpassword;
      userData.save();
      result = {
        success: true,
        res: userData
      }
    }
  } catch (error) {
    result = {
      sucess: false,
      error: {
        statusCode: 400,
        msg: "Error in updateUserPasswordRepo"
      }
    }
    console.log(error, "error in userRegiRepo...");
  }
  return result;
};
