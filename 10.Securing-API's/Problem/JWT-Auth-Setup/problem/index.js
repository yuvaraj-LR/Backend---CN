import express from "express";
import productRoutes from "./src/features/product/routes/product.routes.js";
import userRoutes from "./src/features/user/routes/user.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

app.use(session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
  }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);

export default app;
