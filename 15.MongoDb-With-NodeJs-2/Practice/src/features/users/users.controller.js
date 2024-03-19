import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "./users.model.js";
import UserRepository from "./users.repository.js";

export default class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(req, res) {
        let {name, email, password, type} = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);
        
        let newUser = new UserModel(name, email, hashedPassword, type);
        let usersData = await this.userRepository.signUp(newUser);
        console.log(usersData, "users dataa....");
        
        if(!usersData) {
            return res.status(401).send("User data was not added.")
        } else {
            return res.status(201).send(usersData);
        }
    }

    async signIn(req, res) {
        try {
            let {email, password} = req.body;
            let userIsPresent = await this.userRepository.findByEmail(email);

            if(!userIsPresent) {
                return res.status(401).send("Invalid Username.")
            } else {
                const result = await bcrypt.compare(password, userIsPresent.password);

                if(result) {
                    let token = jwt.sign(
                        {
                            userId : userIsPresent._id,
                            email : userIsPresent.email
                        } 
                        ,"mbpecDLJbs8ZCqLWUlH696M6H5RQVosP",
                        {
                            expiresIn: "1h"
                        }
                    );
    
                    return res.status(200).send(token);
                } else {
                    return res.status(401).send("Login Failed!!! Invalid Username or password.")
                }
            }
        } catch (error) {
            console.log(error, "error in signIn...");
        }
    }

    async getAllUsers(req, res) {

        try {
            let result = await this.userRepository.getAllUsers();
            return res.status(200).send(result);
        } catch (error) {
            console.log("Error in getAllUsers...");
        }
    }
    
}