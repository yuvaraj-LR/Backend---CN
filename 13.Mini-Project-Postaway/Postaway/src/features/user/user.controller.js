// 1.Importing the required modules.
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
    getAllUsers(req, res) {
        let users = UserModel.getAllUsers();
        return res.status(200).json({status: true, message:users});
    }

    signUp(req, res) {
        let {name, email, password} = req.body;
        // console.log(data, "data from request");

        // Handling the edge case.
        let errorMessage = {};
        if (!name || !email || !password) {
            if (!name) {
                errorMessage.name = "Name is required";
            }

            if (!email) {
                errorMessage.email = "Email is required";
            }

            if (!password) {
                errorMessage.password = "Password is required";
            }

            return res.status(406).json({ status: false, message: errorMessage });
        }


        let userData = UserModel.signUp(name, email, password);

        if(!userData) {
            return res.status(401).json({status: false, message: "Failed to add the user."});
        } else {
            return res.status(200).json({status: true, message: userData});
        }
    }

    signIn(req, res) {
        let {email, password} = req.body;

        let errorMessage;
        // Handling the edge case.
        if(!email || !password) { 
            if (!email) {
                errorMessage.email = "Email is required";
            }

            if (!password) {
                errorMessage.password = "Password is required";
            }

            return res.status(406).json({status: false, message: errorMessage});
        }

        let hasUserSignedIn = UserModel.signIn(email, password);
        console.log(hasUserSignedIn, "signedin");

        if(!hasUserSignedIn) {
            return res.status(401).json({status: false, message: "Invalid Username or Password."})
        } else {
            let token = jwt.sign(
                {
                    userId: hasUserSignedIn.email,
                    password: hasUserSignedIn.password
                }, 
                "mbpecDLJbs8ZCqLWUlH696M6H5RQVosP",
                {
                    expiresIn: "1h"
                }
            )

            return res.status(200).json({status: true, message: token});
        }
    }
}


