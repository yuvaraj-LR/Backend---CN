import { userModel } from "../models/users.model.js";

export const userController = async (req, res) => {
  const userData = await userModel();
  res.render("index", { users: userData });
};
