import UserModel from "./users.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
    signUp(req, res) {
        let data = req.body;
        let usersData = UserModel.signUp(data.name, data.email, data.password, data.type);
        
        if(!usersData) {
            return res.status(401).send("User data was not added.")
        } else {
            return res.status(201).send(usersData);
        }
    }

    signIn(req, res) {
        let data = req.body;
        let hasLoggedIn = UserModel.signIn(data.email, data.password);

        if(!hasLoggedIn) {
            return res.status(401).send("Login Failed!!! Invalid Username or password.")
        } else {

            let token = jwt.sign(
                {
                    userId : hasLoggedIn.email,
                    password : hasLoggedIn.password
                } 
                ,"mbpecDLJbs8ZCqLWUlH696M6H5RQVosP",
                {
                    expiresIn: "1h"
                }
            );

            return res.status(200).send(token);
        }
    }
}