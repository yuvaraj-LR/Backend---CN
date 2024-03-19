import UserModel from "./users.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./users.repository.js";
import bcrypt from "bcrypt";

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(req, res) {
        try {
            let {name, email, password, type} = req.body;

            let encryptedPassword = await bcrypt.hash(password, 12);

            let modelData = new UserModel(name, email, encryptedPassword, type);

            await this.userRepository.signUp(modelData);
            return res.status(201).send(modelData);
        } catch (error) {
            console.log(error);
        }
    }

    async signIn(req, res) {
        let {email, password} = req.body;

        try {
            let user = await this.userRepository.findUserByEmail(email);
            console.log(user, "users dataa....");

            if(!user) {
                return res.status(404).send("Invalid User.")
            }

            let hasLoggedIn = await bcrypt.compare(password, user.password);
            console.log(hasLoggedIn, "afterloggin....");

            if(hasLoggedIn) {
                let token = jwt.sign(
                    {
                        userId : user._id,
                        email : user.email
                    } 
                    ,"mbpecDLJbs8ZCqLWUlH696M6H5RQVosP",
                    {
                        expiresIn: "1h"
                    }
                );
    
                return res.status(200).send(token);
            } 

        } catch (error) {
            console.log(error);
        }
    }
}