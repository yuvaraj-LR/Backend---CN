import express from "express";
import ProductsController from "./src/controllers/product.controller.js";
import UserController from "./src/controllers/user.controller.js";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import validationMiddleware from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-uploading.middleware.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";

const app = express();
const productsController = new ProductsController();
const userController = new UserController();

app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.use(cookieParser());
app.use(setLastVisit)

app.use(session({
  secret: "my-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false}
}));

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

// This is for CRUD operations.
app.get("/", auth, productsController.getProducts);
app.get("/add-product", auth, productsController.getAddProduct);
app.get("/delete-product/:id", auth, productsController.getDeleteProductView);

// Add the product
app.post("/", uploadFile.single("imageUrl"), validationMiddleware, productsController.postAddProduct);

// Update the product
app.post("/update-product", uploadFile.single("imageUrl"), productsController.updateProductView);

// Display the updated data view.
app.get("/update-product/:id", productsController.getUpdateProductView);

// This is for Login and Register pages
app.get("/register", userController.getUserRegisterPage);
app.get("/login", userController.getUserLoginPage);

app.post("/register", userController.addNewUser);
app.post("/login", userController.checkLoginDetails);

app.get("/logout", userController.logout);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
