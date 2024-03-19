import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export default class UserController {

    getUserRegisterPage(req, res) {
        res.render("register");
    }

    getUserLoginPage(req, res) {
        res.render("login", {errorMessage: null});
    }

    addNewUser(req, res) {
        const {name, email, password} = req.body;

        UserModel.registerNewUser(name, email, password);
        console.log("<-------------New User had been added----------------->");

        console.log("Updated user array", UserModel.getAll());
        res.render("login", {errorMessage: null, userEmail: req.session.userEmail});
    }

    checkLoginDetails(req, res) {

        const {email, password} = req.body;
        const loginStatus = UserModel.checkDetails(email, password);

        if(loginStatus) {
            // Add details in session.
            req.session.userEmail = email;
            req.session.password = password;
            let products = ProductModel.getAll();
            console.log("<---------------- Login Successful ------------------>");
            res.render("index", {products, userEmail: req.session.userEmail});
        } else {
            console.log("<---------------- Login Failed ---------------------->");
            res.render("login", {errorMessage: "Invalid Credentials!!!"});
        }
    }

    logout(req, res) {
        req.session.destroy((err) => {
            if(err) {
                console.log(err);
            } else {
                res.clearCookie("lastVisit");
                res.redirect("/login");
            }
        })
    }
}