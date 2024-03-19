import mongoose from "mongoose";
import {userSchema} from "./user.schema.js"

const UserModel = mongoose.model("user", userSchema);

export default class UserRepository {
    async signUp(user) {
        try {
            const newUser = new UserModel(user);
            await newUser.save();

            return newUser;
        } catch (error) {
            console.log(error);
            console.log("error in signUpRepo");
        }
    }

    async signIn(email, password) {
        try {
            return await UserModel.findOne({email, password});
        } catch (error) {
            console.log(error);
            console.log("error in signInRepo");   
        }
    }   

    async findByEmail(email) {
        try {
            return await UserModel.findOne({email});
        } catch (error) {
            console.log(error);
            console.log("error in findByEmailRepo");   
        }
    } 
    
    async reset(userId, password) {
        console.log(userId, password, "kkkkkk");
        try {
            let user = await UserModel.findById(userId);
            console.log(user, "userrrr....");
            if(user) {
                user.password = password;
                user.save();
            }
        } catch (error) {
            console.log(error);
            console.log("error in resetRepo");     
        }
    }
}


