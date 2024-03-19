import express from "express";
import empRoutes from "./routes/employee.route.js";
import cros from "cors";

const app = express();
// Please don't change the pre-written code
// Import the necessary modules here
// Write your code here

app.use("/api/v1/emp", cros(), empRoutes);

export default app;
